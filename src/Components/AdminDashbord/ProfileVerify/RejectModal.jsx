const RejectModal = ({ title, message, rejact, closeModal, modalData }) => {
  //
console.log(modalData);
const {_id}=modalData
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
                 onClick={() => rejact(_id)}
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

export default RejectModal;
