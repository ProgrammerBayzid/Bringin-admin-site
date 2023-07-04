import { Button, Modal } from "antd";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillDelete , AiTwotoneEdit} from "react-icons/ai";
import Spinner from "../../Spinner/Spinner";


const AddSalaries = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [salaries, setSalaries] = useState([]);
    const [refresh, setRefresh] = useState(true);
    const [isLoding, setIsLoding] = useState(false);

    useEffect(() => {

        fetch("http://rsapp.bringin.io/admin/salarie")
          .then((res) => res.json())
          .then((data) => {
            setIsLoding(true);
            setSalaries(data);
            console.log(data);
          });
      }, [refresh]);
      console.log(salaries);

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
      const addSalaries = (data, e) => {
        // console.log(data);
        const salariesdata = {
          min_salary: data.min_salary,
          max_salary: data.max_salary,
          currency: data.currency,
         

    
        };
    
        fetch("http://rsapp.bringin.io/salarietype", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(salariesdata),
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
        fetch(`http://rsapp.bringin.io/admin/salarie/${id}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data) {
                    alert('deleted successfully');
                    const remaining = salaries?.filter(odr => odr._id !== id);
                    setSalaries(remaining);
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

  const dragItem=useRef(null)
  const dragOverItem=useRef(null)
  const handelSort=()=>{
    let _salaries =[...salaries]
       //remove and save the dragged item content
       const draggedItemContent = _salaries.splice(dragItem.current, 1)[0];
       //switch the position
       _salaries.splice(dragOverItem.current, 0, draggedItemContent);
  
      //reset the position ref
      dragItem.current = null;
      dragOverItem.current = null;
  
      //update the actual array
      setSalaries(_salaries)
  }


  if (isLoding === false) {
    return <div className="">
      <Spinner></Spinner>
    </div>;
  }
    return (
        <div>
            
            <div>
          <div>
            <Button className="bg-[#0077B5] btn" onClick={showModal}>
              Add Salary
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
                <form onSubmit={handleSubmit(addSalaries)}>
                  <div className="form-control w-full ">
                    <label className="label">
                      {" "}
                      <span className="label-text">Min Salary</span>
                    </label>
                    <input
                      type="text"
                      {...register("min_salary", {
                        required: "  min_salary is Required",
                      })}
                      className="input input-bordered w-full "
                    />
                    {errors.phoneName && (
                      <p className="text-red-500">{errors.min_salary.message}</p>
                    )}
                  </div>
                  <div className="form-control w-full ">
                    <label className="label">
                      {" "}
                      <span className="label-text">Max Salary </span>
                    </label>
                    <input
                      type="text"
                      {...register("max_salary", {
                        required: "  max_salary is Required",
                      })}
                      className="input input-bordered w-full "
                    />
                    {errors.phoneName && (
                      <p className="text-red-500">{errors.max_salary.message}</p>
                    )}
                  </div>
                  <div className="form-control w-full ">
                    <label className="label">
                      {" "}
                      <span className="label-text">currency </span>
                    </label>
                    <input
                      type="text"
                      {...register("currency", {
                        required: "  currency is Required",
                      })}
                      className="input input-bordered w-full "
                    />
                    {errors.phoneName && (
                      <p className="text-red-500">{errors.currency.message}</p>
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
      <div className="flex flex-col">
  <div className=" ">
    <div className="inline-block min-w-full py-2 ">
      <div className="overflow-hidden">
        <table className="min-w-full text-left text-sm font-light w-[1000px]">
          <thead className="border-b text-[18px] bg-gray-100 font-medium dark:border-neutral-500 ">
            <tr>
              <th scope="col" className="px-6 py-4">No</th>
              <th scope="col" className="px-6 py-4"> Min Salary</th>
              <th scope="col" className="px-6 py-4">Max Salary Type</th>
              <th scope="col" className="px-6 py-4">Currency </th>
              <th scope="col" className="px-6 py-4 text-center">Action</th>
             
            </tr>
          </thead>
          {
       salaries.map((sa , i)=>
            <tbody className="text-[15px] bg-gray-50" key={sa._id}
            onDragStart={(e) => (dragItem.current=i)}
            onDragEnter={(e) => (dragOverItem.current=i)}
            onDragEnd={handelSort}  draggable
            >
            <tr className="border-b dark:border-neutral-500">
              <td className="whitespace-nowrap px-6 py-4 font-medium">{i+1}</td>
              <td className="whitespace-nowrap px-6 py-4 font-medium">{sa.min_salary}K</td>
              <td className="whitespace-nowrap px-6 py-4 font-medium">{sa.max_salary}K</td>
              <td className="whitespace-nowrap px-6 py-4 font-medium">{sa.currency}</td>
              <td className="whitespace-nowrap px-6 py-4 text-center">
              <button  className="" onClick={() => handelDeeted(sa._id)} ><AiFillDelete className="text-red-500 "></AiFillDelete></button>

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
        </div>
    );
};

export default AddSalaries;