


const JobPostDeleteModal = ({ title, message, remove, closeModal, modalData }) => {
    //
    console.log(modalData);
    const { _id , userid} = modalData;
    const email = userid.email;
    console.log(email);

    return (
      <div className=" flex justify-center items-center">
        <input
          type="checkbox"
          id="job-delete-modal"
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
                  onClick={() => remove(_id , email)}
                  className=" rounded rounded-[20px] hover:text-[#0077B5] w-[83px] text-[18px] bg-white"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default JobPostDeleteModal;
  