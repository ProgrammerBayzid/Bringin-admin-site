import { useState } from "react";
import { Button, Modal } from "antd";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { AiFillDelete , AiTwotoneEdit} from "react-icons/ai";
import Spinner from "../../Spinner/Spinner";
import { useRef } from "react";

const JobTitle = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [jobtitle, setJobTitle] = useState([]);
  const [isLoding, setIsLoding] = useState(false);

  useEffect(() => {

    fetch("http://rsapp.bringin.io/jobtitle")
      .then((res) => res.json())
      .then((data) => {
        setIsLoding(true);
        setJobTitle(data);
        console.log(data);
      });
  }, [refresh]);
  console.log(jobtitle);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addJobTitle = (data, e) => {
    // console.log(data);
    const jobtitledata = {
      name: data.name,
      published_date: new Date().toLocaleString(),
    };

    fetch("http://rsapp.bringin.io/jobtitle", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(jobtitledata),
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
        fetch(`http://rsapp.bringin.io/jobtitle/${id}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data) {
                    alert('deleted successfully');
                    const remaining = jobtitle?.filter(odr => odr._id !== id);
                    setJobTitle(remaining);
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
  let _jobtitle =[...jobtitle]
     //remove and save the dragged item content
     const draggedItemContent = _jobtitle.splice(dragItem.current, 1)[0];
     //switch the position
     _jobtitle.splice(dragOverItem.current, 0, draggedItemContent);

    //reset the position ref
    dragItem.current = null;
    dragOverItem.current = null;

    //update the actual array
    setJobTitle(_jobtitle)
}

  // if (isLoding === false) {
  //   return <div className="">
  //     <Spinner></Spinner>
  //   </div>;
  // }
  return (
    <div className="w-full">
      <div>
        <div>
          <div>
            <Button className="bg-[#0077B5] btn" onClick={showModal}>
              Add Job Title
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
                <form onSubmit={handleSubmit(addJobTitle)}>
                  <div className="form-control w-full ">
                    <label className="label">
                      {" "}
                      <span className="label-text">Job Title</span>
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
        <table className="min-w-full text-left w-[1000px] text-sm font-light">
          <thead className="border-b bg-gray-100 text-[18px] font-medium dark:border-neutral-500 ">
            <tr>
              <th scope="col" className="px-6 py-4">No</th>
              <th scope="col" className="px-6 py-4">Job Title</th>
              <th scope="col" className="px-6 py-4">Job Title ID</th>
              <th scope="col" className="px-6 py-4 text-center">Action</th>
             
            </tr>
          </thead>
          {
       jobtitle.map((jt , i)=>
            <tbody className="text-[15px] bg-gray-50" key={jt._id}     onDragStart={(e) => (dragItem.current=i)}
            onDragEnter={(e) => (dragOverItem.current=i)}
            onDragEnd={handelSort}  draggable>
            <tr className="border-b dark:border-neutral-500">
              <td className="whitespace-nowrap px-6 py-4 font-medium">{i+1}</td>
              <td className="whitespace-nowrap px-6 py-4 font-medium">{jt.name}</td>
              <td className="whitespace-nowrap px-6 py-4 font-medium">{jt._id}</td>
              <td className="whitespace-nowrap px-6 py-4 text-center">
              <button  onClick={() => handelDeeted(jt._id)} ><AiFillDelete className="text-red-500"></AiFillDelete></button>

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

export default JobTitle;
