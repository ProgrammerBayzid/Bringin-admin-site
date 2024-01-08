const RecruterCompanyRegiserSuccessModal = ({ rvisible, rcloseModal }) => {
    if (!rvisible) return null;
    return (
      <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-40 backdrop-blur-[10px]">
        <div className="">
          <div className=" w-full ">
            <div className="bg-white lg:w-[550px]  lg:h-[260px] md:w-[750px] relative md:h-[550px] w-full h-full flex justify-center items-center shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
              <div>
                <div className=" ">
                  <button
                    onClick={() => rcloseModal(false)}
                    className="cursor-pointer text-[25px] absolute right-4 top-2 text-black"
                  >
                    ✕
                  </button>
                  <div className="">
                    <div className="">
                      <div>
                        <div className="mt-[30px]">
                          <h1 className="text-center text-[27px] font-semibold">
                            Congratulations! You’re Company
                          </h1>
                          <h1 className="text-center text-[27px] font-semibold">
                            successfully registered.
                          </h1>
                         
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
  
  export default RecruterCompanyRegiserSuccessModal;
  

  