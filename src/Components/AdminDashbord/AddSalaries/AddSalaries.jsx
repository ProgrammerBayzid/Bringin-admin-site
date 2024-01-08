import { Button, Modal } from "antd";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";
import Spinner from "../../Spinner/Spinner";
import SalaryEditModal from "./SalaryEditModal";

const AddSalaries = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [refresh, setRefresh] = useState(true);
  const [isLoding, setIsLoding] = useState(false);

  const [salaries, setSalaries] = useState([]);
  useEffect(() => {
  
    fetch("https://rsapp.unbolt.co/admin/salarie")
      .then((res) => res.json())
      .then((data) => {
        setIsLoding(true);
        setSalaries(data);
        console.log(data);
      });
  }, [refresh]);
  console.log(salaries);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addSalaries = (data, e) => {
    // console.log(data);
    const salariesdata = {
      salary: parseFloat(data.salary),
      type: data.type,
      simbol: data.simbol,
      currency: data.currency,
    };
    console.log(salariesdata);
    const storedToken = localStorage.getItem("admin_token");
    const token = storedToken ? storedToken.replace(/"/g, "") : null;

    if (token === null) {
      console.log("token not found");
    } else {
      fetch("https://rsapp.unbolt.co/salarietype", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(salariesdata),
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
      fetch(`https://rsapp.unbolt.co/admin/salarie/${id}`, {
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
            const remaining = salaries?.filter((odr) => odr._id !== id);
            setSalaries(remaining);
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
      let _salaries = [...salaries];
      // Remove and save the dragged item content
      const draggedItemContent = _salaries.splice(dragItem.current, 1)[0];
      // Switch the position
      _salaries.splice(dragOverItem.current, 0, draggedItemContent);

      // Reset the position refs
      dragItem.current = null;
      dragOverItem.current = null;

      // Prepare data for the API request
      const updateData = _salaries.map((category, index) => ({
        id: category._id, // Replace with the actual identifier property
        sortOrder: index + 1, // Update the sort order
      }));

      // Update the actual array
      setSalaries(_salaries);

      // Make the API request to update the category order
      fetch("https://rsapp.unbolt.co/admin/salirietype_update_bulk", {
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

  const editsalary = (data, e) => {
    // console.log(data);
    const editdata = {
      salary: data.salary,
      type: data.type,
      simbol: data.simbol,
      currency: data.currency,
    };

    const storedToken = localStorage.getItem("admin_token");
    const token = storedToken ? storedToken.replace(/"/g, "") : null;

    if (token === null) {
      console.log("token not found");
    } else {
      fetch(`https://rsapp.unbolt.co/edit_salarietype/${edit._id}`, {
        method: "POST",
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
            Add Salary
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
                  <form onSubmit={handleSubmit(addSalaries)}>
                    <div className="form-control w-full ">
                      <label className="label">
                        {" "}
                        <span className="label-text"> Salary</span>
                      </label>
                      <input
                        type="text"
                        {...register("salary", {
                          required: "  salary is Required",
                        })}
                        className="input input-bordered w-full "
                      />
                      {errors.salary && (
                        <p className="text-red-500">{errors.salary.message}</p>
                      )}
                    </div>
                    <div className="form-control w-full ">
                      <label className="label">
                        {" "}
                        <span className="label-text"> Type</span>
                      </label>
                      <input
                        type="text"
                        {...register("type", {})}
                        className="input input-bordered w-full "
                      />
                      {errors.type && (
                        <p className="text-red-500">{errors.type.message}</p>
                      )}
                    </div>

                    <div className="form-control w-full ">
                      <label className="label">
                        {" "}
                        <span className="label-text"> Simbol</span>
                      </label>
                      <input
                        type="text"
                        {...register("simbol", {
                          required: "  simbol is Required",
                        })}
                        className="input input-bordered w-full "
                      />
                      {errors.simbol && (
                        <p className="text-red-500">{errors.simbol.message}</p>
                      )}
                    </div>

                    <div className="form-control w-full ">
                      <label className="label">
                        {" "}
                        <span className="label-text">currency </span>
                      </label>
                      <input
                        type="text"
                        {...register("currency", {
                          required: "  currency is Required",
                        })}
                        className="input input-bordered w-full "
                      />
                      {errors.phoneName && (
                        <p className="text-red-500">
                          {errors.currency.message}
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
        <div>
          <div className="flex flex-col">
            <div className=" ">
              <div className="inline-block min-w-full py-2 ">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left text-sm font-light w-[1000px]">
                    <thead className="border-b text-[18px] bg-gray-100 font-medium dark:border-neutral-500 ">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          No
                        </th>
                        <th scope="col" className="px-6 py-4">
                          {" "}
                          Salary
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Symbol
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Currency{" "}
                        </th>
                        <th scope="col" className="px-6 py-4 text-center">
                          Edit
                        </th>
                        <th scope="col" className="px-6 py-4 text-center">
                          Delete
                        </th>
                      </tr>
                    </thead>
                    {salaries.map((sa, i) => (
                      <tbody
                        className="text-[15px] bg-gray-50"
                        key={sa._id}
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
                            {sa.salary}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {sa.simbol}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {sa.currency}
                          </td>
                          <td>
                            <label
                              onClick={() => setEdit(sa)}
                              htmlFor="salary-modal"
                              className="btn btn-sm btn-error"
                            >
                              Edit
                            </label>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-center">
                            <button
                              className=""
                              onClick={() => handelDeeted(sa._id)}
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
      </div>
      {edit && (
        <SalaryEditModal
          title={`Are you sure you want to edit?`}
          message={`Do you want to edit ${edit.salary}.`}
          successButtonName="Delete"
          modalData={edit}
          add={editsalary}
          closeModal={closeModal}
        >
          {" "}
        </SalaryEditModal>
      )}
    </div>
  );
};

export default AddSalaries;
