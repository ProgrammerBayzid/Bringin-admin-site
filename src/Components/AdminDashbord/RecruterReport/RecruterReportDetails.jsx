import { Image } from "antd";
import { useEffect, useState } from "react";

const RecruterReportDetails = ({ closeModal, modalData }) => {
  console.log(modalData);
  const { description, image, jobid, report, userid } = modalData;
  console.log(modalData);

  // Remove square brackets from each element
  const repot = report.map((item) => item.replace(/\[|\]/g, ""));

  const [profile, setProfile] = useState([]);

  useEffect(() => {
    fetch(`https://rsapp.unbolt.co/jobreportbyseeker?userid=${userid}`)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        console.log(data);
      });
  }, []);
  console.log(profile);

  // const text = `https://unbolt.co/jobdetails/${jobid._id}`;

  // const [isCopied, setIsCopied] = useState(false);

  // const handleCopyClick = () => {
  //   const textArea = document.createElement("textarea");
  //   textArea.value = text;
  //   document.body.appendChild(textArea);
  //   textArea.select();

  //   try {
  //     document.execCommand("copy");
  //     setIsCopied(true);
  //   } catch (err) {
  //     console.error("Failed to copy Profile Link:", err);
  //   }

  //   document.body.removeChild(textArea);
  // };

  // const {careerPreference }= profile

  // const first =careerPreference;
  // // console.log(first[0]);

  return (
    <div>
      <div>
        <div>
          <input
            type="checkbox"
            id="recruterreport-details-modal"
            className="modal-toggle"
          />
          <div className="modal w-full ">
            <div className="bg-white rounded-lg relative   p-4 lg:w-[550px]  lg:h-[549px] md:w-[549spx] md:h-[550px] w-full h-full">
              <label
                htmlFor="candidatereport-details-modal"
                onClick={closeModal}
                className="cursor-pointer text-[25px] absolute right-4 top-2 text-black"
              >
                ✕
              </label>
              <div className="">
                <div>
                  <div className="w-[550px]  h-[297px]  ">
                    <p className="text-[22px] font-semibold text-center mt-3">Report Details</p>
                   <div className="flex justify-between">
                   <div className="flex gap-x-[1] items-center">
                      <p className="w-4 h-4 rounded rounded-full border ">

                      </p>
                      <button className="  text-start  px-2 text-[15px] font-medium  h-[38px]  rounded text-text">
                        {repot}
                      </button>
                    </div>
                    <a href={`https://unbolt.co/job-details/${jobid._id}`} target="_blank" >

                    <p className="pr-10 font-medium">Job Link</p>
                    </a>
                   </div>

                    <div>
                      <div className="w-[510px] h-[111px] bg-[#F7F7F7] mt-2 rounded rounded-[8px] border">
                        <p className="p-2 pl-4 text-[15px] text-[#212427] text-opacity-40 font-normal ">{description}</p>
                      </div>
                    </div>
                    <div>
                      <div className="w-[133px] h-[98px] bg-[#F7F7F7] mt-3 rounded rounded-[5px] border">
                        {
                          image === ""? "" : 
                        <Image
                          width={133}
                          height={98}
                          className="rounded border "
                          src={`https://rsapp.unbolt.co/${image}`}
                        />
                        }
                        
                      </div>
                    </div>
                    <div className="flex gap-x-3 items-center">
                    <div className="w-[138px] h-[28px] bg-[#0077B5] rounded my-4 ">
                      <p className="text-white font-medium text-[15px] text-center mt-[3px] ">
                      Reporter Details
                      </p>
                    </div>
                  
                    </div>
                    <div className="flex gap-2 ">
                      <div>
                        <p className="text-[15px] font-medium text-[#383A3D]">
                          Candidate Name
                        </p>

                        <p className="text-[15px] font-medium text-[#383A3D]  my-2">
                          Mobile Number
                        </p>
                        <p className="text-[15px] font-medium text-[#383A3D]">
                          Email
                        </p>
                        <p className="text-[15px] font-medium text-[#383A3D]  my-2">
                          Location
                        </p>
                      </div>
                      <div>
                        <p className="text-[15px] font-medium text-[#383A3D]">
                          :
                        </p>
                        <p className="text-[15px] font-medium text-[#383A3D] my-2">
                          :
                        </p>
                        <p className="text-[15px] font-medium text-[#383A3D]">
                          :
                        </p>
                        <p className="text-[15px] font-medium text-[#383A3D]  my-2">
                          :
                        </p>
                      </div>
                      <div>
                      <a
                              href={`https://unbolt.co/candidate-profile/${profile?._id}`}
                              target="_blank"
                              className=""
                            >

                        <p className="text-[15px] font-medium text-blue-500">
                          {profile?.userid?.fastname}{" "}
                          {profile?.userid?.lastname}
                        </p>
                            </a>

                        <p className="text-[15px] font-medium text-[#383A3D]  my-2">
                           {profile?.userid?.number}
                        </p>
                        <p className="text-[15px] font-medium text-[#383A3D]">
                          {profile?.userid?.email}
                        </p>
                        <p className="text-[15px] font-medium text-[#383A3D]  my-2">
                          {/* {profile?.careerPreference[0]?.division?.cityid?.name} */}
                        </p>
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

export default RecruterReportDetails;
