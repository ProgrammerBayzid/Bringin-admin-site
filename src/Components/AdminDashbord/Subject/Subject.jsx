import { Button, Modal } from "antd";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillDelete } from "react-icons/ai";
import Spinner from "../../Spinner/Spinner";
import App from "../../../App.css";
import SubjectEditModal from "./SubjectEditModal";
const Subject = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [subject, setSubject] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);

  const [isLoding, setIsLoding] = useState(false);
  useEffect(() => {
    fetch("https://rsapp.bringin.io/admin/subject")
      .then((res) => res.json())
      .then((data) => {
        setIsLoding(true);
        setSubject(data);
        console.log(data);
      });
  }, [refresh]);
  console.log(subject);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addSubject = (data, e) => {
    // console.log(degree);
    const degree = JSON.stringify(selectedItems);
    const d = JSON.parse(degree);

    const subjectdata = {
      name: data.name,
      digree: d,
    };
    console.log(subjectdata);
    fetch("https://rsapp.bringin.io/subject_add", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(subjectdata),
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
      fetch(`https://rsapp.bringin.io/admin/subject/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data) {
            alert("deleted successfully");
            const remaining = subject?.filter((odr) => odr._id !== id);
            setSubject(remaining);
          }
        });
    }
  };

  // const showModal = () => {
  //   setIsModalOpen(true);
  // };

  // const handleOk = () => {
  //   setIsModalOpen(false);
  // };

  // const handleCancel = () => {
  //   setIsModalOpen(false);
  // };

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const handelSort = () => {
    let _subject = [...subject];
    //remove and save the dragged item content
    const draggedItemContent = _subject.splice(dragItem.current, 1)[0];
    //switch the position
    _subject.splice(dragOverItem.current, 0, draggedItemContent);

    //reset the position ref
    dragItem.current = null;
    dragOverItem.current = null;

    //update the actual array
    setSubject(_subject);
  };

  const [educationlavel, setEducationlavel] = useState([]);
  useEffect(() => {
    fetch("https://rsapp.bringin.io/admin/digree")
      .then((res) => res.json())
      .then((data) => {
        setIsLoding(true);
        setEducationlavel(data);
        console.log(data);
      });
  }, []);
  console.log(educationlavel);

  const [digree, setDigree] = useState([]);
  useEffect(() => {
    fetch("https://rsapp.bringin.io/education_lavel")
      .then((res) => res.json())
      .then((data) => {
        setIsLoding(true);
        setDigree(data);
        console.log(data);
      });
  }, []);
  console.log(digree);

  // console.log (JSON.stringify(selectedItems));
  function checkboxHandler(e) {
    let isSelected = e.target.checked;
    let value = e.target.value;

    if (isSelected) {
      setSelectedItems([...selectedItems, value]);
    } else {
      setSelectedItems((prevData) => {
        return prevData.filter((_id) => {
          return _id !== value;
        });
      });
    }
  }

  // function checkAllHandler() {
  //   if (educationlavel.length === selectedItems.length) {
  //     setSelectedItems([]);
  //   } else {
  //     const postIds = educationlavel.map((item) => {
  //       return item._id;
  //     });

  //     setSelectedItems(postIds);
  //   }
  // }

  const [edit, setEdit] = useState(null);
  const closeModal = () => {
    setEdit(null);
  };
  const editsubject = (data, e) => {
    // console.log(data);
    const editdata = {
      name: data.name,
    };

    fetch(`https://rsapp.bringin.io/subject_update/${edit._id}`, {
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
    <>
      <div>
        <div>
          <div className=" p-2  h-full mb-5">
            <h1 className="text-black text-[20px] font-semibold text-center ">
              Add Subject
            </h1>
            <form onSubmit={handleSubmit(addSubject)}>
              <div className="form-control w-full ">
                <label className="label">
                  {" "}
                  <span className="label-text text-black text-[15px] font-semibold">
                    Subject Name
                  </span>
                </label>
                <input
                  type="text"
                  {...register("name", {
                    required: "name is Required",
                  })}
                  className="input input-bordered w-full "
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>
              {/* <h3>Result will print here: {selectedItems} </h3> */}

              {/* <div>
                        <button type="button" onClick={checkAllHandler}>
                          {educationlavel.length === selectedItems.length
                            ? "Uncheck All"
                            : "Check all"}
                        </button>
                      </div> */}

              {/* <div className="left">
                        {educationlavel.map((item, index) => (
                          <div className="card " key={index}>
                            <div className="flex gap-2">
                            <label>
                              <input
                                type="checkbox"
                                checked={selectedItems.includes(item._id)}
                                value={item._id}
                                onChange={checkboxHandler}
                              />
                            </label>
                            <h2>{item.name}</h2>

                            </div>
                           
                          </div>
                        ))}
                      </div> */}
              <div className="form-control w-full ">
                <label className="label">
                  {" "}
                  <span className="label-text text-black text-[15px] font-semibold">
                    Select a Digree{" "}
                  </span>
                </label>

                <div className="flex justify-around">
                  {digree.map((d) => {
                    return (
                      <div key={d._id}>
                        <div>
                          <div>
                            <h1 className="my-4 text-black text-[15px] font-semibold">
                              {d.name}
                            </h1>
                            {d.digree.map((item) => (
                              <div key={item._id} className="flex gap-2">
                                <label>
                                  <input
                                    type="checkbox"
                                    checked={selectedItems.includes(item._id)}
                                    value={item._id}
                                    onChange={checkboxHandler}
                                  />
                                </label>
                                <h2>{item.name}</h2>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* <div className="mt-4">
                          <select
                            multiple
                            {...register("digree")}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-[200px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          >
                            {educationlavel.map((ca) => {
                              return (
                                <option key={ca._id} value={ca._id}>
                                  {ca.name}
                                </option>
                              );
                            })}
                          </select>
                        </div> */}
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
        <div>
          <div>
            <div className="flex flex-col">
              <div className=" ">
                <div className="inline-block min-w-full py-2 ">
                  <div className="overflow-hidden">
                    <table className="min-w-full w-[1000px] text-left text-sm font-light">
                      <thead className="border-b bg-gray-100 text-[18px] font-medium dark:border-neutral-500 ">
                        <tr>
                          <th scope="col" className="px-6 py-4">
                            No
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Subject
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Digree
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Education Lavel
                          </th>
                          <th scope="col" className="px-6 py-4 text-">
                            Edit
                          </th>
                          <th scope="col" className="px-6 py-4 text-center">
                            Delete
                          </th>
                        </tr>
                      </thead>
                      {subject.map((su, i) => (
                        <tbody
                          className="text-[15px] bg-gray-50"
                          key={su._id}
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
                                <p className="my-2"> {su.name}</p>
                              </div>
                            </td>

                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              <div>
                                {su?.digree?.name ? (
                                  <p className="my-2"> {su.digree.name}</p>
                                ) : (
                                  <p></p>
                                )}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              {su?.digree?.map((d) => (
                                <div key={d._id}>
                                  <p className="my-2">{d.name}</p>
                                </div>
                              ))}
                            </td>
                            <td>
                              <label
                                onClick={() => setEdit(su)}
                                htmlFor="education-modal"
                                className="btn btn-sm btn-error"
                              >
                                Edit
                              </label>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-center">
                              <button onClick={() => handelDeeted(su._id)}>
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
          <SubjectEditModal
            title={`Are you sure you want to edit?`}
            message={`Do you want to edit ${edit.name}.`}
            successButtonName="Delete"
            modalData={edit}
            add={editsubject}
            closeModal={closeModal}
          >
            {" "}
          </SubjectEditModal>
        )}
      </div>
    </>
  );
};

export default Subject;
