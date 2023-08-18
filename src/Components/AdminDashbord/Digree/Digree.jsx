import { Button, Modal } from "antd";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";
import Spinner from "../../Spinner/Spinner";
import DigreeEditModel from "./DigreeEditModel";

const Digree = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [refresh, setRefresh] = useState(true);
  const [isLoding, setIsLoding] = useState(false);

  const [digree, setDigree] = useState([]);
  useEffect(() => {
    fetch("https://rsapp.bringin.io/admin/digree")
      .then((res) => res.json())
      .then((data) => {
        setIsLoding(true);
        setDigree(data);
        console.log(data);
      });
  }, [refresh]);
  console.log(digree);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addDigree = (data, e) => {
    // console.log(data);
    const digreedata = {
      name: data.name,
      education: data.education,
    };

    fetch("https://rsapp.bringin.io/digree_add", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(digreedata),
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
      fetch(`https://rsapp.bringin.io/admin/digree/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data) {
            alert("deleted successfully");
            const remaining = digree?.filter((odr) => odr._id !== id);
            setDigree(remaining);
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
    let _digree = [...digree];
    //remove and save the dragged item content
    const draggedItemContent = _digree.splice(dragItem.current, 1)[0];
    //switch the position
    _digree.splice(dragOverItem.current, 0, draggedItemContent);

    //reset the position ref
    dragItem.current = null;
    dragOverItem.current = null;

    //update the actual array
    setDigree(_digree);
  };
  const [educationlavel, setEducationlavel] = useState([]);
  useEffect(() => {
    fetch("https://rsapp.bringin.io/education_lavel")
      .then((res) => res.json())
      .then((data) => {
        setIsLoding(true);
        setEducationlavel(data);
        console.log(data);
      });
  }, []);
  console.log(educationlavel);

  const [edit, setEdit] = useState(null);

  const closeModal = () => {
    setEdit(null);
  };

  const editdigree = (data, e) => {
    // console.log(data);
    const editdata = {
      name: data.name,
    };

    fetch(`https://rsapp.bringin.io/degree_update/${edit._id}`, {
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
            Add Degree
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
                  <form onSubmit={handleSubmit(addDigree)}>
                    <div className="form-control w-full ">
                      <label className="label">
                        {" "}
                        <span className="label-text">Degree Name</span>
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
          <div>
            <div className="flex flex-col">
              <div className=" ">
                <div className="inline-block min-w-full py-2 ">
                  <div className="overflow-hidden">
                    <table className="min-w-full text-left w-[1000px] text-sm font-light">
                      <thead className="border-b text-[18px] bg-gray-100 font-medium dark:border-neutral-500 ">
                        <tr>
                          <th scope="col" className="px-6 py-4">
                            No
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Digree
                          </th>

                          <th scope="col" className="px-6 py-4">
                            Education
                          </th>
                          <th scope="col" className="px-6 py-4 text-">
                            Edit
                          </th>
                          <th scope="col" className="px-6 py-4 text-center">
                            Delete
                          </th>
                        </tr>
                      </thead>
                      {digree.map((di, i) => (
                        <tbody
                          className="text-[15px] bg-gray-50"
                          key={di._id}
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
                                <p className="my-2"> {di.name}</p>
                              </div>
                            </td>

                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              <div>
                                {di?.education?.name ? (
                                  <p className="my-2">{di.education.name}</p>
                                ) : (
                                  <p>Null</p>
                                )}
                              </div>
                            </td>
                            <td>
                              <label
                                onClick={() => setEdit(di)}
                                htmlFor="education-modal"
                                className="btn btn-sm btn-error"
                              >
                                Edit
                              </label>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-center">
                              <button onClick={() => handelDeeted(di._id)}>
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
      </div>

      {edit && (
        <DigreeEditModel
          title={`Are you sure you want to edit?`}
          message={`Do you want to edit ${edit.name}.`}
          successButtonName="Delete"
          modalData={edit}
          add={editdigree}
          closeModal={closeModal}
        >
          {" "}
        </DigreeEditModel>
      )}
    </div>
  );
};

export default Digree;
