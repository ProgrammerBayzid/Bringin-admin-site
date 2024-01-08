



const HiddenModal = ({ title, message, rejact, closeModal, modalData }) => {
    //
    console.log(modalData);
    const { _id } = modalData;
    return (
      <div className=" flex justify-center items-center">
        <input
          type="checkbox"
          id="job-reject-modal"
          className="modal-toggle hidden"
        />
        <div className="modal fixed bg-black bg-opacity-50 w-full h-full ">
          <div className="bg-[#0077B5] rounded rounded-[10px]">
            <div className="p-8">
              <h1 className="text-white text-[18px] text-center">
                Are you sure?
              </h1>
              <div className=" flex gap-2 mt-5">
                <button
                  onClick={closeModal}
                  className=" rounded rounded-[20px] hover:text-[#0077B5] w-[83px] text-[18px] h-[33px] bg-white"
                >
                  cancel
                </button>
                <button
                  onClick={() => rejact(_id)}
                  className=" rounded rounded-[20px] hover:text-[#0077B5] w-[83px] text-[18px] bg-white"
                >
                  Hidden
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default HiddenModal;
  