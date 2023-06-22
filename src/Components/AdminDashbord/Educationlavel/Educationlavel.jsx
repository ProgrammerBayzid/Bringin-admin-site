import { Button, Modal } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillDelete , AiTwotoneEdit} from "react-icons/ai";


const Educationlavel = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [educationlavel, setEducationlavel] = useState([]);
    const [refresh, setRefresh] = useState(true);
    const [isLoding, setIsLoding] = useState(false);

    useEffect(() => {

        fetch("https://app.bringin.io/functionalarea")
          .then((res) => res.json())
          .then((data) => {
            setIsLoding(true);
            setEducationlavel(data);
            console.log(data);
          });
      }, []);
      console.log(educationlavel);

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
      const addEducationlavel = (data, e) => {
        // console.log(data);
        const educationlaveldata = {
          name: data.name,
        
         

    
        };
    
        fetch("https://app.bringin.io/education_lavel", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(educationlaveldata),
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
          title=" Add An Industry"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div>
            <div>
              <div className=" p-7">
                <form onSubmit={handleSubmit(addEducationlavel)}>
                  <div className="form-control w-full ">
                    <label className="label">
                      {" "}
                      <span className="label-text">Education Lavel </span>
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

export default Educationlavel;