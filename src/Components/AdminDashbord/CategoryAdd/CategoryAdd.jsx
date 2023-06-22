import { Button, Modal } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillDelete , AiTwotoneEdit} from "react-icons/ai";


const CategoryAdd = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [category, setCategory] = useState([]);
    const [refresh, setRefresh] = useState(true);
    const [isLoding, setIsLoding] = useState(false);

    useEffect(() => {

        fetch("https://app.bringin.io/admin/category")
          .then((res) => res.json())
          .then((data) => {
            setIsLoding(true);
            setCategory(data);
            console.log(data);
          });
      }, []);
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
    
        fetch("https://app.bringin.io/categoryadd", {
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

      
  const handelDeeted = id => {
    const proced = window.confirm('Are You Sure')
    if (proced) {
        fetch(`https://app.bringin.io/admin/category/${id}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data) {
                    alert('deleted successfully');
                    const remaining =  category?.filter(odr => odr._id !== id);
                    setCategory(remaining);
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
                      <p className="text-red-500">{errors.categoryname.message}</p>
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
            <div className="mt-10">
    <div className="grid grid-cols-2 gap-5 ">
        {category.map((ca, i) => (
          <div
            key={ca._id}
            className="relative flex w-full h-full flex-col rounded-xl bg-stone-200 bg-clip-border text-gray-700 shadow-md"
          >
        <div className="">
          <div className="flex justify-between mx-5 mt-2">
          <p className="mt-2"> NO. {i+1}</p>
          <button className="text-red" onClick={() => handelDeeted(ca._id)} ><AiFillDelete ></AiFillDelete></button>

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
                          Catagoris Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 border-[1px] border-[#6A6A6A] text-[#454545]   lg:text-[13px] md:text-[13px]"
                        >
                          Catagoris ID
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <th
                        scope="col"
                        className="px-6 py-3 border-[1px] border-[#6A6A6A] text-[#454545]   lg:text-[13px] md:text-[13px]"
                      >
                        {ca.categoryname}
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 border-[1px] border-[#6A6A6A] text-[#454545]   lg:text-[13px] md:text-[13px]"
                      >
                        {ca._id}
                      </th>
                    </tbody>
                  </table>
                </div>
              </div>
              <hr></hr>
              <div>
                <div>
                  <h1 className="text-center text-[13px] font-bold my-2">Functionl Area</h1>
                  <hr className="mx-10"></hr>
                </div>
                <table>
                  <thead className="border text-[13px] ">
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

                  {ca.functionarea.map((fu) => (
                    <tbody key={fu._id}>
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
                  ))}
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
ca?.industryid?.industryname?
                      <th
                        scope="col"
                        className="px-6 py-3 border-[1px] border-[#6A6A6A] text-[#454545]   lg:text-[13px] md:text-[13px]"
                      >
                     {  ca?.industryid?.industryname}
                      </th> :  <th
                        scope="col"
                        className="px-6 py-3 border-[1px] border-[#6A6A6A] text-[#454545]   lg:text-[13px] md:text-[13px]"
                      >
                       null
                      </th>
                    }

                    {
                      ca?.industryid?._id? 
                      <th
                        scope="col"
                        className="px-6 py-3 border-[1px] border-[#6A6A6A] text-[#454545]   lg:text-[13px] md:text-[13px]"
                      >
                        {ca?.industryid?._id}
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
    );
};

export default CategoryAdd;