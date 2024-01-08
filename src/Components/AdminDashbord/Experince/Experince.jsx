import { useState } from "react";
import { Button, Modal } from "antd";
import { useForm } from "react-hook-form";
import { useEffect, useRef } from "react";
import { AiFillDelete } from "react-icons/ai";

import Spinner from "../../Spinner/Spinner";
import ExperinceeditModal from "./ExperinceeditModal";

const Experince = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [experince, setExperince] = useState([]);
  const [isLoding, setIsLoding] = useState(false);

  useEffect(() => {
    fetch("https://rsapp.unbolt.co/admin_exprience")
      .then((res) => res.json())
      .then((data) => {
        setIsLoding(true);
        setExperince(data);
        console.log(data);
      });
  }, [refresh]);
  console.log(experince);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addExperince = (data, e) => {
    // console.log(data);
    const experincedata = {
      name: data.name,
      published_date: new Date().toLocaleString(),
    };

    const storedToken = localStorage.getItem("admin_token");
    const token = storedToken ? storedToken.replace(/"/g, "") : null;

    if ( token === null) {
      console.log("token not found");
    } else {


      fetch("https://rsapp.unbolt.co/admin_exprience", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,

        },
        body: JSON.stringify(experincedata),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setRefresh(!refresh);
          }
          e.target.reset();
          console.log(data);
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
      fetch(`https://rsapp.unbolt.co/admin_exprience/${id}`, {
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
            const remaining = experince?.filter((odr) => odr._id !== id);
            setExperince(remaining);
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

    if ( token === null) {
      console.log("token not found");
    } else {


      let _experince = [...experince];
      // Remove and save the dragged item content
      const draggedItemContent = _experince.splice(dragItem.current, 1)[0];
      // Switch the position
      _experince.splice(dragOverItem.current, 0, draggedItemContent);
    
      // Reset the position refs
      dragItem.current = null;
      dragOverItem.current = null;
    
      // Prepare data for the API request
      const updateData = _experince.map((category, index) => ({
        id: category._id, // Replace with the actual identifier property
        sortOrder: index + 1, // Update the sort order
      }));
    
      // Update the actual array
      setExperince(_experince);
    
      // Make the API request to update the category order
      fetch("https://rsapp.unbolt.co/admin/exprience_update_bulk", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
  const editepricened = (data, e) => {
    // console.log(data);
    const editdata = {
      name: data.name,
    };

    const storedToken = localStorage.getItem("admin_token");
    const token = storedToken ? storedToken.replace(/"/g, "") : null;

    if ( token === null) {
      console.log("token not found");
    } else {



      fetch(`https://rsapp.unbolt.co/experince_update/${edit._id}`, {
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
        <div>
          <div>
            <Button className="bg-[#0077B5] btn" onClick={showModal}>
              Add Experince
            </Button>
          </div>
          <div></div>
        </div>
        <Modal
          title=" Add An Job Type"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div>
            <div>
              <div className=" p-7">
                <form onSubmit={handleSubmit(addExperince)}>
                  <div className="form-control w-full ">
                    <label className="label">
                      {" "}
                      <span className="label-text">Experince</span>
                    </label>
                    <input
                      type="text"
                      {...register("name", {
                        required: "  name is Required",
                      })}
                      className="input input-bordered w-full "
                    />
                    {errors.name && (
                      <p className="text-red-500">{errors.name.message}</p>
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
                        Experince
                      </th>

                      <th scope="col" className="px-6 py-4 text-center">
                        Edit
                      </th>
                      <th scope="col" className="px-6 py-4 text-center">
                        Delete
                      </th>
                    </tr>
                  </thead>

                  {experince.map((ex, index) => (
                    <tbody
                      className="text-[15px] mt-5"
                      key={ex._id}
                      onDragStart={(e) => (dragItem.current = index)}
                      onDragEnter={(e) => (dragOverItem.current = index)}
                      onDragEnd={handelSort}
                    >
                      <tr className="border-b my-2 bg-zinc-50 " draggable>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {ex.name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          <label
                            onClick={() => setEdit(ex)}
                            htmlFor="Experinceed-modal"
                            className="btn btn-sm btn-error"
                          >
                            Edit
                          </label>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-center">
                          <button
                            className=""
                            onClick={() => handelDeeted(ex._id)}
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
        <ExperinceeditModal
          title={`Are you sure you want to edit?`}
          message={`Do you want to edit ${edit?.name}.`}
          successButtonName="Delete"
          modalData={edit}
          add={editepricened}
          closeModal={closeModal}
        >
          {" "}
        </ExperinceeditModal>
      )}
    </div>
  );
};

export default Experince;
