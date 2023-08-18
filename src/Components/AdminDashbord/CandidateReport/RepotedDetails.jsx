import { Image } from "antd";
import { useEffect, useState } from "react";

const RepotedDetails = ({ closeModal, modalData }) => {
  console.log(modalData);
  const { userid, report, image, candidateid, description, candidatefulldetailsid } = modalData;
  const {
    number,
    fastname,
    lastname,
    gender,
    experiencedlevel,
    startedworking,
    deatofbirth,
    email,
  } = candidateid;

  let newStr = report;
  let re = newStr.slice(1, -1);
  console.log(re);

  let inputString = report;
  let outputString = inputString.slice(1, -1); // Slice the string to remove the first and last characters
  console.log(outputString);

  const text = `https://bringin.io/candidatedetails/${candidatefulldetailsid}`;

  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();

    try {
      document.execCommand("copy");
      setIsCopied(true);
    } catch (err) {
      console.error("Failed to copy Profile Link:", err);
    }

    document.body.removeChild(textArea);
  };

  const [profile, setProfile] = useState([]);

  useEffect(() => {
    fetch(`https://rsapp.bringin.io/verifyRecruterProfile?_id=${userid}`)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        console.log(data);
      });
  }, []);
  console.log(profile);

  return (
    <div>
      <div>
        <div>
          <input
            type="checkbox"
            id="candidatereport-details-modal"
            className="modal-toggle"
          />
          <div className="modal w-full ">
            <div className="bg-white rounded-lg relative  lg:w-[600px]  lg:h-[600px] md:w-[550px] p-4 md:h-[550px] w-full h-full">
              <label
                htmlFor="candidatereport-details-modal"
                onClick={closeModal}
                className="cursor-pointer text-[25px] absolute right-4 top-2 text-black"
              >
                ✕
              </label>

              <div className="">
                <div>
                  <div className="w-[600px]  h-[287px] ">
                   
                    <div>
                      <p className="bg-[#EFF1F2]  text-center pt-[6px] text-[16px] font-medium w-[300px] h-[38px] border rounded text-[#D10000]">
                        {outputString}
                      </p>
                    </div>

                    <div>
                      <div className="w-[493px] h-[111px] bg-[#F7F7F7] mt-4">
                        <p className="p-2">{description}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-[133px] h-[98px] bg-[#F7F7F7] mt-4">
                        <Image
                          width={130}
                          height={95}
                          src={`https://rsapp.bringin.io/${image}`}
                        />
                      </div>
                      <div className="w-[133px] h-[98px] bg-[#F7F7F7] mt-4">
                        <Image
                          width={130}
                          height={95}
                          src={`https://rsapp.bringin.io/${image}`}
                        />
                      </div>
                      <div className="w-[133px] h-[98px] bg-[#F7F7F7] mt-4">
                        <Image
                          width={130}
                          height={95}
                          src={`https://rsapp.bringin.io/${image}`}
                        />
                      </div>
                    </div>
                    <div className="flex gap-4 items-center">
                      <div className="w-[98px] h-[28px] bg-[#0077B5] rounded my-4">
                        <p className="text-white font-medium text-[15px] text-center mt-[3px] ">
                          Report By
                        </p>
                      </div>

                      <button onClick={handleCopyClick} className="bg-[#0077B5] px-[8px] h-[28px] text-[15px] font-medium rounded rounded text-white">
                        {isCopied ? "Copied!" : "Profile Link"}
                      </button>
                    </div>
                    <div className="flex gap-2 w-full">
                      <div>
                        <p className="text-[16px] font-medium text-[#383A3D]">
                          Recruiter Name
                        </p>

                        <p className="text-[16px] font-medium text-[#383A3D]  my-2">
                          Company Name
                        </p>
                        <p className="text-[16px] font-medium text-[#383A3D]">
                          Designation
                        </p>
                        <p className="text-[16px] font-medium text-[#383A3D]  my-2">
                          Mobile Number
                        </p>
                        <p className="text-[16px] font-medium text-[#383A3D]  ">
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
                        <p className="text-[16px] font-medium text-[#383A3D]  ">
                          :
                        </p>
                        <p className="text-[16px] font-medium text-[#383A3D]  my-2">
                          :
                        </p>
                      </div>
                      <div>
                        <p className="text-[16px] font-medium text-[#383A3D]">
                          {profile?.firstname} {profile?.lastname}
                        </p>

                        <p className="text-[16px] font-medium text-[#383A3D]  my-2">
                          {profile?.companyname?.legal_name}
                        </p>
                        <p className="text-[16px] font-medium text-[#383A3D]">
                          {profile?.designation}
                        </p>
                        <p className="text-[16px] font-medium text-[#383A3D]  my-2">
                          +880 {profile?.number}
                        </p>
                        <p className="text-[16px] font-medium text-[#383A3D]  ">
                          {profile?.email}{" "}
                        </p>
                        <p className="text-[16px] font-medium text-[#383A3D]  my-2">
                          {profile?.companyname?.c_location?.formet_address}
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

export default RepotedDetails;
