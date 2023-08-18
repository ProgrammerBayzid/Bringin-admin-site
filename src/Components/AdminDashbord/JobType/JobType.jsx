import { useState } from "react";
import { Button, Modal } from "antd";
import { useForm } from "react-hook-form";
import { useEffect, useRef } from "react";
import { AiFillDelete } from "react-icons/ai";

import Spinner from "../../Spinner/Spinner";

const JobType = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [jobType, setJobType] = useState([]);
  const [isLoding, setIsLoding] = useState(false);

  useEffect(() => {
    fetch("https://rsapp.bringin.io/admin/jobtype")
      .then((res) => res.json())
      .then((data) => {
        setIsLoding(true);
        setJobType(data);
        console.log(data);
      });
  }, [refresh]);
  console.log(jobType);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addJobtype = (data, e) => {
    // console.log(data);
    const jobTypedata = {
      worktype: data.worktype,
      published_date: new Date().toLocaleString(),
    };

    fetch("https://rsapp.bringin.io/jobtype", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(jobTypedata),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setRefresh(!refresh);
        }
        e.target.reset();
        console.log(data);

      });
  };

  const handelDeeted = (id) => {
    const proced = window.confirm("Are You Sure");
    if (proced) {
      fetch(`https://rsapp.bringin.io/admin/jobtype/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data) {
            alert("deleted successfully");
            const remaining = jobType?.filter((odr) => odr._id !== id);
            setJobType(remaining);
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



const dragItem=useRef(null)
const dragOverItem=useRef(null)


const handelSort=()=>{
  let _jobType =[...jobType]
     //remove and save the dragged item content
     const draggedItemContent = _jobType.splice(dragItem.current, 1)[0];
     //switch the position
     _jobType.splice(dragOverItem.current, 0, draggedItemContent);

    //reset the position ref
    dragItem.current = null;
    dragOverItem.current = null;

    //update the actual array
    setJobType(_jobType)
}


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
              Add Jobe Type
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
                <form onSubmit={handleSubmit(addJobtype)}>
                  <div className="form-control w-full ">
                    <label className="label">
                      {" "}
                      <span className="label-text">Job Type</span>
                    </label>
                    <input
                      type="text"
                      {...register("worktype", {
                        required: "  worktype is Required",
                      })}
                      className="input input-bordered w-full "
                    />
                    {errors.phoneName && (
                      <p className="text-red-500">{errors.worktype.message}</p>
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
            <div className="  py-10">
              <div className="overflow-hidden">
                <table className=" text-left text-sm font-light w-[1000px]">
                  <thead className="border-b  bg-gray-100 text-[18px] font-medium">
                    <tr className="ml-20">
                      <th scope="col" className="px-6 py-4">
                        No
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Job Type
                      </th>
                     
                      <th scope="col" className="px-6 py-4 text-center">
                        Action
                      </th>
                    </tr>
                  </thead>

                  {jobType.map((job, index) => (
                    <tbody className="text-[15px] mt-5" key={job._id}  onDragStart={(e) => (dragItem.current=index)}
                    onDragEnter={(e) => (dragOverItem.current=index)}
                    onDragEnd={handelSort}>
                      <tr
                        className="border-b my-2 bg-zinc-50 "
                        draggable
                       
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {job.worktype}
                        </td>
                      
                        <td className="whitespace-nowrap px-6 py-4 text-center">
                          <button
                            className=""
                            onClick={() => handelDeeted(job._id)}
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
  );
};

export default JobType;
