import { useEffect, useState } from "react";
import { RingLoader, ScaleLoader } from "react-spinners";
const CompanySizeModal = ({
  setSizeOpen,
  setcompanySizeId,
  setcompanySize,
  companySizeId,
}) => {
  const [companysize, setCompanySize] = useState([]);
  const [loding, setloding] = useState(true);

  useEffect(() => {
    fetch("https://rsapp.unbolt.co/admincompanysize")
      .then((res) => res.json())
      .then((data) => {
        setCompanySize(data);
        console.log(data);
        setloding(false);
      });
  }, []);
  console.log(companysize);

  const handleSizeClick = (size, id) => {
    // Check if the checkbox is already selected
    if (id === companySizeId) {
      // If it's already selected, deselect it and set values to null
      setcompanySize("");
      setcompanySizeId(null);
    } else {
      // If it's not selected, select it and update values
      setcompanySize(size);
      setcompanySizeId(id);
    }
  };

  const handleSizeremove = () => {
    setcompanySize("");
    setcompanySizeId(null);
    setSizeOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-[#E6E6E6] bg-opacity-90 flex justify-center items-center z-40 ">
      <div className="  bg-white  relative lg:w-[700px]  w-[350px] h-[520px] bg-[#FCFCFC] bg-opacity-90   lg:p-0 md:p-0 p-2 rounded rounded-[10px] App">
        <div className="px-3">
          <div className="my-5 relative"> 
          <p  onClick={handleSizeremove}
                className="cursor-pointer right-1 absolute  text-[22px]">✕</p>
            <div className=" ">
              {/* <img
                onClick={handleSizeremove}
                className="cursor-pointer"
                src="/images/tircompany.svg"
              /> */}
                 
              <h1 className="text-[18px] font-semibold text-[#212427] text-opacity-90 text-center ">
                Company Size
              </h1>
           
            </div>

            <h5 className="text-[14px] fonrmal text-[#212427] text-opacity-90  px-5 text-center">
              What is the total employee size in your company?
            </h5>
          </div>
          {loding === true ? (
            <div className="flex justify-center  mt-36">
              <ScaleLoader color="#365dd6" size="50" />
            </div>
          ) : (
            <>
              <div className="px-3  ">
                <div className=" ">
                  {companysize.map((cs) => (
                    <div
                      key={cs._id}
                      className="flex items-center gap-x-3 bg-white mb-2 px-2 w-[300px] h-[50px]"
                    >
                      <div>
                        {" "}
                        <div className="w-[18px] h-[18px] rounded rounded-full border border-[#828282] border-opacity-25 flex items-center justify-center">
                          <div
                            onClick={() => handleSizeClick(cs.size, cs._id)}
                            className={`w-[12px] h-[12px] cursor-pointer ${
                              companySizeId === cs._id
                                ? "rounded rounded-full  bg-blue-500 cursor-pointer"
                                : ""
                            }`}
                          ></div>
                        </div>
                      </div>
                      <p
                        onClick={() => handleSizeClick(cs.size, cs._id)}
                        className="text-[#212427] text-[18px] font-medium my-5 cursor-pointer"
                      >
                        {cs.size}
                        {"  "} Employees
                      </p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setSizeOpen(false)}
                  type="button"
                  className="w-full h-[44px] bg-[#00A0DC] bg-opacity-40 text-[17px] mt-5 font-semibold hover:bg-[#0077B5] hover:text-white rounded text-center "
                >
                  Save
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanySizeModal;
