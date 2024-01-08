import axios from "axios";

const NotCompliteCandidateSendMassageInOneTime = ({
  setShowSendAllMessageModal,
}) => {
  const handleSendMessageAllSeeker = async () => {
    try {
      const storedToken = localStorage.getItem("admin_token");
      const token = storedToken ? storedToken.replace(/"/g, "") : null;
      if (token === null) {
        console.log("token not found");
        return;
      } else {
        const response = await axios.get(
          "http://localhost:3002/profile_not_complete_seeker_send_massage_all_seeker_one_time"
        );
        if (response.ok) {
          const result = await response.json();
          console.log("All Message sent successfully:", result);
          setShowSendAllMessageModal(false);
        } else {
          console.error("Failed to send All message");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#090808] bg-opacity-70 flex justify-center items-center z-50 App">
      <div className=" ">
        <div className="  w-full h-full ">
          <div className="bg-white rounded rounded-[10px] w-[450px] h-[226px]">
            <div className="p-8">
              <h1 className="text-white text-[18px] text-center">
                Are you sure?
              </h1>
              <div className=" gap-2 mt-5">
                <button
                  onClick={handleSendMessageAllSeeker}
                  className="bg-blue-500 w-full py-2 text-[14px] text-white rounded"
                >
                  Send Massage All Candidates
                </button>
                <button
                  onClick={() => setShowSendAllMessageModal(false)}
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

export default NotCompliteCandidateSendMassageInOneTime;
