import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";
import RegisterSuccessModal from "./RegisterSuccessModal";
import DefueltImageModal from "./DefueltImageModal";

import RecruterCompanyRegister from "./RecruterCompanyRegister";
import Spinner from "../../Spinner/Spinner";

const RegisterRecruter = () => {
  const { id } = useParams();
  const dataLocation = useLocation();
  const { modalData } = dataLocation.state;
  const [recruter, setrecruter] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = () => {
    // setIsLoading(true);

    fetch(`https://rsapp.unbolt.co/clint_recruiters_profile/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setrecruter(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(true);
      });
  };
  useEffect(() => {
    // Initial data fetch when component mounts
    fetchData();
  }, [id]);

  const {
    register, 
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [defultImageOpen, setdefultImageOpen] = useState(false);
  const [ropenModal, rcloseModal] = useState(false);
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  console.log(selectedFile);
  console.log(selectedImage);
  const handleButtonClick = () => {
    fileInputRef.current.click();
    toggleDrop();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    // setSelectedDefaultFile(null);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const [isOpenf, setIsOpenf] = useState(false);
  const toggleDrop = () => {
    setIsOpenf(!isOpenf);
  };
  const [selectedDefaultFile, setSelectedDefaultFile] = useState(null); // New state for selected default file
  useEffect(() => {
    // Assuming profileData and recruter are fetched asynchronously
    if ( recruter) {
      // Set the default values here
      // setValue("image", (recruter && recruter?.image) || "");
      setValue(
        "firstname",
         (recruter && recruter?.firstname) || ""
      );
      setValue(
        "lastname",
        (recruter && recruter?.lastname) || ""
      );
      setValue(
        "email",
         (recruter && recruter?.email) || ""
      );
      setValue(
        "designation",
        (recruter && recruter?.designation) || ""
      );
      // Repeat this for other fields
    }
  }, [recruter]);
  const addRecruterData = (data, e) => {
    const formData = new FormData();
    formData.append("firstname", data.firstname);
    formData.append("lastname", data.lastname);
    formData.append("designation", data.designation);
    formData.append("email", data.email);
    formData.append("image", selectedFile); // Assuming data.image is an array of File objects

    const token = localStorage.getItem("admin_token");
    const tokenWithoutQuotes = token.replace(/"/g, "");

    if (tokenWithoutQuotes) {
      fetch(`http://localhost:3002/adminPanel_recruiters_update/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokenWithoutQuotes}`,
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((result) => {
          e.target.reset();
          rcloseModal(true);
          fetchData();
        })
        .catch((error) => {
          console.error("Error uploading data:", error);
        });
    } else {
      console.log("Token not found in local storage");
    }
  };
  
if(isLoading === true){
    return (
        <div className="">
          <Spinner></Spinner>
        </div>
      );
}

  return (
    <div className="mt-[80px]">
      <div className="flex justify-center">
        
        <div>
          <div className="lg:w-[700px] bg-white lg:h-auto  border border-[#212427] border-opacity-20  rounded rounded-[10px] p-7">
            <div className="mb-2">
              <h1 className="text-[22px] font-bold  text-center text-[#212427] text-opacity-70 ">
                My Professional Profile as a Recruiter
              </h1>
              <p className="text-center text-[16px] text-[#212427]  font-normal">
                Introduce Yourself to the Candidates
              </p>
            </div>

            <div className="mb-5">
              <form
                onSubmit={handleSubmit(addRecruterData)}
                encType="multipart/form-data"
              >
                <div className="mb-7">
                  <div className=" flex justify-center">
                    <div className="relative h-[82px] w-[82px]">
                      <img
                        onClick={toggleDrop}
                        src={
                          selectedImage === null
                            ? selectedDefaultFile === null
                              ? recruter?.image === null
                                ? "/images/recruterImage.svg"
                                : `https://rsapp.unbolt.co/${recruter?.image}`
                              : selectedDefaultFile ||
                                "/images/recruterImage.svg"
                            : selectedImage || "/images/recruterImage.svg"
                        }
                        className="h-[82px] w-[82px] rounded rounded-full"
                      />
                      <img
                        onClick={toggleDrop}
                        className="absolute bottom-0 right-0 cursor-pointer"
                        src="/images/rcamera.svg"
                      />
                    </div>

                    <input
                      type="file"
                      ref={fileInputRef}
                      name="image"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                  </div>
                  <h1 className="text-center text-[14px] text-[#212427]  font-normal mt-3">
                    Upload a photo or select an avatar
                  </h1>
                  <div className="ml-[220px] absolute z-40">
                    {isOpenf && (
                      <div className="shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] bg-white rounded w-[210px] h-[160px] pb-3 pt-2  overflow-auto pl-5 pt-6 rounded-[10px]">
                        <p
                          onClick={handleButtonClick}
                          className="text-[#212427] cursor-pointer text-[16px] font-normal mb-4"
                        >
                          Upload From Gallery
                        </p>
                        <p
                          onClick={() => setdefultImageOpen(true)}
                          className="text-[#212427] cursor-pointer text-[16px] font-normal mb-4"
                        >
                          Select From Default
                        </p>
                        <p
                          onClick={toggleDrop}
                          className="text-[#212427] cursor-pointer text-[16px] font-normal mb-4"
                        >
                          Cancel
                        </p>
                      </div>
                    )}
                  </div>
                  {defultImageOpen && (
                    <DefueltImageModal
                      setSelectedDefaultFile={setSelectedDefaultFile}
                      setSelectedFile={setSelectedFile}
                      setSelectedImage={setSelectedImage}
                      setdefultImageOpen={setdefultImageOpen}
                      toggleDrop={toggleDrop}
                      defultImageOpen={defultImageOpen}
                    ></DefueltImageModal>
                  )}
                  <div></div>
                </div>

                <div className="mb-2 relative">
                  <h1 className=" text-[16px] text-[#212427]  font-light  mb-1">
                    First Name
                  </h1>
                  <input
                    placeholder="Fast Name"
                    type="text"
                    {...register("firstname", {
                      required: "firstname is Required",
                    })}
                    defaultValue={(recruter && recruter?.firstname) || ""}
                    className="focus:outline-none placeholder:text-[#212427] border-opacity-80 rounded placeholder:text-opacity-70  input py-5 pb-5 ps-2 w-full mb-[5px] h-[44px] border border-[#212427] "
                  />
                  {errors.firstname && (
                    <p className="text-red-500">{errors.firstname.message}</p>
                  )}

                  {recruter && recruter?.firstname !== null ? (
                    <>
                      <img
                        src="/images/inputtik.svg"
                        className="absolute  right-3 bottom-5    h-[15px] w-[15px] "
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="mb-2 relative">
                  <h1 className=" text-[16px] text-[#212427]  font-light mb-1">
                    Last Name
                  </h1>
                  <input
                    placeholder="Last name"
                    type="text"
                    {...register("lastname", {
                      required: "  lastname is Required",
                    })}
                    defaultValue={(recruter && recruter?.lastname) || ""}
                    className="focus:outline-none placeholder:text-[#212427] border-opacity-80 rounded placeholder:text-opacity-70  input py-5 pb-5 ps-2 w-full mb-[5px] h-[44px] border border-[#212427] "
                  />
                  {recruter && recruter?.lastname !== null ? (
                    <>
                      <img
                        src="/images/inputtik.svg"
                        className="absolute  right-3 bottom-5    h-[15px] w-[15px] "
                      />
                    </>
                  ) : (
                    <></>
                  )}
                  {errors.lastname && (
                    <p className="text-red-500">{errors.lastname.message}</p>
                  )}
                </div>
                <div className="mb-2 mt-6 relative">
                  <h1 className=" text-[16px] text-[#212427]  font-light mb-1">
                    Designation
                  </h1>
                  <input
                    placeholder=" Designation"
                    type="text"
                    {...register("designation", {
                      required: "  designation is Required",
                    })}
                    defaultValue={(recruter && recruter.designation) || ""}
                    className="focus:outline-none placeholder:text-[#212427] border-opacity-80 rounded placeholder:text-opacity-70  input py-5 pb-5 ps-2 w-full mb-[5px] h-[45px] border border-[#212427] "
                  />
                  {recruter && recruter?.designation !== null ? (
                    <>
                      <img
                        src="/images/inputtik.svg"
                        className="absolute  right-3 bottom-5    h-[15px] w-[15px] "
                      />
                    </>
                  ) : (
                    <></>
                  )}
                  {errors.designation && (
                    <p className="text-red-500">{errors.designation.message}</p>
                  )}
                </div>
                <div className="mb-2 relative">
                  <h1 className=" text-[16px] text-[#212427]  font-light mb-1">
                    Email Address
                  </h1>
                  <input
                    placeholder="Email Address"
                    type="text"
                    {...register("email", {
                      required: "  email is Required",
                    })}
                    defaultValue={(recruter && recruter.email) || " "}
                    className="focus:outline-none placeholder:text-[#212427] border-opacity-80 rounded placeholder:text-opacity-70  input py-5 pb-5 ps-2 w-full mb-[5px] h-[45px] border border-[#212427] "
                  />
                  {recruter && recruter?.email !== null ? (
                    <>
                      <img
                        src="/images/inputtik.svg"
                        className="absolute  right-3 bottom-5    h-[15px] w-[15px] "
                      />
                    </>
                  ) : (
                    <></>
                  )}
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full h-[44px] bg-[#00A0DC] bg-opacity-40 text-[18px] mt-5 font-semibold hover:bg-[#0077B5] hover:text-white rounded text-center "
                >
                  Submit
                </button>
              </form>
            </div>
            {/* company register part */}
            <div>
           <RecruterCompanyRegister modalData={modalData}>

           </RecruterCompanyRegister>
            </div>
          </div>
        </div>
      </div>
      <RegisterSuccessModal
        rvisible={ropenModal}
        rcloseModal={rcloseModal}
      ></RegisterSuccessModal>
    </div>
  );
};

export default RegisterRecruter;
