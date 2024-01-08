import { useEffect, useState } from "react";

import { Image } from "antd";
const ProfileVerifyDetails = ({ modalData, closeModal }) => {
  console.log(modalData);

  const [profileVerifydocument, setProfileVerifydocument] = useState([]);

  useEffect(() => {
    fetch(
      `https://rsapp.unbolt.co/verifyprofiledocument?userid=${modalData?._id}`
    )
      .then((res) => res.json())
      .then((data) => {
        // setIsLoding(true);
        setProfileVerifydocument(data);
        console.log(data);
      });
  }, []);
  console.log(profileVerifydocument);
  // const { path } = profileVerifydocument;

  const [companyverify, setCompany_verify] = useState([]);

  useEffect(() => {
    fetch(`https://rsapp.unbolt.co/company_varify?userid=${modalData?._id}`)
      .then((res) => res.json())
      .then((data) => {
        //   setIsLoding(true);
        setCompany_verify(data);
        console.log(data);
      });
  }, []);

  console.log(companyverify);

  const isPDF = companyverify?.path?.toLowerCase().endsWith(".pdf");
  const isPPDF = profileVerifydocument?.path?.toLowerCase().endsWith(".pdf");

  return (
    <div>
      <div>
        <input
          type="checkbox"
          id="verifi-details-modal"
          className="modal-toggle"
        />
        <div className="modal w-full ">
          <div className="bg-white rounded-lg relative  lg:w-[850px]  lg:h-[600px] md:w-[750px] md:h-[550px] w-full h-full">
            <label
              htmlFor="verifi-details-modal"
              onClick={closeModal}
              className="cursor-pointer text-[25px] absolute right-4 top-2 text-black"
            >
              ✕
            </label>
            <div className="p-3  gap-4">
              <div className="flex gap-x-4">
                <div className="mt-[10px]">
                  <p className="text-[12px] font-medium text-white bg-[#0077B5] p-1 w-[210px]">
                    Company Verification Attachment
                  </p>

                  <div>
                    {modalData.other.company_docupload === false ? (
                      <p className="border-dashed border-[1px] border-[#0077B5] w-[400px] h-[260px] mt-2 pl-2 pt-2">
                        {" "}
                        No documents submitted <br></br>for Company verify
                      </p>
                    ) : (
                      <div>
                        {companyverify?.path === null ? (
                          <p className="mt-2 text-[14px]">
                            No documents submitted for profile verify
                          </p>
                        ) : (
                          <div className="border-dashed border-[1px] border-[#0077B5] w-[400px] h-[260px] mt-2">
                            {isPDF ? (
                              <div>
                                <iframe
                                  src={`https://rsapp.unbolt.co/${companyverify?.path}`}
                                  width="398"
                                  height="258"
                                ></iframe>
                                <div>
                                  <a
                                    href={`https://rsapp.unbolt.co/${companyverify?.path}`}
                                    download={`downloaded_file.pdf`}
                                    target="_blank"
                                  >
                                    <button
                                      type="button"
                                      className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br  focus:outline-none text-[10px]  font-medium rounded-lg  px-2 py-1 text-center mr-2 mb-2 mt-1"
                                    >
                                      {" "}
                                      Download PDF
                                    </button>
                                  </a>
                                </div>
                              </div>
                            ) : (
                              <div>
                                <Image
                                  width={398}
                                  height={258}
                                  src={`https://rsapp.unbolt.co/${companyverify?.path}`}
                                />
                                <div>
                                  <a
                                    href={`https://rsapp.unbolt.co/${companyverify?.path}`}
                                    download={`downloaded_image.png`}
                                    target="_blank"
                                  >
                                    <button
                                      type="button"
                                      className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br  focus:outline-none text-[10px]  font-medium rounded-lg  px-2 py-1 text-center mr-2 mb-2 mt-1"
                                    >
                                      Download image
                                    </button>
                                  </a>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-[10px]">
                  <p className="text-[12px] font-medium text-white bg-[#0077B5] p-1 w-[250px]">
                    Recruiter Identity Verification Attachment
                  </p>
                  {/* {
   modalData.other.profile_docupload === false ?
} */}
                  {profileVerifydocument?.path === null ? (
                    <p className="mt-2 text-[14px]">
                      No documents submitted for profile verify
                    </p>
                  ) : (
                    <div className="border-dashed border-[1px] border-[#0077B5] w-[400px] h-[260px] mt-2">
                      {isPPDF ? (
                        <div>
                          {modalData.other.profile_docupload === true || modalData.other.profile_other_docupload === true ? 
                          
                          (
                            <>
                              <div>
                                {profileVerifydocument?.path === null ? (
                                  <p> </p>
                                ) : (
                                  <div>
                                    <iframe
                                      src={`https://rsapp.unbolt.co/${profileVerifydocument?.path}`}
                                      width="398"
                                      height="258"
                                    ></iframe>

                                    <div>
                                      <a
                                        href={`https://rsapp.unbolt.co/${profileVerifydocument?.path}`}
                                        download={`downloaded_file.pdf`}
                                        target="_blank"
                                      >
                                        <button
                                          type="button"
                                          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br  focus:outline-none  font-medium rounded-lg text-sm px-2 py-1 text-center mr-2 mb-2 mt-1"
                                        >
                                          Download PDF
                                        </button>
                                      </a>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </>
                          )
                          :
                          (
                            <p className="mt-2 w-[400px] pl-2">
                              {" "}
                              No documents submitted
                              <br /> for profile verify
                            </p>
                          )
                          
                          
                          }
                        </div>
                      ) : (
                        <div>
                          {modalData.other.profile_other_docupload === true  ||  modalData.other.profile_docupload === true  ?
                          
                          (
                            <>
                              <div>
                                {profileVerifydocument?.path === null ? (
                                  <p></p>
                                ) : (
                                  <div>
                                    <Image
                                      width={398}
                                      height={258}
                                      src={`https://rsapp.unbolt.co/${profileVerifydocument?.path}`}
                                    />

                                    <div>
                                      <a
                                        href={`https://rsapp.unbolt.co/${profileVerifydocument?.path}`}
                                        download={`downloaded_image.png`}
                                        target="_blank"
                                      >
                                        <button
                                          type="button"
                                          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br  focus:outline-none text-[10px]  font-medium rounded-lg  px-2 py-1 text-center mr-2 mb-2 mt-1"
                                        >
                                          Download image
                                        </button>
                                      </a>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </>
                          )
                          
                          
                          : 
                          (
                            <p className="mt-2 w-[400px] pl-2">
                              {" "}
                              No documents submitted <br />
                              for profile verify
                            </p>
                          )
                          
                          
                      
                          
                          
                          }
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className=" mt-10  ">
                <div className="pt-3">
                  <p className="text-[18px] text-[#212427] font-normal">
                    LinkedIn Profile:
                  </p>
                  <p className="text-[18px] text-blue-500  mt-1">
                    <a href={profileVerifydocument?.link} target="_blank">
                      {profileVerifydocument?.link}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div>
        <div>
          <input
            type="checkbox"
            id="verifi-details-modal"
            className="modal-toggle"
          />
          <div className="modal  h-[1000px] w-[650px] ml-[280px] shadow-xl mt-10  rounded rounded-[20px]"
            <div className="bg-white">
              <div className="p-[100px]">
                <div>
                  
                    <div className=" ">
                      <div className="">
                        <p className="text-[20px] font-medium text-white p-2 bg-[#0077B5]">
                          Company Verification Attachment{" "}
                        </p>

                        <div className="border-dashed border-2 border-[#0077B5]  w-[500px] h-[370px] mt-4 rounded">
                          <div className="flex gap-2">
                            <Image
                              width={500}
                              height={370}
                              src={`https://rsapp.unbolt.co/${modalData?.path}`}
                            />
                            <Image
                              width={200}
                              height={135}
                              src={`https://rsapp.unbolt.co/${companyverify?.path}`}
                            />
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
                        <div className="border-dotted rounded border-2 border-[#0077B5]  w-[384px] h-[61px] mt-4">
                          <p className="text-[16px] font-medium ml-4 mt-4">
                            {" "}
                            {profileVarify?.email}
                          </p>
                        </div>

                        <div>
                          <p className="text-[16px] font-semibold text-[#0077B5] mt-2">
                            Linkdin URl{" "}
                          </p>
                          <div className="border-dotted rounded border-2 border-[#0077B5]  w-[384px] h-[61px] mt-4">
                            <p className="text-[16px] font-medium ml-4 mt-4">
                              {" "}
                              {profileVarify?.email}
                            </p>
                          </div>
                        </div>

                        <div>
                          <p className="text-[16px] font-semibold text-[#0077B5] mt-2">
                            Appointment letter{" "}
                          </p>
                          <div className="border-dotted rounded border-2 border-[#0077B5]  w-[384px] h-[61px] mt-4">
                            <p className="text-[16px] font-medium ml-4 mt-4">
                              {" "}
                              {profileVarify?.email}
                            </p>
                          </div>
                        </div>

                        <div>
                          <p className="text-[16px] font-semibold text-[#0077B5] mt-2">
                            Offer Letter{" "}
                          </p>
                          <div className="border-dotted rounded border-2 border-[#0077B5]  w-[384px] h-[61px] mt-4">
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
                          <div className="border-dotted rounded border-2 border-[#0077B5]  w-[384px] h-[61px] mt-4">
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
            </div>
          </div>
        </div>  */}
    </div>
  );
};

export default ProfileVerifyDetails;

// import { useEffect, useState } from "react";
// import { useLoaderData } from "react-router-dom";
// import Spinner from "../../Spinner/Spinner";
// import { GoVerified } from "react-icons/go";
// import { Image } from "antd";
// const ProfileVerifyDetails = ({ modalData, closeModal }) => {
//   const profileVarify = useLoaderData();
//   console.log(modalData);
//   const { _id } = modalData;

//   // console.log(modalData);

//   const [isLoding, setIsLoding] = useState(false);
//   const [refresh, setRefresh] = useState(true);
//   const [profileVerifydocument, setProfileVerifydocument] = useState([]);

//   useEffect(() => {
//     fetch(
//       `https://rsapp.unbolt.co/verifyProfiledocument?userid=${modalData?._id}`
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         setIsLoding(true);
//         setProfileVerifydocument(data);
//         console.log(data);
//       });
//   }, [refresh]);
//   // console.log(profileVerifydocument);

//   // const {
//   //   userid,
//   //   destination,
//   //   createdAt,
//   //   fieldname,
//   //   filename,
//   //   mimetype,
//   //   originalname,
//   //   path,
//   //   size,
//   // } = profileVerifydocument;

//   const [companyverify, setCompany_verify] = useState([]);

//   useEffect(() => {
//     fetch(`https://rsapp.unbolt.co/company_varify?userid=${modalData?._id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         //   setIsLoding(true);
//         setCompany_verify(data);
//         console.log(data);
//       });
//   }, [refresh]);

//   // console.log(companyverify);

//   // const [companybyprofile, setcompanybyprofile] = useState([]);

//   // useEffect(() => {
//   //   fetch(`https://rsapp.unbolt.co/verifyRecruterCompny?_id=${_id}`)
//   //     .then((res) => res.json())
//   //     .then((data) => {
//   //       //   setIsLoding(true);
//   //       setcompanybyprofile(data);
//   //       //   console.log(data);
//   //     });
//   // }, [refresh]);

//   // console.log(companybyprofile);

//   // const makeVerifide = (_id) => {
//   //   try {
//   //     fetch(`https://rsapp.unbolt.co/verifyRecruterProfile/${_id}`, {
//   //       method: "PATCH",
//   //     })
//   //       .then((res) => res.json())
//   //       .then((data) => {
//   //         if (data) {
//   //           alert("Make Verifiy Successful.");
//   //           setRefresh(!refresh);
//   //         }
//   //       })
//   //       .catch((error) => console.error(error));
//   //   } catch (error) {
//   //     console.error(error);
//   //   }
//   // };

//   // const handelMakeVerifide = (_id) => {
//   //   fetch(`https://rsapp.unbolt.co/verifyRecruterCompny/${_id}`, {
//   //     method: "PATCH",
//   //   })
//   //     .then((res) => res.json())
//   //     .then((data) => {
//   //       if (data) {
//   //         alert("Make Verifiy Successful.");
//   //         setRefresh(!refresh);
//   //         console.log(data._id);
//   //       }
//   //     });
//   // };
//   if (isLoding === false) {
//     return (
//       <div className="">
//         <Spinner></Spinner>
//       </div>
//     );
//   }

//   return (
//     <div>
//       {/* -[130px] ml-[1400px] w-[240px] mt-[360px] */}

//       <div>
//         <div>
//           <input
//             type="checkbox"
//             id="verifi-details-modal"
//             className="modal-toggle"
//           />
//           <div className="modal  h-[1000px] w-[650px] ml-[280px] shadow-xl mt-10  rounded rounded-[20px]">
//             <div className="bg-white">
//               <div className="p-[100px]">
//                 <div>
//                   <div className="flex gap-10">
//                     {/* <div>
//             <div className="w-[550px]  h-[187px] border border-[#A19C9C] border-[1px] rounded">
//               <div className="flex px-5 py-3 justify-around">
//                 <div>
//                   <h1 className="text-[16px] font-semibold text-[#4D5052]">
//                     Recruiter Information
//                   </h1>
//                   <div className="flex gap-5 mt-3">
//                     <div>
//                       <p className="text-[16px] font-medium text-[#383A3D]">
//                         Recruiter Name
//                       </p>
//                       <p className="text-[16px] font-medium text-[#383A3D] my-2">
//                         Designation
//                       </p>
//                       <p className="text-[16px] font-medium text-[#383A3D]">
//                         Phone Number
//                       </p>
//                       <p className="text-[16px] font-medium text-[#383A3D] my-2">
//                         Email
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[16px] font-medium text-[#383A3D]">
//                         :
//                       </p>
//                       <p className="text-[16px] font-medium text-[#383A3D] my-2">
//                         :
//                       </p>
//                       <p className="text-[16px] font-medium text-[#383A3D]">
//                         :
//                       </p>
//                       <p className="text-[16px] font-medium text-[#383A3D] my-2">
//                         :
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[16px] font-medium text-[#383A3D]">
//                         {profileVarify?.firstname} {profileVarify?.lastname}
//                       </p>
//                       <p className="text-[16px] font-medium text-[#383A3D] my-2">
//                         {" "}
//                         {profileVarify?.designation}
//                       </p>
//                       <p className="text-[16px] font-medium text-[#383A3D]">
//                         {profileVarify?.number}
//                       </p>
//                       <p className="text-[16px] font-medium text-[#383A3D] my-2">
//                         {profileVarify?.email}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <div>
//                     <img
//                       className="rounded rounded-full w-[92px] h-[92px] ml-1 mt-2 mb-5"
//                       src={`https://rsapp.unbolt.co/${profileVarify?.image}`}
//                     />
//                     <div>
//                       {profileVarify?.other?.profile_verify == false ? (
//                         <button
//                           onClick={() => makeVerifide(_id)}
//                           className="text-[16px] font-medium w-[100px] h-[42px] border rounded rounded-full"
//                         >
//                           Approve
//                         </button>
//                       ) : (
//                         <p className="items-center flex gap-2  text-[16px] font-medium w-[100px] h-[42px] border rounded rounded-full">
//                           <span className="text-blue-500 ml-2">
//                             <GoVerified></GoVerified>
//                           </span>{" "}
//                           Verified
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="w-[550px]  h-[187px] border border-[#A19C9C] border-[1px] my-4 rounded">
//               <div className="flex px-5 py-3">
//                 <div>
//                   <h1 className="text-[16px] font-semibold text-[#4D5052]">
//                     Company Information
//                   </h1>
//                   <div className="flex gap-5 mt-3">
//                     <div>
//                       <p className="text-[16px] font-medium text-[#383A3D]">
//                         Company Name
//                       </p>
//                       <p className="text-[16px] font-medium text-[#383A3D] my-2">
//                         Employee Size{" "}
//                       </p>
//                       <p className="text-[16px] font-medium text-[#383A3D]">
//                         Location{" "}
//                       </p>
//                       <p className="text-[16px] font-medium text-[#383A3D] my-2">
//                         Website
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[16px] font-medium text-[#383A3D]">
//                         :
//                       </p>
//                       <p className="text-[16px] font-medium text-[#383A3D] my-2">
//                         :
//                       </p>
//                       <p className="text-[16px] font-medium text-[#383A3D]">
//                         :
//                       </p>
//                       <p className="text-[16px] font-medium text-[#383A3D] my-2">
//                         :
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-[16px] font-medium text-[#383A3D]">
//                         {profileVarify?.companyname?.legal_name}
//                       </p>
//                       <p className="text-[16px] font-medium text-[#383A3D] my-2">
//                         {profileVarify?.companyname?.c_size?.size}
//                       </p>
//                       <p className="text-[16px] font-medium text-[#383A3D]">
//                         {profileVarify?.companyname?.c_location?.formet_address}{" "}
//                       </p>
//                       <p className="text-[16px] font-medium text-[#383A3D] my-2">
//                         {profileVarify?.companyname?.c_website}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//                 <div></div>
//               </div>
//             </div>
//           </div> */}
//                     <div className="w-[457px]    rounded">
//                       <div className="px-5 py-3">
//                         <p className="text-[20px] font-medium text-white p-2 bg-[#0077B5]">
//                           Company Verification Attachment{" "}
//                         </p>

//                         <div className="border-dashed border-2 border-[#0077B5]  w-[500px] h-[370px] mt-4 rounded">
//                           <div className="flex gap-2">
//                             <Image
//                               width={500}
//                               height={370}
//                               src={`https://rsapp.unbolt.co/${modalData?.path}`}
//                             />
//                             <Image
//                               width={200}
//                               height={135}
//                               src={`https://rsapp.unbolt.co/${companyverify?.path}`}
//                             />
//                             {/* <embed src='https://rsapp.unbolt.co/resumes/my-resume.pdf' type="application/pdf" width="50%" height="110px" /> */}
//                           </div>
//                         </div>

//                         <div>
//                           <p className="text-[16px] font-semibold text-[#4D5052] mt-3">
//                             Recruiter Identity Verification{" "}
//                           </p>
//                           <p className="text-[16px] font-semibold text-[#0077B5] mt-2">
//                             Work Email{" "}
//                           </p>
//                         </div>
//                         <div className="border-dotted rounded border-2 border-[#0077B5]  w-[384px] h-[61px] mt-4">
//                           <p className="text-[16px] font-medium ml-4 mt-4">
//                             {" "}
//                             {profileVarify?.email}
//                           </p>
//                         </div>

//                         <div>
//                           <p className="text-[16px] font-semibold text-[#0077B5] mt-2">
//                             Linkdin URl{" "}
//                           </p>
//                           <div className="border-dotted rounded border-2 border-[#0077B5]  w-[384px] h-[61px] mt-4">
//                             <p className="text-[16px] font-medium ml-4 mt-4">
//                               {" "}
//                               {profileVarify?.email}
//                             </p>
//                           </div>
//                         </div>

//                         <div>
//                           <p className="text-[16px] font-semibold text-[#0077B5] mt-2">
//                             Appointment letter{" "}
//                           </p>
//                           <div className="border-dotted rounded border-2 border-[#0077B5]  w-[384px] h-[61px] mt-4">
//                             <p className="text-[16px] font-medium ml-4 mt-4">
//                               {" "}
//                               {profileVarify?.email}
//                             </p>
//                           </div>
//                         </div>

//                         <div>
//                           <p className="text-[16px] font-semibold text-[#0077B5] mt-2">
//                             Offer Letter{" "}
//                           </p>
//                           <div className="border-dotted rounded border-2 border-[#0077B5]  w-[384px] h-[61px] mt-4">
//                             <p className="text-[16px] font-medium ml-4 mt-4">
//                               {" "}
//                               {profileVarify?.email}
//                             </p>
//                           </div>
//                         </div>

//                         <div>
//                           <p className="text-[16px] font-semibold text-[#0077B5] mt-2">
//                             Work Email{" "}
//                           </p>
//                           <div className="border-dotted rounded border-2 border-[#0077B5]  w-[384px] h-[61px] mt-4">
//                             <p className="text-[16px] font-medium ml-4 mt-4">
//                               {" "}
//                               {profileVarify?.email}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/*
//         {companybyprofile?.other?.company_verify == false ? (
//                           <button
//                             onClick={() =>
//                               handelMakeVerifide(companybyprofile?._id)
//                             }
//                             className="btn btn-xs bg-indigo-500 text-white "
//                           >
//                             {" "}
//                             Verify Company
//                           </button>
//                         ) : (
//                           <span className="text-blue-500">
//                             <GoVerified></GoVerified>
//                           </span>
//                         )} */}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileVerifyDetails;
