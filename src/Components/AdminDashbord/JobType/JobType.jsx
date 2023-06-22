import { useState } from "react";
import { Button, Modal } from "antd";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { AiFillDelete , AiTwotoneEdit} from "react-icons/ai";

const JobType = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [jobType, setJobType] = useState([]);
  const [isLoding, setIsLoding] = useState(false);

  useEffect(() => {

    fetch("https://app.bringin.io/admin/jobtype")
      .then((res) => res.json())
      .then((data) => {
        setIsLoding(true);
        setJobType(data);
        console.log(data);
      });
  }, []);
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

    fetch("https://app.bringin.io/jobtype", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(jobTypedata),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setRefresh(!refresh)
      }
        e.target.reset();
        console.log(data);
      });
  };


  const handelDeeted = id => {
    const proced = window.confirm('Are You Sure')
    if (proced) {
        fetch(`https://app.bringin.io/admin/jobtype/${id}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data) {
                    alert('deleted successfully');
                    const remaining = jobType?.filter(odr => odr._id !== id);
                    setJobType(remaining);
                }
            })

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
    <div className="inline-block min-w-full py-2 ">
      <div className="overflow-hidden">
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b text-[18px] font-medium dark:border-neutral-500 ">
            <tr>
              <th scope="col" className="px-6 py-4">No</th>
              <th scope="col" className="px-6 py-4">Job Type</th>
              <th scope="col" className="px-6 py-4">Job Type ID</th>
              <th scope="col" className="px-6 py-4">Action</th>
             
            </tr>
          </thead>
          {
       jobType.map((job , i)=>
            <tbody className="text-[15px]" key={job._id}>
            <tr className="border-b dark:border-neutral-500">
              <td className="whitespace-nowrap px-6 py-4 font-medium">{i+1}</td>
              <td className="whitespace-nowrap px-6 py-4 font-medium">{job.worktype}</td>
              <td className="whitespace-nowrap px-6 py-4 font-medium">{job._id}</td>
              <td className="whitespace-nowrap px-6 py-4">
              <button className="text-red" onClick={() => handelDeeted(job._id)} ><AiFillDelete ></AiFillDelete></button>

              </td>
            </tr>
          </tbody>
            
            )
          }
       
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
