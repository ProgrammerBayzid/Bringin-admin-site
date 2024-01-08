import { Button, Modal } from "antd";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";
import Spinner from "../../Spinner/Spinner";
import LocationEditModan from "./LocationEditModan";

const AddLocation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [location, setLocation] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [isLoding, setIsLoding] = useState(false);

  useEffect(() => {
    fetch("https://rsapp.unbolt.co/admin/location")
      .then((res) => res.json())
      .then((data) => {
        setIsLoding(true);
        setLocation(data);
        console.log(data);
      });
  }, [refresh]);
  console.log(location);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addLocation = (data, e) => {
    // console.log(data);
    const locationdata = {
      division: data.division,
      city: data.city,
    };
    const storedToken = localStorage.getItem("admin_token");
    const token = storedToken ? storedToken.replace(/"/g, "") : null;

    if (token === null) {
      console.log("token not found");
    } else {


      fetch("https://rsapp.unbolt.co/location", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,

        },
        body: JSON.stringify(locationdata),
      })
        .then((res) => res.json())
        .then((result) => {
          setRefresh(!refresh);
          e.target.reset();
          console.log(result);
        });
    }

  };

  const handelDeeted = (id) => {
    const proced = window.confirm("Are You Sure");
    const storedToken = localStorage.getItem("admin_token");
    const token = storedToken ? storedToken.replace(/"/g, "") : null;

    if (!proced && token === null) {
      console.log("token not found");
    } else {
      fetch(`https://rsapp.unbolt.co/admin/location/${id}`, {
        method: "DELETE",
        headers:{          Authorization: `Bearer ${token}`,
      }
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data) {
            alert("deleted successfully");
            const remaining = location?.filter((odr) => odr._id !== id);
            setLocation(remaining);
          }
        });
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);


  const handelSort = () => {
    const storedToken = localStorage.getItem("admin_token");
    const token = storedToken ? storedToken.replace(/"/g, "") : null;

    if (token === null) {
      console.log("token not found");
    } else {



      let _location = [...location];
      // Remove and save the dragged item content
      const draggedItemContent = _location.splice(dragItem.current, 1)[0];
      // Switch the position
      _location.splice(dragOverItem.current, 0, draggedItemContent);
    
      // Reset the position refs
      dragItem.current = null;
      dragOverItem.current = null;
    
      // Prepare data for the API request
      const updateData = _location.map((category, index) => ({
        id: category._id, // Replace with the actual identifier property
        sortOrder: index + 1, // Update the sort order
      }));
    
      // Update the actual array
      setLocation(_location);
    
      // Make the API request to update the category order
      fetch("https://rsapp.unbolt.co/admin/location_update_bulk", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updateData),
      })
        .then((res) => {
          if (res.status === 200) {
            console.log("Category order updated successfully.");
          } else {
            console.error("Category order update failed.");
          }
        })
        .catch((error) => {
          console.error("API request error:", error);
        });
    }
  };

  const [edit, setEdit] = useState(null);

  const closeModal = () => {
    setEdit(null);
  };

  const editlocation = (data, e) => {
    // console.log(data);
    const editdata = {
      name: data.name,
    };
    const storedToken = localStorage.getItem("admin_token");
    const token = storedToken ? storedToken.replace(/"/g, "") : null;

    if (token === null) {
      console.log("token not found");
    } else {


      fetch(`https://rsapp.unbolt.co/location_update/${edit._id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`
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
    <div>
      <div>
        <div>
          <Button className="bg-[#0077B5] btn" onClick={showModal}>
            Add Location
          </Button>
        </div>
        <div>
          <Modal
            title=" Add An Industry"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <div>
              <div>
                <div className=" p-7">
                  <form onSubmit={handleSubmit(addLocation)}>
                    <div className="form-control w-full ">
                      <label className="label">
                        {" "}
                        <span className="label-text">City Name </span>
                      </label>
                      <input
                        type="text"
                        {...register("division", {
                          required: "division is Required",
                        })}
                        className="input input-bordered w-full "
                      />
                      {errors.division && (
                        <p className="text-red-500">
                          {errors.division.message}
                        </p>
                      )}
                    </div>
                    <div className="form-control w-full ">
                      <label className="label">
                        {" "}
                        <span className="label-text"> Division Name</span>
                      </label>
                      <input
                        type="text"
                        {...register("city", {
                          required: "  city is Required",
                        })}
                        className="input input-bordered w-full "
                      />
                      {errors.city && (
                        <p className="text-red-500">{errors.city.message}</p>
                      )}
                    </div>

                    <input
                      className="shadow-lg rounded lg:text-[20px] md:text-[18] text-[16px] font-bold text-white px-3  bg-[#0077B5] cursor-pointer lg:py-4 md:py-3 py-[6px] w-full mt-4"
                      value="Add "
                      type="submit"
                    />
                  </form>
                  <div></div>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
      <div>
        <div>
          <div className="flex flex-col">
            <div className=" ">
              <div className="inline-block min-w-full py-2 ">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left text-sm font-light w-[1000px]">
                    <thead className="border-b text-[18px] font-medium  bg-gray-100 ">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          No
                        </th>
                        <th scope="col" className="px-6 py-4">
                          {" "}
                          Division
                        </th>
                        <th scope="col" className="px-6 py-4">
                          {" "}
                          City
                        </th>
                        <th scope="col" className="px-6 py-4 text-center">
                          Edit
                        </th>
                        <th scope="col" className="px-6 py-4 text-center">
                          Action
                        </th>
                      </tr>
                    </thead>
                    {location.map((lo, i) => (
                      <tbody
                        className="text-[15px] bg-gray-50"
                        key={lo._id}
                        onDragStart={(e) => (dragItem.current = i)}
                        onDragEnter={(e) => (dragOverItem.current = i)}
                        onDragEnd={handelSort}
                        draggable
                      >
                        <tr className="border-b dark:border-neutral-500">
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {i + 1}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            <div>
                              <p className="my-2"> {lo.name}</p>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {lo.divisionid.map((di) => (
                              <div key={di._id}>
                                <p className="my-2">{di.divisionname}</p>
                              </div>
                            ))}
                          </td>
                          <td>
                            <label
                              onClick={() => setEdit(lo)}
                              htmlFor="location-modal"
                              className="btn btn-sm btn-error"
                            >
                              Edit
                            </label>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-center">
                            <button onClick={() => handelDeeted(lo._id)}>
                              <AiFillDelete className="text-red-500"></AiFillDelete>
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
      </div>

      {edit && (
        <LocationEditModan
          title={`Are you sure you want to edit?`}
          message={`Do you want to edit ${edit.name}.`}
          successButtonName="Delete"
          modalData={edit}
          add={editlocation}
          closeModal={closeModal}
        >
          {" "}
        </LocationEditModan>
      )}
    </div>
  );
};

export default AddLocation;
