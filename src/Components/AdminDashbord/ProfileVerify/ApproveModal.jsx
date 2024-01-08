import { Link, useNavigate } from "react-router-dom";

const ApproveModal = ({ rejact, closeModal, modalData }) => {
  //
  console.log(modalData);
  const { _id, email } = modalData;
  const navigate = useNavigate();

  const handleuseNavigateClick = () => {
    navigate(`/verification/profile_register/${_id}`, { state: { modalData } });
  };

  return (
    <div className=" flex justify-center items-center">
      <input
        type="checkbox"
        id="aprove-modal"
        className="modal-toggle hidden"
      />
      <div className="modal fixed bg-black bg-opacity-50 w-full h-full ">
        <div className="bg-[#0077B5] rounded rounded-[10px]">
          <div className="px-8 py-5">
            <h1 className="text-white text-[18px] text-center">
              Are you sure?
            </h1>
            <div className=" flex gap-2 mt-5">
              <button
                onClick={closeModal}
                className=" rounded rounded-[20px] hover:text-[#0077B5] w-[83px] text-[16px] h-[33px] bg-white"
              >
                cancel
              </button>
              {
                modalData.companyname === null || modalData.companyname ==="" ||modalData.companyname.c_location === null ||modalData.companyname.c_location === "" || modalData.companyname.c_size
                === null || modalData.companyname.c_size
                === "" || modalData.companyname.industry
                === null || modalData.companyname.industry
                === "" ||  modalData.companyname.legal_name
                === null || modalData.companyname.legal_name
                === ""?<> 
                <button onClick={handleuseNavigateClick} className=" rounded rounded-[20px] hover:text-[#0077B5]  w-[83px] text-[16px] py-1 bg-white">
                  Register
                </button>
              </>:<>
                
                <button
                onClick={() => rejact(_id, email)}
                className=" rounded rounded-[20px] hover:text-[#0077B5] w-[83px] text-[16px] bg-white"
              >
                Approve
              </button>
                </>
              }
             
            </div>
            <div className="flex justify-center mt-5">
            <button onClick={handleuseNavigateClick} className=" rounded rounded-[20px] hover:text-[#0077B5]  w-[153px] text-[16px] py-1 bg-white">
                  view recruter from
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApproveModal;
