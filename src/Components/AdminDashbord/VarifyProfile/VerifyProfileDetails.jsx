import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Spinner from "../../Spinner/Spinner";
import { GoVerified } from "react-icons/go";
import { Image } from "antd";
const ProfileVerifyDetails = () => {
  const profileVarify = useLoaderData();
  console.log(profileVarify);
  const {
  _id
  } = profileVarify;

  console.log(profileVarify);

  const [isLoding, setIsLoding] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [profileVerifydocument, setProfileVerifydocument] = useState([]);

  useEffect(() => {
    fetch(`https://rsapp.unbolt.co/verifyProfiledocument?userid=${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setIsLoding(true);
        setProfileVerifydocument(data);
        console.log(data);
      });
  }, [refresh]);
  console.log(profileVerifydocument);

 const {
    userid,
    destination,
    createdAt,
    fieldname,
    filename,
    mimetype,
    originalname,
    path,
    size,
  } = profileVerifydocument;


  const [companyverify, setCompany_verify] = useState([]);

  useEffect(() => {
    fetch(`https://rsapp.unbolt.co/company_varify?userid=${_id}`)
      .then((res) => res.json())
      .then((data) => {
        //   setIsLoding(true);
        setCompany_verify(data);
        console.log(data);
      });
  }, [refresh]);

  console.log(companyverify);

  // const [companybyprofile, setcompanybyprofile] = useState([]);

  // useEffect(() => {
  //   fetch(`https://rsapp.unbolt.co/verifyRecruterCompny?_id=${_id}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       //   setIsLoding(true);
  //       setcompanybyprofile(data);
  //       //   console.log(data);
  //     });
  // }, [refresh]);

  // console.log(companybyprofile);

  const makeVerifide = (_id) => {
    try {
      fetch(`https://rsapp.unbolt.co/verifyRecruterProfile/${_id}`, {
        method: "PATCH",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            alert("Make Verifiy Successful.");
            setRefresh(!refresh);
          }
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.error(error);
    }
  };

  const handelMakeVerifide = (_id) => {
    fetch(`https://rsapp.unbolt.co/verifyRecruterCompny/${_id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          alert("Make Verifiy Successful.");
          setRefresh(!refresh);
          console.log(data._id);
        }
      });
  };
  if (isLoding === false) {
    return (
      <div className="">
        <Spinner></Spinner>
      </div>
    );
  }

  return (
   
    <div className="">
      <div>
        <div className="flex gap-10">
          <div>
            <div className="w-[550px]  h-[187px] border border-[#A19C9C] border-[1px] rounded">
              <div className="flex px-5 py-3 justify-around">
                <div>
                  <h1 className="text-[16px] font-semibold text-[#4D5052]">
                    Recruiter Information
                  </h1>
                  <div className="flex gap-5 mt-3">
                    <div>
                      <p className="text-[16px] font-medium text-[#383A3D]">
                        Recruiter Name
                      </p>
                      <p className="text-[16px] font-medium text-[#383A3D] my-2">
                        Designation
                      </p>
                      <p className="text-[16px] font-medium text-[#383A3D]">
                        Phone Number
                      </p>
                      <p className="text-[16px] font-medium text-[#383A3D] my-2">
                        Email
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
                      <p className="text-[16px] font-medium text-[#383A3D] my-2">
                        :
                      </p>
                    </div>
                    <div>
                      <p className="text-[16px] font-medium text-[#383A3D]">
                        {profileVarify?.firstname} {profileVarify?.lastname}
                      </p>
                      <p className="text-[16px] font-medium text-[#383A3D] my-2">
                        {" "}
                        {profileVarify?.designation}
                      </p>
                      <p className="text-[16px] font-medium text-[#383A3D]">
                        {profileVarify?.number}
                      </p>
                      <p className="text-[16px] font-medium text-[#383A3D] my-2">
                        {profileVarify?.email}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <img
                      className="rounded rounded-full w-[92px] h-[92px] ml-1 mt-2 mb-5"
                      src={`https://rsapp.unbolt.co/${profileVarify?.image}`}
                    />
                    <div>
                      {profileVarify?.other?.profile_verify == false ? (
                        <button
                          onClick={() => makeVerifide(profileVarify?._id)}
                          className="text-[16px] font-medium w-[100px] h-[42px] border rounded rounded-full"
                        >
                          Approve
                        </button>
                      ) : (
                        <p className="items-center flex gap-2  text-[16px] font-medium w-[100px] h-[42px] border rounded rounded-full">
                          <span className="text-blue-500 ml-2">
                            <GoVerified></GoVerified>
                          </span>{" "}
                          Verified
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[550px]  h-[187px] border border-[#A19C9C] border-[1px] my-4 rounded">
              <div className="flex px-5 py-3">
                <div>
                  <h1 className="text-[16px] font-semibold text-[#4D5052]">
                    Company Information
                  </h1>
                  <div className="flex gap-5 mt-3">
                    <div>
                      <p className="text-[16px] font-medium text-[#383A3D]">
                        Company Name
                      </p>
                      <p className="text-[16px] font-medium text-[#383A3D] my-2">
                        Employee Size{" "}
                      </p>
                      <p className="text-[16px] font-medium text-[#383A3D]">
                        Location{" "}
                      </p>
                      <p className="text-[16px] font-medium text-[#383A3D] my-2">
                        Website
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
                      <p className="text-[16px] font-medium text-[#383A3D] my-2">
                        :
                      </p>
                    </div>
                    <div>
                      <p className="text-[16px] font-medium text-[#383A3D]">
                        {profileVarify?.companyname?.legal_name}
                      </p>
                      <p className="text-[16px] font-medium text-[#383A3D] my-2">
                        {profileVarify?.companyname?.c_size?.size}
                      </p>
                      <p className="text-[16px] font-medium text-[#383A3D]">
                        {profileVarify?.companyname?.c_location?.formet_address}{" "}
                      </p>
                      <p className="text-[16px] font-medium text-[#383A3D] my-2">
                        {profileVarify?.companyname?.c_website}
                      </p>
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
            </div>
          </div>
          <div className="w-[457px]  h-[391px] border border-[#A19C9C] border-[1px]  rounded">
            <div className="px-5 py-3">
              <p className="text-[16px] font-semibold text-[#4D5052]">
                Submitted Documents{" "}
              </p>
              <p className="text-[16px] font-semibold text-[#0077B5] mt-2">
                Company Verification{" "}
              </p>

              <div className="border-dashed border-2 border-indigo-600  w-[384px] h-[140px] mt-4 rounded">
                <div className="flex gap-2">
                  <Image
                    width={200}
                    height={135}
                    src={`https://rsapp.unbolt.co/${path}`}
                  />
                  <Image
                    width={200}
                    height={135}
                    src={`https://rsapp.unbolt.co/${companyverify?.path}`}
                  />
                  {/* <embed src='https://rsapp.unbolt.co/resumes/my-resume.pdf' type="application/pdf" width="50%" height="110px" /> */}
                </div>
              </div>

              <div>
                <p className="text-[16px] font-semibold text-[#4D5052] mt-3">
                  Recruiter Identity Verification{" "}
                </p>
                <p className="text-[16px] font-semibold text-[#0077B5] mt-2">
                  Work Email{" "}
                </p>
              </div>
              <div className="border-dotted rounded border-2 border-indigo-600  w-[384px] h-[61px] mt-4">
                <p className="text-[16px] font-medium ml-4 mt-4">
                  {" "}
                  {profileVarify?.email}
                </p>
              </div>

              <div>
              <p className="text-[16px] font-semibold text-[#0077B5] mt-2">
                  Work Email{" "}
                </p>
                <div className="border-dotted rounded border-2 border-indigo-600  w-[384px] h-[61px] mt-4">
                <p className="text-[16px] font-medium ml-4 mt-4">
                  {" "}
                  {profileVarify?.email}
                </p>
              </div>

              </div>

              
              <div>
              <p className="text-[16px] font-semibold text-[#0077B5] mt-2">
                  Work Email{" "}
                </p>
                <div className="border-dotted rounded border-2 border-indigo-600  w-[384px] h-[61px] mt-4">
                <p className="text-[16px] font-medium ml-4 mt-4">
                  {" "}
                  {profileVarify?.email}
                </p>
              </div>

              </div>


              <div>
              <p className="text-[16px] font-semibold text-[#0077B5] mt-2">
                  Work Email{" "}
                </p>
                <div className="border-dotted rounded border-2 border-indigo-600  w-[384px] h-[61px] mt-4">
                <p className="text-[16px] font-medium ml-4 mt-4">
                  {" "}
                  {profileVarify?.email}
                </p>
              </div>

              </div>
            </div>
          </div>
        </div>

       

      </div>
    </div>
  );
};

export default ProfileVerifyDetails;
