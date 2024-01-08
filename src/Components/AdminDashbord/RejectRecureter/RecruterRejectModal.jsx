import { Image } from "antd";
import { toast } from "react-hot-toast";

const RecruterRejectModal = ({
  title,
  message,
  add,
  closeModal,
  modalData,
  profileVerify,
  setProfileVerify,
  recall
}) => {
  //
  console.log(modalData);
  

  const handelDeeted = (recruiterId) => {
    const storedToken = localStorage.getItem("admin_token");
    const token = storedToken ? storedToken.replace(/"/g, "") : null;

    if (token === null) {
      console.log("token not found");
    } else {


      fetch(`https://rsapp.unbolt.co/recruiter_deletes/${recruiterId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            recall()
            closeModal()
            toast.success("Deleted successfully");
          }
        });
      console.log(recruiterId);
    }
  };

  return (
    <div>
      <div className=" flex justify-center items-center">
        <input type="checkbox" id="reject-modal" className="modal-toggle" />
        <div className="modal   w-full h-full ">
          <div className="bg-white rounded rounded-[10px] w-[450px] h-[406px]">
            <div className="p-8">
              <div className="flex justify-center">
                <Image
                width={85}
                height={85}
                className="rounded rounded-full "
                src={`https://rsapp.unbolt.co/${modalData.image}`}
                />.
              </div>
              <div className="flex justify-center mt-5">

              <div className="flex gap-2 ">
                      <div>
                        <p className="text-[14px] font-medium text-[#383A3D]">
                        Recruiter Name
                        </p>

                        <p className="text-[14px] font-medium text-[#383A3D]  my-2">
                          Mobile Number
                        </p>
                        <p className="text-[14px] font-medium text-[#383A3D]">
                          Email
                        </p>
                        <p className="text-[14px] font-medium text-[#383A3D]  my-2">
                          Location
                        </p>
                      </div>
                      <div>
                        <p className="text-[14px] font-medium text-[#383A3D]">
                          :
                        </p>
                        <p className="text-[14px] font-medium text-[#383A3D] my-2">
                          :
                        </p>
                        <p className="text-[14px] font-medium text-[#383A3D]">
                          :
                        </p>
                        <p className="text-[14px] font-medium text-[#383A3D]  my-2">
                          :
                        </p>
                      </div>
                      <div>
                        <p className="text-[14px] font-medium text-[#383A3D]">
                        {modalData.firstname} {modalData.lastname}
                        </p>

                        <p className="text-[14px] font-medium text-[#383A3D]  my-2">
                           {modalData?.number}
                        </p>
                        <p className="text-[14px] font-medium text-[#383A3D]">
                          {modalData?.email}
                        </p>
                        <p className="text-[14px] font-medium text-[#383A3D]  my-2">
                        <p className="tooltip-trigger relative group text-[13px]   pl-2 py-1">
                            {modalData?.companyname?.c_location?.locationoptional
                              ? modalData?.companyname?.c_location?.locationoptional.slice(
                                  0,
                                  10
                                )
                              : ""}
                            <p className="tooltip absolute bg-[#0077B5] text-white p-2 rounded-md -mt-2 invisible group-hover:opacity-100 group-hover:visible transition -left-56 top-1/2 transform translate-y-[5%] z-40">
                              {modalData?.companyname?.c_location?.formet_address}
                              <p>
                              {modalData?.companyname?.c_location?.divisiondata?.divisionname &&
                              modalData?.companyname?.c_location?.divisiondata?.divisionname
                                ? modalData.companyname.c_location.divisiondata?.divisionname +
                                  ", " +
                                  modalData.companyname.c_location.divisiondata?.cityid?.name
                                : modalData?.companyname?.c_location?.divisiondata?.cityid?.name ||
                                  modalData?.companyname?.c_location?.divisiondata?.cityid?.name ||
                                  ""}
                            </p>

                             
                            </p>
                          </p>
                        </p>
                      </div>
                    </div>
              </div>
              <h1 className="text-white text-[18px] text-center">
                Are you sure?
              </h1>
              <div className=" gap-2 mt-5">
                <button onClick={() => handelDeeted(modalData?._id)} className="bg-red-500 w-full py-2 text-[14px] text-white rounded">
                Delete Permanently
                </button>
                <button onClick={closeModal} className="bg-[#D9D9D9] w-full py-2 text-[14px] text-black rounded mt-2 font-medium">
                cancel
                </button>
              
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruterRejectModal;
