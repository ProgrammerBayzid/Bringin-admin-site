import { Button, Modal } from "antd";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillDelete } from "react-icons/ai";

import Spinner from "../../Spinner/Spinner";
import Categoryeditmodal from "./Categoryeditmodal";

const Category = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [industry, setIndustry] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [isLoding, setIsLoding] = useState(false);

  useEffect(() => {
    fetch("https://rsapp.unbolt.co/admin/industry2")
      .then((res) => res.json())
      .then((data) => {
        setIsLoding(true);
        setIndustry(data);
        console.log(data);
      });
  }, [refresh]);
  console.log(industry);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addIndustry = (data, e) => {
    // console.log(data);
    const industrydata = {
      industryname: data.industryname,
    };
    const storedToken = localStorage.getItem("admin_token");
    const token = storedToken ? storedToken.replace(/"/g, "") : null;

    if (token === null) {
      console.log("token not found");
    } else {
      fetch("https://rsapp.unbolt.co/industry2add", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(industrydata),
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

    if (proced && !token) {
      fetch(`https://rsapp.unbolt.co/admin/industry2/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data) {
            alert("deleted successfully");
            const remaining = industry?.filter((odr) => odr._id !== id);
            setIndustry(remaining);
          }
        });
    } else {
      console.log("token not found");
    }
  };

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const handelSort = () => {
    const storedToken = localStorage.getItem("admin_token");
    const token = storedToken ? storedToken.replace(/"/g, "") : null;
    if (token === null) {
      console.log("token not found");
    } else {
      let _industry = [...industry];
      // Remove and save the dragged item content
      const draggedItemContent = _industry.splice(dragItem.current, 1)[0];
      // Switch the position
      _industry.splice(dragOverItem.current, 0, draggedItemContent);

      // Reset the position refs
      dragItem.current = null;
      dragOverItem.current = null;

      // Prepare data for the API request
      const updateData = _industry.map((category, index) => ({
        id: category._id, // Replace with the actual identifier property
        sortOrder: index + 1, // Update the sort order
      }));

      // Update the actual array
      setIndustry(_industry);

      // Make the API request to update the category order
      fetch("https://rsapp.unbolt.co/admin/industry2_update_bulk", {
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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [edit, setEdit] = useState(null);

  const closeModal = () => {
    setEdit(null);
  };

  const editIndustry = (data, e) => {
    // console.log(data);
    const industryeditdata = {
      industryname: data.industryname,
    };
    const storedToken = localStorage.getItem("admin_token");
    const token = storedToken.replace(/"/g, "");

    fetch(`https://rsapp.unbolt.co/industry_update2/${edit._id}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(industryeditdata),
    })
      .then((res) => res.json())
      .then((result) => {
        setRefresh(!refresh);
        e.target.reset();
        console.log(result);
      });
  };
  if (isLoding === false) {
    return <Spinner></Spinner>;
  }
  return (
    <div>
      <div>
        <div>
          <p
            className="bg-[#0077B5] w-[200px] p-[2px] rounded cursor-pointer  text-center  text-white"
            onClick={showModal}
          >
            Add New Industry Name
          </p>
        </div>
        <div>
          <Modal
            title=" Add An New Industry"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <div>
              <div>
                <div className=" p-7">
                  <form onSubmit={handleSubmit(addIndustry)}>
                    <div className="form-control w-full ">
                      <label className="label">
                        {" "}
                        <span className="label-text"> New Industry Name</span>
                      </label>
                      <input
                        type="text"
                        {...register("industryname", {
                          required: "  industryname is Required",
                        })}
                        className="input input-bordered w-full "
                      />
                      {errors.phoneName && (
                        <p className="text-red-500">
                          {errors.industryname.message}
                        </p>
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
        <div className="flex flex-col">
          <div className=" ">
            <div className="inline-block  py-2 ">
              <div className="h-[650px] overflow-y-auto">
                <table className=" text-left text-sm w-[1000px] font-light">
                  <thead className="border-b bg-gray-100 text-[18px] font-medium sticky top-[0px] ">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        No
                      </th>
                      <th scope="col" className="px-6 py-4">
                        New Industry
                      </th>
                      {/* <th scope="col" className="px-6 py-4">Categoris</th> */}
                      <th scope="col" className="px-6 py-4 text-">
                        Edit
                      </th>
                      <th scope="col" className="px-6 py-4 text-center">
                        Delete
                      </th>
                    </tr>
                  </thead>
                  {industry.length > 0 &&
                    industry.map((ins, i) => (
                      <tbody
                        className="text-[15px]"
                        key={ins._id}
                        onDragStart={(e) => (dragItem.current = i)}
                        onDragEnter={(e) => (dragOverItem.current = i)}
                        onDragEnd={handelSort}
                        draggable
                      >
                        <tr className="border-b bg-gray-50">
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {i + 1}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            <div>
                              <p className="my-2"> {ins.industryname}</p>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            <label
                              onClick={() => setEdit(ins)}
                              htmlFor="confirmation-modal"
                              className=" px-[4px] py-[3px] rounded cursor-pointer btn-error text-white text-[13px]"
                            >
                              Edit
                            </label>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-center">
                            <button onClick={() => handelDeeted(ins._id)}>
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
      {/* You can open the modal using ID.showModal() method */}

      {edit && (
        <Categoryeditmodal
          title={`Are you sure you want to edit?`}
          message={`Do you want to edit ${edit.industryname}.`}
          successButtonName="Delete"
          modalData={edit}
          add={editIndustry}
          closeModal={closeModal}
        >
          {" "}
        </Categoryeditmodal>
      )}
    </div>
  );
};

export default Category;
