const RecruterRejectModal = ({
  title,
  message,
  add,
  closeModal,
  modalData,
  profileVerify,
  setProfileVerify,
}) => {
  //
  const handelDeeted = (id) => {
    
    fetch(`https://rsapp.bringin.io/rejectRecruterProfiledelete/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data) {
          const remaining = profileVerify?.filter((odr) => odr._id !== id);
          setProfileVerify(remaining);
        }
      });
  
};

  return (
    <div>
      <div>
        <input type="checkbox" id="reject-modal" className="modal-toggle" />
        <div className="modal h-[130px] ml-[1270px] w-[240px] mt-[260px] rounded rounded-[20px]">
          <div className="bg-[#0077B5]">
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
                  onClick={() => handelDeeted(modalData._id)}
                  className=" rounded rounded-[20px] hover:text-[#0077B5] w-[83px] text-[18px] bg-white"
                >
                  Reject
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
