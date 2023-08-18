import { Button, Modal } from "antd";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";
import Spinner from "../../Spinner/Spinner";
import FuncationalAreaEditModal from "./FuncationalAreaEditModal";

const FunctionalAreaAdd = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [functionalarea, setFunctionalarea] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [isLoding, setIsLoding] = useState(false);

  useEffect(() => {
    fetch("https://rsapp.bringin.io/admin/functionalarea")
      .then((res) => res.json())
      .then((data) => {
        setIsLoding(true);
        setFunctionalarea(data);
        console.log(data);
      });
  }, [refresh]);
  console.log(functionalarea);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addFunctionalarea = (data, e) => {
    // console.log(data);
    const functionalareadata = {
      categoryid: data.categoryid,
      industryid: data.industryid,
      functionalname: data.functionalname,
    };

    fetch("https://rsapp.bringin.io/functionalareaadd", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(functionalareadata),
    })
      .then((res) => res.json())
      .then((result) => {
        setRefresh(!refresh);
        e.target.reset();
        console.log(result);
      });
  };

  const handelDeeted = (id) => {
    const proced = window.confirm("Are You Sure");
    if (proced) {
      fetch(`https://rsapp.bringin.io/admin/functionalarea/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data) {
            alert("deleted successfully");
            const remaining = functionalarea?.filter((odr) => odr._id !== id);
            setFunctionalarea(remaining);
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
    let _functionalarea = [...functionalarea];
    //remove and save the dragged item content
    const draggedItemContent = _functionalarea.splice(dragItem.current, 1)[0];
    //switch the position
    _functionalarea.splice(dragOverItem.current, 0, draggedItemContent);

    //reset the position ref
    dragItem.current = null;
    dragOverItem.current = null;

    //update the actual array
    setFunctionalarea(_functionalarea);
  };

  const [industry, setIndustry] = useState([]);

  useEffect(() => {
    fetch("https://rsapp.bringin.io/admin/industry")
      .then((res) => res.json())
      .then((data) => {
        setIsLoding(true);
        setIndustry(data);
        console.log(data);
      });
  }, []);
  console.log(industry);

  const [category, setCategory] = useState([]);

  useEffect(() => {
    fetch("https://rsapp.bringin.io/admin/category")
      .then((res) => res.json())
      .then((data) => {
        setIsLoding(true);
        setCategory(data);
        console.log(data);
      });
  }, []);
  console.log(category);

  const [edit, setEdit] = useState(null);

  const closeModal = () => {
    setEdit(null);
  };

  const editfunctionalArea = (data, e) => {
    // console.log(data);
    const editdata = {
      functionalname: data.functionalname,
    };

    fetch(`https://rsapp.bringin.io/functional_update/${edit._id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(editdata),
    })
      .then((res) => res.json())
      .then((result) => {
        setRefresh(!refresh);
        e.target.reset();
        console.log(result);
      });
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
            Add Expertise Area
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
                  <form onSubmit={handleSubmit(addFunctionalarea)}>
                    <div className="form-control w-full ">
                      <label className="label">
                        {" "}
                        <span className="label-text"> Expertise Area Name</span>
                      </label>
                      <input
                        type="text"
                        {...register("functionalname", {
                          required: "  functionalname is Required",
                        })}
                        className="input input-bordered w-full "
                      />
                      {errors.phoneName && (
                        <p className="text-red-500">
                          {errors.functionalname.message}
                        </p>
                      )}
                    </div>
                    <div className="form-control w-full ">
                      <label className="label">
                        {" "}
                        <span className="label-text">Select a Industry </span>
                      </label>
                      <select
                        {...register("industryid")}
                        className="select input-bordered w-full "
                      >
                        {industry.map((ca) => {
                          return (
                            <option value={ca._id} key={ca._id}>
                              {ca.industryname}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div className="form-control w-full ">
                      <label className="label">
                        {" "}
                        <span className="label-text">Select a Category </span>
                      </label>
                      <select
                        {...register("categoryid")}
                        className="select input-bordered w-full "
                      >
                        {category.map((ca) => {
                          return (
                            <option value={ca._id} key={ca._id}>
                              {ca.categoryname}
                            </option>
                          );
                        })}
                      </select>
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
              <div className="  inline-block  py-2 ">
                <div className="">
                  <table className=" text-left text-sm font-light">
                    <thead className="border-b text-[15px] bg-gray-100 font-medium dark:border-neutral-500 w-[1000px]">
                      <tr className="w-[1000px]">
                        <th scope="col" className="px-6 py-4">
                          No
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Expertise Area{" "}
                        </th>
                        <th scope="col" className="px-6 py-4">
                       Sub-Categories
                        </th>
                        <th scope="col" className="px-6 py-4">
                        Categories
                        </th>
                        <th scope="col" className="px-6 py-4 text-center">
                          Edit
                        </th>
                        <th scope="col" className="px-6 py-4 text-center">
                          Action
                        </th>
                      </tr>
                    </thead>
                    {functionalarea.map((fu, i) => (
                      <tbody
                        className="text-[15px] bg-gray-50 w-[1000px]"
                        key={fu._id}
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
                              <p className="my-2">{fu.functionalname}</p>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            <div>
                              <p className="my-2">
                                {fu.categoryid.categoryname}
                              </p>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            <div>
                              {fu?.industryid?.industryname ? (
                                <p className="my-2">
                                  {fu.industryid.industryname}
                                </p>
                              ) : (
                                <p>Null</p>
                              )}
                            </div>
                          </td>
                          <td>
                            <label
                              onClick={() => setEdit(fu)}
                              htmlFor="functionalname-modal"
                              className="btn btn-sm btn-error"
                            >
                              Edit
                            </label>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-center">
                            <button onClick={() => handelDeeted(fu._id)}>
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
        <div>
          {edit && (
            <FuncationalAreaEditModal
              title={`Are you sure you want to edit?`}
              message={`Do you want to edit ${edit.functionalname}.`}
              successButtonName="Delete"
              modalData={edit}
              add={editfunctionalArea}
              closeModal={closeModal}
            >
              {" "}
            </FuncationalAreaEditModal>
          )}
        </div>
      </div>
    </div>
  );
};

export default FunctionalAreaAdd;
