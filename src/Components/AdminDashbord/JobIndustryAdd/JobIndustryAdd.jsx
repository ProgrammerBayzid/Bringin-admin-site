import { Button, Modal } from "antd";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillDelete,  } from "react-icons/ai";

import Spinner from "../../Spinner/Spinner";

const JobIndustryAdd = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [industry, setIndustry] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [isLoding, setIsLoding] = useState(false);

  useEffect(() => {
    fetch("http://rsapp.bringin.io/admin/industry")
      .then((res) => res.json())
      .then((data) => {
        setIsLoding(true);
        setIndustry(data);
        console.log(data);
      });
  }, [refresh]);
  console.log(industry);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addIndustry = (data, e) => {
    // console.log(data);
    const industrydata = {
      industryname: data.industryname,
    };

    fetch("http://rsapp.bringin.io/industryadd", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(industrydata),
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
      fetch(`http://rsapp.bringin.io/admin/industry/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data) {
            alert("deleted successfully");
            const remaining = industry?.filter((odr) => odr._id !== id);
            setIndustry(remaining);
          }
        });
    }
  };




  const dragItem=useRef(null)
const dragOverItem=useRef(null)


const handelSort=()=>{
  let _industry =[...industry]
     //remove and save the dragged item content
     const draggedItemContent = _industry.splice(dragItem.current, 1)[0];
     //switch the position
     _industry.splice(dragOverItem.current, 0, draggedItemContent);

    //reset the position ref
    dragItem.current = null;
    dragOverItem.current = null;

    //update the actual array
    setIndustry(_industry)
}

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (isLoding === false) {
    return <Spinner></Spinner>;
  }
  return (
    <div>
      <div>
        <div>
          <Button className="bg-[#0077B5] btn" onClick={showModal}>
            Add Industry Name
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
                  <form onSubmit={handleSubmit(addIndustry)}>
                    <div className="form-control w-full ">
                      <label className="label">
                        {" "}
                        <span className="label-text">Industry Name</span>
                      </label>
                      <input
                        type="text"
                        {...register("industryname", {
                          required: "  industryname is Required",
                        })}
                        className="input input-bordered w-full "
                      />
                      {errors.phoneName && (
                        <p className="text-red-500">
                          {errors.industryname.message}
                        </p>
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
      <div className="flex flex-col">
  <div className=" mt-10">
    <div className="inline-block  py-2 ">
      <div className="overflow-hidden">
        <table className=" text-left text-sm w-[1000px] font-light">
          <thead className="border-b bg-gray-100 text-[18px] font-medium  ">
            <tr>
              <th scope="col" className="px-6 py-4">No</th>
              <th scope="col" className="px-6 py-4">Industry</th>
              <th scope="col" className="px-6 py-4">Categoris</th>
              <th scope="col" className="px-6 py-4 text-center">Action</th>
             
            </tr>
          </thead>
          {
       industry.map((ins , i)=>
            <tbody className="text-[15px]" key={ins._id}     onDragStart={(e) => (dragItem.current=i)}
            onDragEnter={(e) => (dragOverItem.current=i)}
            onDragEnd={handelSort}  draggable >
            <tr className="border-b bg-gray-50">
              <td className="whitespace-nowrap px-6 py-4 font-medium">{i+1}</td>
              <td className="whitespace-nowrap px-6 py-4 font-medium">
              <div>
                                <p className="my-2"> {ins.industryname}</p>
                                
                              </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4 font-medium">
                {
                  ins.category.map((ca)=>(
                    <div key={ca._id}>
                    <p className="my-2">{ca.categoryname}</p>
                 
                  </div>
                  ))
                }
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-center">
              <button  onClick={() => handelDeeted(ins._id)} ><AiFillDelete className="text-red-500"></AiFillDelete></button>

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

export default JobIndustryAdd;
