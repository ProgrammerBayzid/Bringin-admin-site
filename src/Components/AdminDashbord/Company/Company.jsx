import { useRef, useState } from "react";
import { Button, Modal } from "antd";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";
import Spinner from "../../Spinner/Spinner";
import CompanyEditModal from "./CompanyEditModal";

const Company = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [company, setCompany] = useState([]);
  const [isLoding, setIsLoding] = useState(false);

  useEffect(() => {
    fetch("https://rsapp.unbolt.co/seekercompany")
      .then((res) => res.json())
      .then((data) => {
        setIsLoding(true);
        setCompany(data);
        console.log(data);
      });
  }, [refresh]);
  console.log(company);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addSkill = (data, e) => {
    // console.log(data);
    const companydata = {
      name: data.name,
      published_date: new Date().toLocaleString(),
    };
    const storedToken = localStorage.getItem("admin_token");
    const token = storedToken ? storedToken.replace(/"/g, "") : null;

    if ( token === null) {
      console.log("token not found");
    } else {

      fetch("https://rsapp.unbolt.co/seekercompany", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(companydata),
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

    if (!proced &&  token === null) {
      console.log("token not found");
    } else {
      fetch(`https://rsapp.unbolt.co/seekercompany/${id}`, {
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
            const remaining = company?.filter((odr) => odr._id !== id);
            setCompany(remaining);
          }
        });
    }
  };

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);
  const handelSort = () => {
    let _company = [...company];
    //remove and save the dragged item content
    const draggedItemContent = _company.splice(dragItem.current, 1)[0];
    //switch the position
    _company.splice(dragOverItem.current, 0, draggedItemContent);

    //reset the position ref
    dragItem.current = null;
    dragOverItem.current = null;

    //update the actual array
    setCompany(_company);
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
  const editskill = (data, e) => {
    // console.log(data);
    const editdata = {
      name: data.name,
    };
    const storedToken = localStorage.getItem("admin_token");
    const token = storedToken ? storedToken.replace(/"/g, "") : null;

    if ( token === null) {
      console.log("token not found");
    } else {


      fetch(`https://rsapp.unbolt.co/company_name_update/${edit._id}`, {
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
              Add Company Name
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
                <form onSubmit={handleSubmit(addSkill)}>
                  <div className="form-control w-full ">
                    <label className="label">
                      {" "}
                      <span className="label-text">Company</span>
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
            <div className="inline-block min-w-full py-2 ">
              <div className="overflow-hidden">
                <table className="min-w-full w-[1000px] text-left text-sm font-light">
                  <thead className="border-b bg-gray-100 text-[18px] font-medium dark:border-neutral-500 ">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        No
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Company
                      </th>
                    
                      <th scope="col" className="px-6 py-4 text-">
                        Edit
                      </th>
                      <th scope="col" className="px-6 py-4 text-center">
                        Delete
                      </th>
                    </tr>
                  </thead>
                  {company.map((co, i) => (
                    <tbody
                      className="text-[15px] bg-gray-50"
                      key={co._id}
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
                          {co.name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          <label
                            onClick={() => setEdit(co)}
                            htmlFor="company-modal"
                            className="btn btn-sm btn-error"
                          >
                            Edit
                          </label>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-center">
                          <button onClick={() => handelDeeted(co._id)}>
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
      {edit && (
        <CompanyEditModal
          title={`Are you sure you want to edit?`}
          message={`Do you want to edit ${edit.name}.`}
          successButtonName="Delete"
          modalData={edit}
          add={editskill}
          closeModal={closeModal}
        >
          {" "}
        </CompanyEditModal>
      )}
    </div>
  );
};

export default Company;
