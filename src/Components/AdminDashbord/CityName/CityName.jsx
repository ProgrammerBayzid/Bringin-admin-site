import { useState } from "react";

import { useForm } from "react-hook-form";
import { useEffect, useRef } from "react";
import { AiFillDelete } from "react-icons/ai";

import Spinner from "../../Spinner/Spinner";
import CityEditModal from "./CityEditModal";

const CityName = () => {
  const [refresh, setRefresh] = useState(true);
  const [city, setCity] = useState([]);
  const [isLoding, setIsLoding] = useState(false);

  useEffect(() => {
    fetch("https://rsapp.unbolt.co/admin/city")
      .then((res) => res.json())
      .then((data) => {
        setIsLoding(true);
        setCity(data);
        console.log(data);
      });
  }, [refresh]);
  console.log(city);

  const handelDeeted = (id) => {
    const proced = window.confirm("Are You Sure");
    const storedToken = localStorage.getItem("admin_token");
    const token = storedToken ? storedToken.replace(/"/g, "") : null;

    if (!proced && token === null) {
      console.log("token not found");
    } else {
      fetch(`https://rsapp.unbolt.co/admin/city/${id}`, {
        method: "DELETE",
        headers:{
          Authorization: `Bearer ${token}`,

          
        }
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data) {
            alert("deleted successfully");
            const remaining = city?.filter((odr) => odr._id !== id);
            setCity(remaining);
          }
        });
    }
  };

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const handelSort = () => {
    let _city = [...city];
    //remove and save the dragged item content
    const draggedItemContent = _city.splice(dragItem.current, 1)[0];
    //switch the position
    _city.splice(dragOverItem.current, 0, draggedItemContent);

    //reset the position ref
    dragItem.current = null;
    dragOverItem.current = null;

    //update the actual array
    setCity(_city);
  };

  const [edit, setEdit] = useState(null);

  const closeModal = () => {
    setEdit(null);
  };

  const editcity = (data, e) => {
    // console.log(data);
    const editdata = {
      divisionname: data.divisionname,
    };
    const storedToken = localStorage.getItem("admin_token");
    const token = storedToken ? storedToken.replace(/"/g, "") : null;

    if ( token === null) {
      console.log("token not found");
    } else {


      fetch(`https://rsapp.unbolt.co/city_update/${edit._id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,

        },
        body: JSON.stringify(editdata),
      })
        .then((res) => res.json())
        .then((result) => {
          setRefresh(!refresh);
          e.target.reset();
          console.log(result);
        });
    }
  };

  if (isLoding === false) {
    return (
      <div className="">
        <Spinner></Spinner>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div>
        <div className="flex flex-col">
          <div className=" ">
            <div className="  py-10">
              <div className="overflow-hidden">
                <table className=" text-left text-sm font-light w-[1000px]">
                  <thead className="border-b  bg-gray-100 text-[18px] font-medium">
                    <tr className="ml-20">
                      <th scope="col" className="px-6 py-4">
                        No
                      </th>
                      <th scope="col" className="px-6 py-4">
                        City Name
                      </th>

                      <th scope="col" className="px-6 py-4 text-start">
                        Edit
                      </th>
                      <th scope="col" className="px-6 py-4 text-center">
                        Delete
                      </th>
                    </tr>
                  </thead>

                  {city.map((ci, index) => (
                    <tbody
                      className="text-[15px] mt-5"
                      key={ci._id}
                      onDragStart={(e) => (dragItem.current = index)}
                      onDragEnter={(e) => (dragOverItem.current = index)}
                      onDragEnd={handelSort}
                    >
                      <tr className="border-b my-2 bg-zinc-50 " draggable>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {ci.divisionname}
                        </td>
                        <td>
                          <label
                            onClick={() => setEdit(ci)}
                            htmlFor="city-modal"
                            className="btn btn-sm btn-error"
                          >
                            Edit
                          </label>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-center">
                          <button
                            className=""
                            onClick={() => handelDeeted(ci._id)}
                          >
                            <AiFillDelete className="text-red-500 "></AiFillDelete>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {edit && (
        <CityEditModal
          title={`Are you sure you want to edit?`}
          message={`Do you want to edit ${edit.divisionname}.`}
          successButtonName="Delete"
          modalData={edit}
          add={editcity}
          closeModal={closeModal}
        >
          {" "}
        </CityEditModal>
      )}
    </div>
  );
};

export default CityName;
