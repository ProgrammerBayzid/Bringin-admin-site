import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Spinner from "../../Spinner/Spinner";
import { GoVerified } from "react-icons/go";
import { Image } from "antd";
const ProfileVerifyDetails = ({ modalData, closeModal }) => {
  console.log(modalData);

  const [profileVerifydocument, setProfileVerifydocument] = useState([]);

  useEffect(() => {
    fetch(
      `https://rsapp.bringin.io/verifyprofiledocument?userid=${modalData?._id}`
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
    fetch(`https://rsapp.bringin.io/company_varify?userid=${modalData?._id}`)
      .then((res) => res.json())
      .then((data) => {
        //   setIsLoding(true);
        setCompany_verify(data);
        console.log(data);
      });
  }, []);

  console.log(companyverify);

  // const { path } = companyverify;

  // Separate PDF and image paths
  const pdfPaths = [];
  const imagePaths = [];

  for (const document of profileVerifydocument) {
    if (document.path().endsWith(".pdf")) {
      pdfPaths.push(document.path);
    } else if (
      document.path().endsWith(".png") ||
      document.path().endsWith(".jpg") ||
      document.path().endsWith(".jpeg") ||
      document.path().endsWith(".gif")
    ) {
      imagePaths.push(document.path);
    }
  }

  for (const document of companyverify) {
    if (document.path().endsWith(".pdf")) {
      pdfPaths.push(document.path);
    } else if (
      document.path().endsWith(".png") ||
      document.path().endsWith(".jpg") ||
      document.path().endsWith(".jpeg") ||
      document.path().endsWith(".gif")
    ) {
      imagePaths.push(document.path);
    }
  }

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
            <div className="p-3 flex gap-4">
              <div>
                <div>
                  <p className="text-[15px] font-medium text-white bg-[#0077B5] p-1 w-[280px]">
                    Company Verification Attachment
                  </p>
                  <div className="border-dashed border-2 border-[#0077B5] w-[480px] h-[240px] mt-2">
                    {companyverify?.path ? (
                      <iframe
                        src={`https://rsapp.bringin.io/${companyverify?.path}`}
                        width="475"
                        height="235"
                      ></iframe>
                    ) : (
                      <Image
                        width={475}
                        height={235}
                        src={`https://rsapp.bringin.io/${companyverify?.path}`}
                      />
                    )}
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-[15px] font-medium text-white bg-[#0077B5] p-1 w-[350px]">
                    Recruiter Identity Verification Attachment
                  </p>
                  <div className="border-dashed border-2 border-[#0077B5] w-[480px] h-[240px] mt-2">
                    {profileVerifydocument?.path ? (
                      <iframe
                        src={`https://rsapp.bringin.io/${profileVerifydocument?.path}`}
                        width="475"
                        height="235"
                      ></iframe>
                    ) : (
                      <Image
                        width={475}
                        height={235}
                        src={`https://rsapp.bringin.io/${profileVerifydocument?.path}`}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="h-[100px] w-full mt-10 border-2 border-[#0077B5] ">
                <div className="p-3">
                  <p className="text-[18px] border border-1 border-[#0077B5] w-[149px] rounded rounded-[20px] text-center">
                    LinkedIn Profile
                  </p>
                  <p className="text-[18px] ml-1 mt-2">LinkedIn Profile </p>
                </div>
              </div>
              <div>
                {/* Render your component's content here */}
                <div>
                  <h2>PDF Paths:</h2>
                  <ul>
                    {pdfPaths.map((path, index) => (
                      <li key={index}>{path}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2>Image Paths:</h2>
                  <ul>
                    {imagePaths.map((path, index) => (
                      <li key={index}>{path}</li>
                    ))}
                  </ul>
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
          <div className="modal  h-[1000px] w-[650px] ml-[280px] shadow-xl mt-10  rounded rounded-[20px]">
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
                              src={`https://rsapp.bringin.io/${modalData?.path}`}
                            />
                            <Image
                              width={200}
                              height={135}
                              src={`https://rsapp.bringin.io/${companyverify?.path}`}
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
//       `https://rsapp.bringin.io/verifyProfiledocument?userid=${modalData?._id}`
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
//     fetch(`https://rsapp.bringin.io/company_varify?userid=${modalData?._id}`)
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
//   //   fetch(`https://rsapp.bringin.io/verifyRecruterCompny?_id=${_id}`)
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
//   //     fetch(`https://rsapp.bringin.io/verifyRecruterProfile/${_id}`, {
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
//   //   fetch(`https://rsapp.bringin.io/verifyRecruterCompny/${_id}`, {
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
//                       src={`https://rsapp.bringin.io/${profileVarify?.image}`}
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
//                               src={`https://rsapp.bringin.io/${modalData?.path}`}
//                             />
//                             <Image
//                               width={200}
//                               height={135}
//                               src={`https://rsapp.bringin.io/${companyverify?.path}`}
//                             />
//                             {/* <embed src='https://rsapp.bringin.io/resumes/my-resume.pdf' type="application/pdf" width="50%" height="110px" /> */}
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
