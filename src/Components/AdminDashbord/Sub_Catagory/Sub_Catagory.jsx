import { Button, Modal } from "antd";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillDelete } from "react-icons/ai";
import Spinner from "../../Spinner/Spinner";
import Sub_Catagoryeditmodal from "./Sub_Catagoryeditmodal";
// import Select from 'react-select'

const Sub_Catagory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [category, setCategory] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [isLoding, setIsLoding] = useState(false);

  useEffect(() => {
    fetch("https://rsapp.bringin.io/admin/category2")
      .then((res) => res.json())
      .then((data) => {
        setIsLoding(true);
        setCategory(data);
        console.log(data);
      });
  }, [refresh]);
  console.log(category);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addCategory = (data, e) => {
    // console.log(data);
    const catagoridata = {
      categoryname: data.categoryname,
      industryid: data.industryid,
    };

    fetch("https://rsapp.bringin.io/category2add", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(catagoridata),
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
      fetch(`https://rsapp.bringin.io/admin/category2/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data) {
            alert("deleted successfully");
            const remaining = category?.filter((odr) => odr._id !== id);
            setCategory(remaining);
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
    let _category = [...category];
    //remove and save the dragged item content
    const draggedItemContent = _category.splice(dragItem.current, 1)[0];
    //switch the position
    _category.splice(dragOverItem.current, 0, draggedItemContent);

    //reset the position ref
    dragItem.current = null;
    dragOverItem.current = null;

    //update the actual array
    setCategory(_category);
  };

  const [industry, setIndustry] = useState([]);

  useEffect(() => {
    fetch("https://rsapp.bringin.io/admin/industry2")
      .then((res) => res.json())
      .then((data) => {
        setIsLoding(true);
        setIndustry(data);
        console.log(data);
      });
  }, []);
  console.log(industry);

  // const [id, SetId] = useState('');

  // industry.map((in) => setId(in))
  // const options = [
  //   { value: 'chocolate', label: 'Chocolate' },
  //   { value: 'strawberry', label: 'Strawberry' },
  //   { value: 'vanilla', label: 'Vanilla' }
  // ]

  const [edit, setEdit] = useState(null);

  const closeModal = () => {
    setEdit(null);
  };

  const editcatagory = (data, e) => {
    // console.log(data);
    const editdata = {
      categoryname: data.categoryname,
    };

    fetch(`https://rsapp.bringin.io/category2_update/${edit._id}`, {
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
            Add Categoris Name
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
                  <form onSubmit={handleSubmit(addCategory)}>
                    <div className="form-control w-full ">
                      <label className="label">
                        {" "}
                        <span className="label-text">Sub-Catagories Name</span>
                      </label>
                      <input
                        type="text"
                        {...register("categoryname", {
                          required: "  categoryname is Required",
                        })}
                        className="input input-bordered w-full "
                      />
                      {errors.phoneName && (
                        <p className="text-red-500">
                          {errors.categoryname.message}
                        </p>
                      )}
                    </div>
                    <div className="form-control w-full ">
                      <label className="label">
                        {" "}
                        <span className="label-text">Select a Catagories </span>
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
              <div className=" inline-block py-2 ">
                <div className="overflow-hidden">
                  <table className=" text-left text-sm font-light  ">
                    <thead className="border-b bg-gray-100 text-[18px] font-medium dark:border-neutral-500 ">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          No
                        </th>
                        <th scope="col" className="px-6 py-4">
                          {" "}
                          Catagories
                        </th>
                        {/* <th scope="col" className="px-6 py-4">
                          {" "}
                          Expertise Area
                        </th> */}
                        <th scope="col" className="px-6 py-4">
                          {" "}
                          Sub-Catagories
                        </th>
                        <th scope="col" className="px-6 py-4  text-">
                          Edit
                        </th>
                        <th scope="col" className="px-6 py-4  text-center">
                          Delete
                        </th>
                      </tr>
                    </thead>
                    {category.map((ca, i) => (
                      <tbody
                        className="text-[15px] bg-gray-50"
                        key={ca._id}
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
                              <p className="my-2"> {ca.categoryname}</p>
                            </div>
                          </td>
                          {/* <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {ca.functionarea.map((fu) => (
                              <div key={fu._id}>
                                <p className="my-2">{fu.functionalname}</p>
                              </div>
                            ))}
                          </td> */}
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            <div>
                              {ca?.industryid?.industryname ? (
                                <p className="my-2">
                                  {ca?.industryid?.industryname}
                                </p>
                              ) : (
                                <p>Null</p>
                              )}
                            </div>
                          </td>
                          <td>
                            <label
                              onClick={() => setEdit(ca)}
                              htmlFor="categoryname-modal"
                              className="btn btn-sm btn-error"
                            >
                              Edit
                            </label>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-center">
                            <button
                              className="text-red"
                              onClick={() => handelDeeted(ca._id)}
                            >
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
        <Sub_Catagoryeditmodal
          title={`Are you sure you want to edit?`}
          message={`Do you want to edit ${edit.categoryname}.`}
          successButtonName="Delete"
          modalData={edit}
          add={editcatagory}
          closeModal={closeModal}
        >
          {" "}
        </Sub_Catagoryeditmodal>
      )}
    </div>
  );
};

export default Sub_Catagory;
