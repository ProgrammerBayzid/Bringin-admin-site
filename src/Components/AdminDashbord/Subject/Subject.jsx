import { Button, Modal } from "antd";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillDelete } from "react-icons/ai";
import Spinner from "../../Spinner/Spinner";

const Subject = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [subject, setSubject] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [isLoding, setIsLoding] = useState(false);

  useEffect(() => {
    fetch("http://rsapp.bringin.io/admin/subject")
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
    // console.log(data);
    const subjectdata = {
      name: data.name,
      education: data.education,
      digree: data.digree,
    };

    fetch("http://rsapp.bringin.io/subject_add", {
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
      fetch(`http://rsapp.bringin.io/admin/subject/${id}`, {
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
    fetch("http://rsapp.bringin.io/education_lavel")
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
    fetch("http://rsapp.bringin.io/admin/digree")
      .then((res) => res.json())
      .then((data) => {
        setIsLoding(true);
        setDigree(data);
        console.log(data);
      });
  }, []);
  console.log(digree);

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
            Add Subject
          </Button>
        </div>
        <div>
          <Modal
            title=" Add Subject"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <div>
              <div>
                <div className=" p-7">
                  <form onSubmit={handleSubmit(addSubject)}>
                    <div className="form-control w-full ">
                      <label className="label">
                        {" "}
                        <span className="label-text">Subject Name</span>
                      </label>
                      <input
                        type="text"
                        {...register("name", {
                          required: "name is Required",
                        })}
                        className="input input-bordered w-full "
                      />
                      {errors.phoneName && (
                        <p className="text-red-500">{errors.name.message}</p>
                      )}
                    </div>

                    <div className="form-control w-full ">
                      <label className="label">
                        {" "}
                        <span className="label-text">Select a Education </span>
                      </label>
                      <select
                        {...register("education")}
                        className="select input-bordered w-full "
                      >
                        {educationlavel.map((ca) => {
                          return (
                            <option value={ca._id} key={ca._id}>
                              {ca.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="form-control w-full ">
                      <label className="label">
                        {" "}
                        <span className="label-text">Select a Degree </span>
                      </label>
                      <select
                        {...register("digree")}
                        className="select input-bordered w-full "
                      >
                        {digree.map((ca) => {
                          return (
                            <option value={ca._id} key={ca._id}>
                              {ca.name}
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
                        <th scope="col" className="px-6 py-4 text-center">
                          Action
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
                            <div>{
                              
                              
                              su?.educaton?.name? 
                              <p className="my-2">{su.educaton.name}</p>
                              :
                              <p></p>
                              
                              
                              }
                            
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-center">
                            <button
                              
                              onClick={() => handelDeeted(su._id)}
                            >
                              <AiFillDelete    className="text-red-500"></AiFillDelete>
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

export default Subject;
