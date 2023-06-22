import { Button, Modal } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillDelete , AiTwotoneEdit} from "react-icons/ai";


const Subject = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [subject, setSubject] = useState([]);
    const [refresh, setRefresh] = useState(true);
    const [isLoding, setIsLoding] = useState(false);

    useEffect(() => {

        fetch("https://app.bringin.io/subject")
          .then((res) => res.json())
          .then((data) => {
            setIsLoding(true);
            setSubject(data);
            console.log(data);
          });
      }, []);
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
    
        fetch("https://app.bringin.io/subject_add", {
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

      
//   const handelDeeted = id => {
//     const proced = window.confirm('Are You Sure')
//     if (proced) {
//         fetch(`https://app.bringin.io/admin/industry/${id}`, {
//             method: "DELETE",
//         })
//             .then(res => res.json())
//             .then(data => {
//                 console.log(data)
//                 if (data.deletedCount) {
//                     alert('deleted successfully');
//                     const remaining = industry?.filter(odr => odr._id !== id);
//                     setIndustry(remaining);
//                 }
//             })

//     }
// };
    
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
        <div>
            
            <div>
          <div>
            <Button className="bg-[#0077B5] btn" onClick={showModal}>
              Add Digree
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
                        required: "  name is Required",
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
                      <span className="label-text">Education Id</span>
                    </label>
                    <input
                      type="text"
                      {...register("education", {
                        required: "  education is Required",
                      })}
                      className="input input-bordered w-full "
                    />
                    {errors.phoneName && (
                      <p className="text-red-500">{errors.education.message}</p>
                    )}
                  </div>
                  <div className="form-control w-full ">
                    <label className="label">
                      {" "}
                      <span className="label-text">Digree Id</span>
                    </label>
                    <input
                      type="text"
                      {...register("digree", {
                        required: "  digree is Required",
                      })}
                      className="input input-bordered w-full "
                    />
                    {errors.phoneName && (
                      <p className="text-red-500">{errors.digree.message}</p>
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


            </div>
        </div>
    );
};

export default Subject;