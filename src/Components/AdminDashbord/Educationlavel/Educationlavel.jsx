import { Button, Modal } from "antd";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";
import Spinner from "../../Spinner/Spinner";
import EducationlavelEdit from "./EducationlavelEdit";

const Educationlavel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [refresh, setRefresh] = useState(true);
  const [isLoding, setIsLoding] = useState(false);

  const [educationlavel, setEducationlavel] = useState([]);
  useEffect(() => {
    fetch("https://rsapp.unbolt.co/education_lavel")
      .then((res) => res.json())
      .then((data) => {
        setIsLoding(true);
        setEducationlavel(data);
        console.log(data);
      });
  }, [refresh]);
  console.log(educationlavel);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addEducationlavel = (data, e) => {
    // console.log(data);
    const educationlaveldata = {
      name: data.name,
    };
    const storedToken = localStorage.getItem("admin_token");
    const token = storedToken ? storedToken.replace(/"/g, "") : null;

    if ( token === null) {
      console.log("token not found");
    } else {


      fetch("https://rsapp.unbolt.co/education_lavel", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,

        },
        body: JSON.stringify(educationlaveldata),
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
      fetch(`https://rsapp.unbolt.co/admin/education_lavel/${id}`, {
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
            const remaining = educationlavel?.filter((odr) => odr._id !== id);
            setEducationlavel(remaining);
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


      let _educationlavel = [...educationlavel];
      // Remove and save the dragged item content
      const draggedItemContent = _educationlavel.splice(dragItem.current, 1)[0];
      // Switch the position
      _educationlavel.splice(dragOverItem.current, 0, draggedItemContent);
    
      // Reset the position refs
      dragItem.current = null;
      dragOverItem.current = null;
    
      // Prepare data for the API request
      const updateData = _educationlavel.map((category, index) => ({
        id: category._id, // Replace with the actual identifier property
        sortOrder: index + 1, // Update the sort order
      }));
    
      // Update the actual array
      setEducationlavel(_educationlavel);
    
      // Make the API request to update the category order
      fetch("https://rsapp.unbolt.co/admin/education_lavel_update_bulk", {
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

  const editeducation = (data, e) => {
    // console.log(data);
    const editdata = {
      name: data.name,
    };
    const storedToken = localStorage.getItem("admin_token");
    const token = storedToken ? storedToken.replace(/"/g, "") : null;

    if ( token === null) {
      console.log("token not found");
    } else {


      fetch(`https://rsapp.unbolt.co/education_update/${edit._id}`, {
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
    <div>
      <div>
        <div>
          <Button className="bg-[#0077B5] btn" onClick={showModal}>
            Add Education Lavel
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
                  <form onSubmit={handleSubmit(addEducationlavel)}>
                    <div className="form-control w-full ">
                      <label className="label">
                        {" "}
                        <span className="label-text">Education Lavel </span>
                      </label>
                      <input
                        type="text"
                        {...register("name", {
                          required: "  name is Required",
                        })}
                        className="input input-bordered w-full "
                      />
                      {errors.phoneName && (
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
      </div>
      <div>
        <div>
          <div className="flex flex-col">
            <div className=" ">
              <div className="inline-block min-w-full py-2 ">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left w-[1000px] text-sm font-light">
                    <thead className="border-b bg-gray-100 text-[18px] font-medium dark:border-neutral-500 ">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          No
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Education Lavel
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Digree
                        </th>
                        <th scope="col" className="px-6 py-4 text-">
                          Edit
                        </th>
                        <th scope="col" className="px-6 py-4 text-center">
                          Delete
                        </th>
                      </tr>
                    </thead>
                    {educationlavel.map((edu, i) => (
                      <tbody
                        className="text-[15px] bg-gray-50"
                        key={edu._id}
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
                              <p className="my-2">{edu.name}</p>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {edu.digree.map((di) => (
                              <div key={di._id}>
                                <p className="my-2">{di.name}</p>
                              </div>
                            ))}
                          </td>
                          <td>
                            <label
                              onClick={() => setEdit(edu)}
                              htmlFor="education-modal"
                              className="btn btn-sm btn-error"
                            >
                              Edit
                            </label>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-center">
                            <button onClick={() => handelDeeted(edu._id)}>
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
        <EducationlavelEdit
          title={`Are you sure you want to edit?`}
          message={`Do you want to edit ${edit.name}.`}
          successButtonName="Delete"
          modalData={edit}
          add={editeducation}
          closeModal={closeModal}
        >
          {" "}
        </EducationlavelEdit>
      )}
    </div>
  );
};

export default Educationlavel;
