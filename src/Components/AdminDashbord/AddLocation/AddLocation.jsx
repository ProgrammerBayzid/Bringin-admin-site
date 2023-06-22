import { Button, Modal } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillDelete , AiTwotoneEdit} from "react-icons/ai";


const AddLocation = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [location, setLocation] = useState([]);
    const [refresh, setRefresh] = useState(true);
    const [isLoding, setIsLoding] = useState(false);

    useEffect(() => {

        fetch("https://app.bringin.io/admin/location")
          .then((res) => res.json())
          .then((data) => {
            setIsLoding(true);
            setLocation(data);
            console.log(data);
          });
      }, []);
      console.log(location);

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
      const addLocation = (data, e) => {
        // console.log(data);
        const locationdata = {
          city: data.city,
          division: data.division,
         

    
        };
    
        fetch("https://app.bringin.io/location", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(locationdata),
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
        fetch(`https://app.bringin.io/admin/location/${id}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data) {
                    alert('deleted successfully');
                    const remaining = location?.filter(odr => odr._id !== id);
                    setLocation(remaining);
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
              Add Location
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
                <form onSubmit={handleSubmit(addLocation)}>
                  <div className="form-control w-full ">
                    <label className="label">
                      {" "}
                      <span className="label-text">City Name</span>
                    </label>
                    <input
                      type="text"
                      {...register("city", {
                        required: "  city is Required",
                      })}
                      className="input input-bordered w-full "
                    />
                    {errors.phoneName && (
                      <p className="text-red-500">{errors.city.message}</p>
                    )}
                  </div>
                  <div className="form-control w-full ">
                    <label className="label">
                      {" "}
                      <span className="label-text">Division </span>
                    </label>
                    <input
                      type="text"
                      {...register("division", {
                        required: "  division is Required",
                      })}
                      className="input input-bordered w-full "
                    />
                    {errors.phoneName && (
                      <p className="text-red-500">{errors.division.message}</p>
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
        {location.map((lo, i) => (
          <div
            key={lo._id}
            className="relative flex w-full h-full flex-col rounded-xl bg-stone-200 bg-clip-border text-gray-700 shadow-md"
          >
        <div>
          <div className="flex justify-between mx-5 mt-2">
          <p className="mt-2"> NO. {i+1}</p>
          <button className="text-red" onClick={() => handelDeeted(lo._id)} ><AiFillDelete ></AiFillDelete></button>

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
                          City Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 border-[1px] border-[#6A6A6A] text-[#454545]   lg:text-[13px] md:text-[13px]"
                        >
                          City ID
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <th
                        scope="col"
                        className="px-6 py-3 border-[1px] border-[#6A6A6A] text-[#454545]   lg:text-[13px] md:text-[13px]"
                      >
                        {lo.name}
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 border-[1px] border-[#6A6A6A] text-[#454545]   lg:text-[13px] md:text-[13px]"
                      >
                        {lo._id}
                      </th>
                    </tbody>
                  </table>
                </div>
              </div>
              <hr></hr>
              <div>
                <div>
                  <h1 className="text-center text-[13px] font-bold my-2">Industry Categoris</h1>
                  <hr className="mx-10"></hr>
                </div>
                <table>
                  <thead className="border text-[13px] ">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 border-[1px] border-[#6A6A6A] text-[#454545]   lg:text-[13px] md:text-[13px]"
                      >
                        Division Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 border-[1px] border-[#6A6A6A] text-[#454545]   lg:text-[13px] md:text-[13px]"
                      >
                        Division ID
                      </th>
                    </tr>
                  </thead>

                  {lo.divisionid.map((di) => (
                    <tbody key={di._id}>
                      <th
                        scope="col"
                        className="px-6 py-3 border-[1px] border-[#6A6A6A] text-[#454545]   lg:text-[13px] md:text-[13px]"
                      >
                        {di.divisionname}
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 border-[1px] border-[#6A6A6A] text-[#454545]   lg:text-[13px] md:text-[13px]"
                      >
                        {di._id}
                      </th>
                    </tbody>
                  ))}
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

export default AddLocation;