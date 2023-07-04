import { Button, Modal } from "antd";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillDelete,  } from "react-icons/ai";
import Spinner from "../../Spinner/Spinner";
// import Select from 'react-select'

const CategoryAdd = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [category, setCategory] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [isLoding, setIsLoding] = useState(false);

  useEffect(() => {
    fetch("http://rsapp.bringin.io/admin/category")
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

    fetch("http://rsapp.bringin.io/categoryadd", {
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
      fetch(`http://rsapp.bringin.io/admin/category/${id}`, {
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
    fetch("http://rsapp.bringin.io/admin/industry")
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
                        <span className="label-text">Category Name</span>
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
                        <span className="label-text">Select a Industry </span>
                      </label>
                      <select
                        {...register("industryid")}
                        className="select input-bordered w-full "
                      >
                        {industry.map((ca) => {

                          return (
                            <option value={ca._id} key={ca._id}>{ca.industryname}</option>
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
              <div className="inline-block min-w-full py-2 ">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left text-sm font-light w-[1000px] ">
                    <thead className="border-b bg-gray-100 text-[18px] font-medium dark:border-neutral-500 ">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          No
                        </th>
                        <th scope="col" className="px-6 py-4">
                          {" "}
                          Catagoris
                        </th>
                        <th scope="col" className="px-6 py-4">
                          {" "}
                          Expertise Area
                        </th>
                        <th scope="col" className="px-6 py-4">
                          {" "}
                          Industry
                        </th>
                        <th scope="col" className="px-6 py-4  text-center">
                          Action
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
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {ca.functionarea.map((fu, ) => (
                              <div key={fu._id}>
                                <p className="my-2">
                                   {fu.functionalname}
                                </p>
                                
                              </div>
                            ))}
                          </td>
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
                          <td className="whitespace-nowrap px-6 py-4 text-center">
                            <button
                              className="text-red"
                              onClick={() => handelDeeted(ca._id)}
                            >
                              <AiFillDelete  className="text-red-500"></AiFillDelete>
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
    </div>
  );
};

export default CategoryAdd;
