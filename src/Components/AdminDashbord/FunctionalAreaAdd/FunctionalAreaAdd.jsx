import { Button, Modal } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillDelete , AiTwotoneEdit} from "react-icons/ai";


const FunctionalAreaAdd = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [functionalarea, setFunctionalarea] = useState([]);
    const [refresh, setRefresh] = useState(true);
    const [isLoding, setIsLoding] = useState(false);

    useEffect(() => {

        fetch("https://app.bringin.io/admin/functionalarea")
          .then((res) => res.json())
          .then((data) => {
            setIsLoding(true);
            setFunctionalarea(data);
            console.log(data);
          });
      }, []);
      console.log(functionalarea);

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
      const addFunctionalarea = (data, e) => {
        // console.log(data);
        const functionalareadata = {
          categoryid: data.categoryid,
          industryid: data.industryid,
          functionalname: data.functionalname,

    
        };
    
        fetch("https://app.bringin.io/functionalareaadd", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(functionalareadata),
        })
          .then((res) => res.json())
          .then((result) => {
            setRefresh(!refresh);
            e.target.reset();
            console.log(result);
          });
      };

      
  const handelDeeted = id => {
    const proced = window.confirm('Are You Sure')
    if (proced) {
        fetch(`https://app.bringin.io/admin/functionalarea/${id}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data) {
                    alert('deleted successfully');
                    const remaining = functionalarea?.filter(odr => odr._id !== id);
                    setFunctionalarea(remaining);
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
        <div>
            
            <div>
          <div>
            <Button className="bg-[#0077B5] btn" onClick={showModal}>
              Add Functional Area
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
                <form onSubmit={handleSubmit(addFunctionalarea)}>
                  <div className="form-control w-full ">
                    <label className="label">
                      {" "}
                      <span className="label-text">Functional Name</span>
                    </label>
                    <input
                      type="text"
                      {...register("functionalname", {
                        required: "  functionalname is Required",
                      })}
                      className="input input-bordered w-full "
                    />
                    {errors.phoneName && (
                      <p className="text-red-500">{errors.functionalname.message}</p>
                    )}
                  </div>
                  <div className="form-control w-full ">
                    <label className="label">
                      {" "}
                      <span className="label-text">Industry Id </span>
                    </label>
                    <input
                      type="text"
                      {...register("industryid", {
                        required: "  industryid is Required",
                      })}
                      className="input input-bordered w-full "
                    />
                    {errors.phoneName && (
                      <p className="text-red-500">{errors.industryid.message}</p>
                    )}
                  </div>
                  <div className="form-control w-full ">
                    <label className="label">
                      {" "}
                      <span className="label-text">Category Id</span>
                    </label>
                    <input
                      type="text"
                      {...register("categoryid", {
                        required: "  categoryid is Required",
                      })}
                      className="input input-bordered w-full "
                    />
                    {errors.phoneName && (
                      <p className="text-red-500">{errors.categoryid.message}</p>
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

            <div>
            <div className="mt-10">
    <div className="grid grid-cols-2 gap-5 ">
        {functionalarea.map((fu,i) => (
          <div
            key={fu._id}
            className="relative flex w-full h-full flex-col rounded-xl bg-stone-200 bg-clip-border text-gray-700 shadow-md"
          >
        <div>
          <div className="flex justify-between mx-5 mt-2">
          <p className="mt-2"> NO. {i+1}</p>
          <button className="text-red" onClick={() => handelDeeted(fu._id)} ><AiFillDelete ></AiFillDelete></button>

          </div>
        <div className="p-6">
              <div>
                <div className="">
                  <table>
                    <thead className="border text-[10px] ">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 border-[1px] border-[#6A6A6A] text-[#454545]   lg:text-[13px] md:text-[13px]"
                        >
                           Functionl Area Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 border-[1px] border-[#6A6A6A] text-[#454545]   lg:text-[13px] md:text-[13px]"
                        >
                           Functionl Area ID
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <th
                        scope="col"
                        className="px-6 py-3 border-[1px] border-[#6A6A6A] text-[#454545]   lg:text-[13px] md:text-[13px]"
                      >
                        {fu.functionalname}
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 border-[1px] border-[#6A6A6A] text-[#454545]   lg:text-[13px] md:text-[13px]"
                      >
                        {fu._id}
                      </th>
                    </tbody>
                  </table>
                </div>
              </div>
              <hr></hr>
              <div>
                <div>
                  <h1 className="text-center text-[13px] font-bold my-2">Catagoris</h1>
                  <hr className="mx-10"></hr>
                </div>
                <table>
                  <thead className="border text-[13px] ">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 border-[1px] border-[#6A6A6A] text-[#454545]   lg:text-[13px] md:text-[13px]"
                      >
                       Categoris Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 border-[1px] border-[#6A6A6A] text-[#454545]   lg:text-[13px] md:text-[13px]"
                      >
                       Categoris ID
                      </th>
                    </tr>
                  </thead>

                
                    <tbody >
                      <th
                        scope="col"
                        className="px-6 py-3 border-[1px] border-[#6A6A6A] text-[#454545]   lg:text-[13px] md:text-[13px]"
                      >
                        {fu.categoryid.categoryname}
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 border-[1px] border-[#6A6A6A] text-[#454545]   lg:text-[13px] md:text-[13px]"
                      >
                        {fu.categoryid._id}
                      </th>
                    </tbody>
               
                </table>
               
              </div>
              <div>
                <div>
                  <h1 className="text-center text-[13px] font-bold my-2">Industry</h1>
                  <hr className="mx-10"></hr>
                </div>
                <table>
                  <thead className="border text-[13px] ">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 border-[1px] border-[#6A6A6A] text-[#454545]   lg:text-[13px] md:text-[13px]"
                      >
                        Industry Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 border-[1px] border-[#6A6A6A] text-[#454545]   lg:text-[13px] md:text-[13px]"
                      >
                       Industry ID
                      </th>
                    </tr>
                  </thead>

               
                    <tbody >

                      

                    {
fu?.industryid?.industryname?
                      <th
                        scope="col"
                        className="px-6 py-3 border-[1px] border-[#6A6A6A] text-[#454545]   lg:text-[13px] md:text-[13px]"
                      >
                     {  fu?.industryid?.industryname}
                      </th> :  <th
                        scope="col"
                        className="px-6 py-3 border-[1px] border-[#6A6A6A] text-[#454545]   lg:text-[13px] md:text-[13px]"
                      >
                       null
                      </th>
                    }

                    {
                      fu?.industryid?._id? 
                      <th
                        scope="col"
                        className="px-6 py-3 border-[1px] border-[#6A6A6A] text-[#454545]   lg:text-[13px] md:text-[13px]"
                      >
                        {fu?.industryid?._id}
                      </th>:    <th
                        scope="col"
                        className="px-6 py-3 border-[1px] border-[#6A6A6A] text-[#454545]   lg:text-[13px] md:text-[13px]"
                      >
                       null
                      </th>
                    }
                    </tbody>
             
                </table>
               
              </div>
            </div>
        </div>
          </div>
        ))}
      </div>
    </div>

            </div>
            </div>
        </div>
    );
};

export default FunctionalAreaAdd;