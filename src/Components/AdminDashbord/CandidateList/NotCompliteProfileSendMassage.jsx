import { Image } from "antd";

const NotCompliteProfileSendMassage = ({ closeModal, modalData, recall }) => {
  const channelId = modalData._id; // Initialize with appropriate default value
  const userId = modalData?.seekerid?._id; // Initialize with appropriate default value
  console.log("channelId", channelId);
  console.log("userId", userId);
  const handleSendMessage = async () => {
    try {
      const storedToken = localStorage.getItem("admin_token");
      const token = storedToken ? storedToken.replace(/"/g, "") : null;
      if (token === null) {
        console.log("token not found");
        return;
      } else {
        const response = await fetch(
          "http://localhost:3002/seeker_profile_not_complete_sendMessage",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ channelid: channelId, userId: userId }),
          }
        );

        if (response.ok) {
          const result = await response.json();
          console.log("Message sent successfully:", result);
          closeModal();
        } else {
          console.error("Failed to send message");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className=" flex justify-center items-center">
        <input
          type="checkbox"
          id="sendMassage-candidate-modal"
          className="modal-toggle"
        />
        <div className="modal fixed bg-black bg-opacity-50 w-full h-full ">
          <div className="bg-white rounded rounded-[10px] w-[450px] h-[406px]">
            <div className="p-8">
              <div className="flex justify-center">
                <Image
                  width={85}
                  height={85}
                  className="rounded rounded-full "
                  src={`https://rsapp.unbolt.co/${modalData?.seekerid?.image}`}
                />
                .
              </div>
              <div className="flex justify-center mt-5">
                <div className="flex gap-2 ">
                  <div>
                    <p className="text-[14px] font-medium text-[#383A3D]">
                      Candidate Name
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
                    <p className="text-[14px] font-medium text-[#383A3D]">:</p>
                    <p className="text-[14px] font-medium text-[#383A3D] my-2">
                      :
                    </p>
                    <p className="text-[14px] font-medium text-[#383A3D]">:</p>
                    <p className="text-[14px] font-medium text-[#383A3D]  my-2">
                      :
                    </p>
                  </div>
                  <div>
                    <a
                      href={`https://unbolt.co/candidate-profile/${modalData?._id}`}
                      target="_blank"
                      className=""
                    >
                      <p className="text-[14px] font-medium text-blue-500">
                        {modalData?.seekerid?.firstname}{" "}
                        {modalData?.seekerid?.lastname}
                      </p>
                    </a>

                    <p className="text-[14px] font-medium text-[#383A3D]  my-2">
                      {modalData?.seekerid?.number}
                    </p>
                    <p className="text-[14px] font-medium text-[#383A3D]">
                      {modalData?.seekerid?.email}
                    </p>
                  </div>
                </div>
              </div>
              <h1 className="text-white text-[18px] text-center">
                Are you sure?
              </h1>
              <div className=" gap-2 mt-5">
                <button
                  onClick={handleSendMessage}
                  className="bg-blue-500 w-full py-2 text-[14px] text-white rounded"
                >
                  Send Massage
                </button>
                <button
                  onClick={closeModal}
                  className="bg-[#D9D9D9] w-full py-2 text-[14px] text-black rounded mt-2 font-medium"
                >
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

export default NotCompliteProfileSendMassage;
