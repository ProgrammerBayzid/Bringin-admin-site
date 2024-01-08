import { Image } from "antd";

const HelpfeedbackDetails = ({ closeModal, modalData }) => {
  console.log(modalData);
  const { userid, text, image } = modalData;

  return (
    <div>
      <div>
        <div>
          <div>
            <input
              type="checkbox"
              id="helpfeedback-details-modal"
              className="modal-toggle"
            />
            <div className="modal w-full ">
              <div className="bg-white rounded-lg relative  lg:w-[600px]  lg:h-[600px] md:w-[550px] p-4 md:h-[550px] w-full h-full">
                <label
                  htmlFor="helpfeedback-details-modal"
                  onClick={closeModal}
                  className="cursor-pointer text-[25px] absolute right-4 top-2 text-black"
                >
                  ✕
                </label>

                <div className="">
                  <div>
                    <div className="w-[600px]  h-[287px] ">
                      <div className="p-">
                        <p></p>
                        <div className="w-[493px] h-[111px] bg-[#F7F7F7] mt-4">
                          <p className="p-2">{text}</p>
                        </div>
                      </div>

                        <p className="text-[13px] font-medium text-white bg-[#0077B5] p-1 w-[80px]">
                           Attachment
                        </p>
                      <div className="border-dashed border-2 border-[#0077B5] w-[460px] h-[200px] mt-2">
                        <div>
                          {image === null ? (
                            <p></p>
                          ) : (
                            <div>
                              <Image
                                width={460}
                                height={200}
                                src={`https://rsapp.unbolt.co/${image}`}
                              />

                              <div>
                                <a
                                  href={`https://rsapp.unbolt.co/${image}`}
                                  download={`downloaded_image.png`}
                                  target="_blank"
                                >
                                  <button
                                    type="button"
                                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br  focus:outline-none text-[10px]  font-medium rounded-lg  px-2 py-1 text-center mr-2 mb-2 mt-3"
                                  >
                                    Download image
                                  </button>
                                </a>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpfeedbackDetails;
