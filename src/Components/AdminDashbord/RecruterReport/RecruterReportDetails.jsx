import { Image } from "antd";
import { useEffect, useState } from "react";

const RecruterReportDetails = ({ closeModal, modalData }) => {
  console.log(modalData);
  const { description, image, jobid, report, userid } = modalData;
  var newStr = report;
  const re = newStr.slice(1, -1)
  console.log(re);


  const [profile, setProfile] = useState([]);

  useEffect(() => {
    fetch(`https://rsapp.bringin.io/jobreportbyseeker?userid=${userid}`)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        console.log(data);
      });
  }, []);
  console.log(profile);
  let inputString = '[Harassment, Fake Recruiter, Fake Job]';
let outputString = inputString.slice(1, -1);  // Slice the string to remove the first and last characters
console.log(outputString);

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
                  <div className="w-[550px]  h-[287px] ">
                    <div>
                      <button className="bg-[#EFF1F2]  text-start  px-2 text-[16px] font-medium  h-[38px] border rounded text-[#D10000]">
                        {re}
                      </button>
                    </div>

                    <div>
                      <div className="w-[493px] h-[111px] bg-[#F7F7F7] mt-4">
                       <p className="p-2">
                       {description}
                       </p>
                      </div>
                    </div>
                    <div>
                      <div className="w-[133px] h-[98px] bg-[#F7F7F7] mt-4">
                        <Image
                          width={130}
                          height={95}
                          src={`https://rsapp.bringin.io/${image}`}
                        />
                      </div>
                    </div>
<div className="w-[98px] h-[28px] bg-[#0077B5] rounded my-4">
<p className="text-white font-medium text-[16px] text-center mt-[10px] ">Report By</p>
</div>
                    <div className="flex gap-2 ">
                      <div>
                        <p className="text-[16px] font-medium text-[#383A3D]">
                        Candidate Name
                        </p>

                        <p className="text-[16px] font-medium text-[#383A3D]  my-2">
                        Mobile Number
                        </p>
                        <p className="text-[16px] font-medium text-[#383A3D]">
                        Email
                        </p>
                        <p className="text-[16px] font-medium text-[#383A3D]  my-2">
                        Location
                        </p>
                      </div>
                      <div>
                        <p className="text-[16px] font-medium text-[#383A3D]">
                          :
                        </p>
                        <p className="text-[16px] font-medium text-[#383A3D] my-2">
                          :
                        </p>
                        <p className="text-[16px] font-medium text-[#383A3D]">
                          :
                        </p>
                        <p className="text-[16px] font-medium text-[#383A3D]  my-2">
                          :
                        </p>
                      </div>
                      <div>
                        <p className="text-[16px] font-medium text-[#383A3D]">
                        {profile?.userid?.fastname} {profile?.userid?.lastname}
                        </p>

                        <p className="text-[16px] font-medium text-[#383A3D]  my-2">
                          +880 {profile?.userid?.number}
                        </p>
                        <p className="text-[16px] font-medium text-[#383A3D]">
                        {profile?.userid?.email}
                        </p>
                        <p className="text-[16px] font-medium text-[#383A3D]  my-2">

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
