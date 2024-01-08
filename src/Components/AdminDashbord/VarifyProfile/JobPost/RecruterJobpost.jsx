import a from "../../../../../public/images/RI-icons/left-arrow.png";
import b from "../../../../../public/images/RI-icons/switch.png";
import c from "../../../../../public/images/RI-icons/right-arrow.png";
import d from "../../../../../public/images/RI-icons/blue-home.png";
import e from "../../../../../public/images/RI-icons/switch-job.png";
import { useEffect, useRef, useState } from "react";
import {  useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import ExperticeAreaSelectForJobPost from "./ExperticeAreaSelectForJobPost";
import JobSalarey from "./JobSalarey";
import JobDecription from "./JobDecription";
import JobLocationModal from "./JobLocationModal";
import CompanyLocation from "./CompanyLocation";
const RecruterJobpost = ({ google }) => {
    const { id } = useParams();
  const inputRef = useRef(null);

  useEffect(() => {
    // Event listener function to close the dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        // Click occurred outside of the input element
        // setjobTypeModalOpen(false);
        // setexpriencesModalOpen(false);
        // seteducationModalOpen(false);
      }
    };

    // Attach the event listener to the document body
    document.body.addEventListener("click", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const [jobTypeModalOpen, setjobTypeModalOpen] = useState(false);
  const [expriencesModalOpen, setexpriencesModalOpen] = useState(false);
  const [educationModalOpen, seteducationModalOpen] = useState(false);

  const [jobType, setJobtype] = useState([]);
  const [token, setToken] = useState(""); // State to store the token

  useEffect(() => {
    // Retrieve the token from localStorage
    const storedToken = localStorage.getItem("admin_token");
    const stringWithoutQuotes = storedToken.replace(/"/g, "");

    // console.log(stringWithoutQuotes); // Replace "yourTokenKey" with the actual key you used to store the token

    if (stringWithoutQuotes) {
      // If a token is found in localStorage, set it in the component's state
      setToken(stringWithoutQuotes);
    }

    fetch("https://rsapp.unbolt.co/jobtype", {
      headers: {
        Authorization: `Bearer ${token}`, // Use the token in the Authorization header
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setJobtype(data);
        // console.log(data);
      });
  }, [token]);

  const [expriencesdata, setexpriencesdata] = useState([]);

  useEffect(() => {
    // Retrieve the token from localStorage
    const storedToken = localStorage.getItem("admin_token");
    const stringWithoutQuotes = storedToken.replace(/"/g, "");

    // console.log(stringWithoutQuotes); // Replace "yourTokenKey" with the actual key you used to store the token

    if (stringWithoutQuotes) {
          fetch("https://rsapp.unbolt.co/experiencelist", {
            headers: {
              Authorization: `Bearer ${stringWithoutQuotes}`, // Use the token in the Authorization header
            },
          })
            .then((res) => res.json())
            .then((data) => {
              setexpriencesdata(data);
              console.log(data);
            });
    }
  }, []);
  // console.log(expriencesdata);

  const [educationData, seteducationData] = useState([]);

  useEffect(() => {
    // Retrieve the token from localStorage
    const storedToken = localStorage.getItem("admin_token");
    const stringWithoutQuotes = storedToken.replace(/"/g, "");

    // console.log(stringWithoutQuotes); // Replace "yourTokenKey" with the actual key you used to store the token

    if (stringWithoutQuotes) {
      // If a token is found in localStorage, set it in the component's state
      setToken(stringWithoutQuotes);
    }

    fetch("https://rsapp.unbolt.co/education_lavel", {
      headers: {
        Authorization: `Bearer ${token}`, // Use the token in the Authorization header
      },
    })
      .then((res) => res.json())
      .then((data) => {
        seteducationData(data);
        // console.log(data);
      });
  }, [token]);
  // console.log(educationData);

  const [experticeAreaModalOpen, setexperticeAreaModalOpen] = useState(false);
  const [jobdecriptionModalOpen, setjobdecriptionModalOpen] = useState(false);
  const [salaryModalOpen, setsalaryModalOpen] = useState(false);
  const [skillModalOpen, setskillModalOpen] = useState(false);

  const toggleDrop = () => {
    setjobTypeModalOpen(true);
    // console.log("click");
  };
  // console.log(jobTypeModalOpen);
  const handelGetJobType = (worktype, id) => {
    setjobeTypename(worktype);
    setjobeTypeId(id);
    setjobTypeModalOpen(false);
  };

  const handelExprienceType = (name, id) => {
    setexpriences(name);
    setexpriencesID(id);
    setexpriencesModalOpen(false);
  };
  const handeleducationType = (name, id) => {
    seteducation(name);
    seteducationID(id);
    seteducationModalOpen(false);
  };

  const toggleDropExprience = () => {
    setexpriencesModalOpen(true);
  };
  const toggleDropEducation = () => {
    seteducationModalOpen(true);
  };

  const [jobeTypeId, setjobeTypeId] = useState("649a8d1196d89e33a061cace");
  const [jobeTypename, setjobeTypename] = useState("Full Time");
  const [jobTitle, setJobTitle] = useState("");
  const [experticeArea, setexperticeArea] = useState("");
  const [experticeAreaCatagoryID, setexperticeAreaCatagoryID] = useState(null);
  const [experticeAreaID, setexperticeAreaID] = useState(null);
  const [jobdeceription, setjobdeceription] = useState("");
  const [jobdeceriptionHtml, setjobdeceriptionHtml] = useState("");
  const [expriences, setexpriences] = useState("");
  const [expriencesID, setexpriencesID] = useState(null);
  const [education, seteducation] = useState("");
  const [educationID, seteducationID] = useState(null);
  const [maxsalary, setmaxsalary] = useState("");
  const [maxsalaryID, setmaxsalaryID] = useState(null);
  const [minsalary, setminsalary] = useState("");
  const [minsalaryID, setminsalaryID] = useState(null);
  const [skill, setSkill] = useState([]);
  const [skilltype, setskilltype] = useState([]);
  const [remote, setRemote] = useState(false);
  // console.log(expriences, expriencesID);
  // console.log("catagori id", experticeAreaCatagoryID);
  // console.log(skilltype);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const handleAddSkill = () => {
    if (experticeArea === "") {
      // If experticeArea is empty, show the error popup
      setShowErrorPopup(true);
      // alert("Please fill in the Expertise Area before adding a skill.");
    } else {
      setskillModalOpen(true);
      // Proceed to add the skill
      // ... your code to add the skill ...
    }
  };
  // console.log(remote);
  const [validationErrors, setValidationErrors] = useState([]);
  const onSubmit = async (e) => {
    const postData = {
      userid: id,
      job_title: jobTitle,
      expertice_area: experticeAreaID,
      job_description: `${JSON.stringify(jobdeceription)}`,
      experience: expriencesID,
      education: educationID,
      salary: {
        min_salary: minsalaryID,
        max_salary: maxsalaryID,
      },
      company: companyValue._id,
      skill: skill,
      jobtype: jobeTypeId,
      job_location: {
        lat:
          selectedLocation === null
            ? companyValue && companyValue?.c_location?.lat
            : selectedLocation.lat,
        lon:
          selectedLocation === null
            ? companyValue && companyValue?.c_location?.lon
            : selectedLocation.lng,
        formet_address:
          locationName === ""
            ? companyValue?.c_location?.formet_address
            : locationName,
        locationoptional:
          locationoptional === ""
            ? companyValue?.c_location?.locationoptional
            : locationoptional,
        divisiondata:
          selectedClickDivisionID === null
            ? companyValue?.c_location?.divisiondata?._id
            : selectedClickDivisionID,
      },
      remote: remote,
      companyname: companyValue?.legal_name,
    };
    try {
      const token = localStorage.getItem("token");
      const tokenWithoutQuotes = token.replace(/"/g, "");

      const response = await fetch(`https://rsapp.unbolt.co/AdminPanel_job_post/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokenWithoutQuotes}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = `HTTP error! Status: ${
          response.status
        }, Message: ${response.statusText}, Errors: ${JSON.stringify(
          errorData
        )}`;
        setValidationErrors(errorData.errors);
        throw new Error(errorMessage);
      }

      const result = await response.json();
      localStorage.setItem("adminPanaljobid", JSON.stringify(result.jobid));
   
    } catch (error) {
      if (error instanceof SyntaxError) {
        console.error("Error:", error);
      } else if (error.response && error.response.status === 400) {
        const errorData = await error.response.json();
        setValidationErrors(errorData.errors);
        console.log("errorData", errorData);
      } else {
        console.error("Error:", error);
        // Handle other types of errors
      }
    }
  };



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const [companyValue, setcompanyValue] = useState([]);
  // console.log(companyValue);
  useEffect(() => {
    const storedToken = localStorage.getItem("admin_token");
    const stringWithoutQuotes = storedToken.replace(/"/g, "");

    if (stringWithoutQuotes) {
      fetch(`https://rsapp.unbolt.co/adminPanel_company/${id}`, {
        headers: {
          Authorization: `Bearer ${stringWithoutQuotes}`, // Use the token in the Authorization header
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setcompanyValue(data);
          console.log(data);
        });
    }

  }, [id]);

  const onChangeRemote = () => {
    setRemote(!remote);
  };

  const skillCountText = `${skill.length}`;

  const [defaultSkill, setdefaultSkill] = useState([]);
  useEffect(() => {
    // Function to fetch the recruiter's profile
    const fetchRecruiterProfile = (token) => {
      if (experticeAreaCatagoryID !== null) {
        fetch(
          `https://rsapp.unbolt.co/default_skill?categoryid=${experticeAreaCatagoryID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
          .then((res) => {
            if (res.status === 401) {
              // console.log("error");
            }
            return res.json();
          })
          .then((data) => {
            if (data) {
              setdefaultSkill(data);
              data;
            }
          })
          .catch((error) => {
            // console.error("Fetch error:", error);
          })
          .finally(() => {
            // setIsLoading(false); // Mark the loading as complete
          });
      }
    };

    // Retrieve the token from localStorage
    const storedToken = localStorage.getItem("admin_token");

    if (storedToken) {
      const stringWithoutQuotes = storedToken.replace(/"/g, "");
      fetchRecruiterProfile(stringWithoutQuotes);
    } else {
      // setIsLoading(false);
    }
  }, [experticeAreaCatagoryID]); // Add experticeAreaCatagoryID as a dependency

  // console.log(defaultSkill);

  const handleAddDefaultSkill = (selectedSkill) => {
    if (skill.length < 5) {
      // Check if the selectedSkill is not already in the skill array
      if (!skill.includes(selectedSkill)) {
        setSkill([...skill, selectedSkill]);
      } else {
        alert("Skill already added.");
      }
    } else {
      alert("You can only add up to 5 skills.");
    }
  };

  const handleRemoveSkills = (functionalname) => {
    // Remove the skill
    setSkill(skill.filter((skil) => skil !== functionalname));
  };
  const handleRemoveSkill = (index) => {
    // Create a new array without the skill at the specified index
    const updatedSkillt = skilltype.filter((i) => i !== index);
    const updatedSkill = skill.filter((i) => i !== index);
    setskilltype(updatedSkillt);
    setSkill(updatedSkill);
  };

  const [openLocationDropdown, setOpenLocationDropdown] = useState(false);

  const [isModalOpenJobLocation, setIsModalOpenJobLocation] = useState(false);
  const handleInputClick = () => {
    setIsModalOpenJobLocation(true);
  };
  const [locationName, setLocationName] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const handleMapClick = (mapProps, map, clickEvent) => {
    const lat = clickEvent.latLng.lat();
    const lng = clickEvent.latLng.lng();
    setSelectedLocation({ lat, lng });
    setLocationName(""); // Clear location name when clicking on the map
    // console.log(`Latitude: ${lat}, Longitude: ${lng}`); // Log lat and lng
  };
  const [locationoptional, setlocationoptional] = useState("");
  const [locationopen, setLocationOpen] = useState(false);
  const [selectedcityname, setSelectedcityname] = useState("");
  const [selectedClickDivision, setSelectedClickDivision] = useState("");
  const [selectedClickDivisionID, setSelectedClickDivisionID] = useState(null);
  const [selectedcityID, setSelectedcityID] = useState(null);
  const handleLocationClick = () => {
    setLocationOpen(true);
  };

  const handleGoBack = () => {
    window.history.back(); // This will navigate back one step in the browser's history
  };
  const [jobTitleSugg, setjobTitleSugg] = useState([]);
  useEffect(() => {
    // Function to fetch the recruiter's profile
    const fetchRecruiterJobTitle = (token) => {
      fetch(`https://rsapp.unbolt.co/job_title?search=${jobTitle}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.status === 401) {
            // console.log("error");
          }
          return res.json();
        })
        .then((data) => {
          if (data) {
            setjobTitleSugg(data);
          }
        })
        .catch((error) => {
          // console.error("Fetch error:", error);
        })
        .finally(() => {
          // setIsLoading(false); // Mark the loading as complete
        });
    };

    // Retrieve the token from localStorage
    const storedToken = localStorage.getItem("admin_token");

    if (storedToken) {
      const stringWithoutQuotes = storedToken.replace(/"/g, "");
      fetchRecruiterJobTitle(stringWithoutQuotes);
    } else {
      // setIsLoading(false);
    }
  }, [jobTitle]);


  const [showjobTitleSuggestions, setShowjobTitleSuggestions] = useState(false);
  const handlejobtitleSelect = (selectedjobTitle) => {
    // console.log("Job Title:", selectedjobTitle);
    setJobTitle(selectedjobTitle); // Set legal_name to the same value
    setShowjobTitleSuggestions(false);
    setIsOpenft(!isOpenft);
  };

  const inputReft = useRef(null);

  const [isOpenft, setIsOpenft] = useState(false);
  const toggleDropt = () => {
    setIsOpenft(!isOpenft);
  };

  return (
    <div className="w-full App font-inter mt-[80px]">
      <div
        className={"lg:flex md:flex   hidden lg:block justify-center"}
      >
        <div
          className={" pb-20 pt-7"}
        >
          <div className="lg:w-[700px] bg-white  pb-5 border border-[2px] rounded rounded-[10px] p-7">
            <div>
              <div className="flex justify-between">
                <img
                  onClick={handleGoBack}
                  className="cursor-pointer"
                  src="/images/tircompany.svg"
                />

              </div>
            </div>

            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-4">
                  <div className="flex justify-between relative items-center border h-[45px] border-[#212427] border-opacity-80 px-5 rounded ">
                    <div className="flex gap-x-2 items-center">
                      <h3 className="text-[#212427] text-[17px] font-medium">
                        Post a
                      </h3>
                      <p className="text-[#212427] text-[17px] font-medium">
                        {jobeTypename}
                      </p>

                      <h3 className="text-[#212427] text-[17px] font-medium">
                        Job
                      </h3>
                    </div>

                    <div className="" ref={inputRef}>
                      <div className="flex items-center gap-x-2">
                        <img
                          onClick={toggleDrop}
                          className="cursor-pointer w-[17px] h-[13px]"
                          src={e}
                        />
                        <p
                          onClick={toggleDrop}
                          className="text-[#212427] text-[16px] font-normal cursor-pointer"
                        >
                          Switch Job Type
                        </p>
                      </div>

                      <div className=" absolute z-40 mt-3 ">
                        {jobTypeModalOpen && (
                          <div className="shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] bg-white rounded w-[190px] h-[210px] pb-3 pt-2  overflow-auto">
                            {jobType.length>0 && jobType.map((job) => (
                              <div
                                key={job._id}
                                onClick={() => {
                                  
                                  handelGetJobType(job.worktype, job._id);
                                }}
                                className="suggestion-item "
                              >
                                <div className="hover:bg-[#0077B5] hover:text-white mt-2 pl-5">
                                  <p className="text-[16px] text-[#212427] hover:text-white text-opacity-90 mb-2 cursor-pointer  mx-3">
                                    {job.worktype}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div></div>

                <div className="my-6" onClick={toggleDropt}>
                  <p className="text-[#212427] text-opacity-80 text-[16px] font-light ">
                    Job Ttitle
                  </p>
                  <input
                    ref={inputReft}
                    placeholder="e.g: Front-end Developer"
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)} // Update legal_name when input changes
                    onFocus={() => setShowjobTitleSuggestions(true)}
                    onBlur={() => setShowjobTitleSuggestions(false)}
                    required
                    className="focus:outline-none placeholder: text-[16px] font-normal placeholder: text-[#212427] input  w-full mb-[5px] h-[40px] border border-[#212427] border-opacity-70 rounded pl-3"
                  />
                  <div>
                    <div className="ml-[50px] absolute z-40">
                      {isOpenft && (
                        <div className="shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] bg-white rounded w-[250px] h-[300px] pb-3 pt-2  overflow-auto">
                          {jobTitleSugg.map((jbti) => (
                            <div
                              key={jbti._id}
                              onClick={() => {
                                // jbtinsole.log(
                                //   "Suggestion Clicked:",
                                //   jbti.functionalname
                                // );
                                handlejobtitleSelect(jbti.functionalname);
                              }}
                              className="suggestion-item "
                            >
                              <div className="hover:bg-[#0077B5] hover:text-white">
                                <p className="text-[16px] mb-2 cursor-pointer  mx-3">
                                  {jbti.functionalname}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-3 relative">
                  <p className="text-[#212427] text-opacity-80 text-[16px] font-light ">
                    Expertise Area
                  </p>

                  {experticeArea === "" ? (
                    <p
                      onClick={() => setexperticeAreaModalOpen(true)}
                      className="text-[16px] text-[#212427] text-opacity-80 font-normal cursor-pointer"
                    >
                      e.g: JavaScript
                    </p>
                  ) : (
                    <p
                      onClick={() => setexperticeAreaModalOpen(true)}
                      className="text-[16px] text-[#212427] font-medium cursor-pointer "
                    >
                      {experticeArea}
                    </p>
                  )}
                  <img
                    onClick={() => setexperticeAreaModalOpen(true)}
                    src="/images/companyIIn.svg"
                    className="absolute cursor-pointer inset-y-0 right-3 top-[45px] transform -translate-y-1/2 h-[15px] w-[15px] "
                  />

                  <div>
                    {experticeAreaModalOpen && (
                      <div className="map-modal">
                        <ExperticeAreaSelectForJobPost
                          setexperticeAreaModalOpen={setexperticeAreaModalOpen}
                          setexperticeArea={setexperticeArea}
                          setexperticeAreaID={setexperticeAreaID}
                          experticeArea={experticeArea}
                          setexperticeAreaCatagoryID={
                            setexperticeAreaCatagoryID
                          }
                          experticeAreaCatagoryID={experticeAreaCatagoryID}
                        ></ExperticeAreaSelectForJobPost>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-6 relative">
                  <p className="text-[#212427] text-opacity-80 text-[16px] font-light ">
                    Job Descriptions
                  </p>

                  {jobdeceriptionHtml === "" ? (
                    <p
                      onClick={() => setjobdecriptionModalOpen(true)}
                      className=" text-[#212427] text-[16px] font-normal cursor-pointer"
                    >
                      Describe key responsibilities, skills & oth...
                    </p>
                  ) : (
                    <p
                      onClick={() => setjobdecriptionModalOpen(true)}
                      className="text-opacity- text-[#212427] text-[16px] font-medium"
                    
                      // dangerouslySetInnerHTML={{
                      //   __html: jobdeceriptionHtml.length > 25
                      //     ? jobdeceriptionHtml.slice(0, 25) + "....."
                      //     : jobdeceriptionHtml
                      // }}
                      
                    >
                     { jobdeceriptionHtml.length > 25
                          ? jobdeceriptionHtml.slice(0, 25) + "....."
                          : jobdeceriptionHtml}
                    </p>
                  )}

                  <img
                    onClick={() => setjobdecriptionModalOpen(true)}
                    src="/images/companyIIn.svg"
                    className="absolute cursor-pointer inset-y-0 right-3 top-[43px] transform -translate-y-1/2 h-[15px] w-[15px] "
                  />
                  <div>
                    {jobdecriptionModalOpen && (
                      <div>
                        <JobDecription
                          setjobdecriptionModalOpen={setjobdecriptionModalOpen}
                          setjobdeceription={setjobdeceription}
                          jobdeceription={jobdeceription}
                          jobdeceriptionHtml={jobdeceriptionHtml}
                          setjobdeceriptionHtml={setjobdeceriptionHtml}
                        ></JobDecription>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-[#212427] text-opacity-80 text-[16px] font-light ">
                    Job Requirements
                  </p>
                  <div className="h-[70px] bg-white border border-[#212427] border-opacity-20 rounded rounded-[5px] ">
                    <div className="flex justify-around  mt-2">
                      <div className="flex justify-center relative">
                        <div className="" ref={inputRef}>
                          <p className="text-[16px] font-light text-[#212427] text-center">
                            Experience
                          </p>
                          <p
                            onClick={toggleDropExprience}
                            className="text-[14px] font-normal text-[#212427] text-opacity-70 mt-1 text-center cursor-pointer"
                          >
                            {expriences === "" ? (
                              <p
                                onClick={toggleDropExprience}
                                className="text-[14px] font-normal text-[#212427] text-opacity-70 mt-1 text-center cursor-pointer"
                              >
                                Select
                              </p>
                            ) : (
                              <p className="text-[14px] font-normal text-[#212427] mt-1 text-center cursor-pointer">
                                {expriences}
                              </p>
                            )}
                          </p>
                          <div className="-ml-[50px] absolute z-40 mt-[15px]">
                            {expriencesModalOpen && (
                              <div className="shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] bg-white rounded w-[220px] h-[210px] pb-3 pt-2  overflow-auto">
                                {expriencesdata.length > 0 && expriencesdata.map((exprien) => (
                                  <div
                                    key={exprien._id}
                                    onClick={() => {
                                    
                                      handelExprienceType(
                                        exprien.name,
                                        exprien._id
                                      );
                                    }}
                                    className="suggestion-item "
                                  >
                                    <div className="hover:bg-[#0077B5] hover:text-white mt-2 pl-5">
                                      <p className="text-[16px] text-[#212427] hover:text-white  mb-2 cursor-pointer  mx-3">
                                        {exprien.name}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div
                        className="flex justify-center relative "
                        ref={inputRef}
                      >
                        <div>
                          <p className="text-[16px] font-light text-[#212427] text-center">
                            Education
                          </p>
                          <p
                            onClick={toggleDropEducation}
                            className="text-[14px] font-normal text-[#212427] text-opacity-70 mt-1 text-center cursor-pointer"
                          >
                            {education === "" ? (
                              <p
                                onClick={toggleDropEducation}
                                className="text-[14px] font-normal text-[#212427] text-opacity-70 mt-1 text-center cursor-pointer"
                              >
                                Select
                              </p>
                            ) : (
                              <p className="text-[14px] font-normal text-[#212427] mt-1 text-center cursor-pointer">
                                {education}
                              </p>
                            )}
                          </p>
                        </div>
                        <div className="mt-[65px]">
                          <div className="-ml-[100px] absolute z-40">
                            {educationModalOpen && (
                              <div className="shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] bg-white rounded w-[220px] h-[210px] pb-3 pt-2  overflow-auto ">
                                {educationData.map((edu) => (
                                  <div
                                    key={edu._id}
                                    onClick={() => {
                                    
                                      handeleducationType(edu.name, edu._id);
                                    }}
                                    className="suggestion-item "
                                  >
                                    <div className="hover:bg-[#0077B5] hover:text-white mt-2 pl-5">
                                      <p className="text-[16px] text-[#212427] hover:text-white mb-2 cursor-pointer  mx-3">
                                        {edu.name}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <div>
                          <p className="text-[16px] font-light text-[#212427] text-center">
                            Salary
                          </p>

                          <p
                            onClick={() => setsalaryModalOpen(true)}
                            className="text-[14px] font-normal text-[#212427] text-opacity-70 mt-1 text-center cursor-pointer"
                          >
                            {minsalary === "" && maxsalary === "" ? (
                              <p
                                onClick={() => setsalaryModalOpen(true)}
                                className="text-[14px] font-normal text-[#212427] text-opacity-70 mt-1 text-center cursor-pointer"
                              >
                                Select
                              </p>
                            ) : (
                              <>
                                {" "}
                                <p className="text-[14px] font-normal text-[#212427] mt-1 text-center cursor-pointer">
                                  {minsalary}
                                  {minsalary === "Negotiable" ? "" : "K"}-
                                  {maxsalary}
                                  {maxsalary === "Negotiable" ? "" : "K"} BDT
                                </p>
                              </>
                            )}
                          </p>

                          <div>
                            {salaryModalOpen && (
                              <JobSalarey
                                setsalaryModalOpen={setsalaryModalOpen}
                                setmaxsalary={setmaxsalary}
                                maxsalary={maxsalary}
                                setmaxsalaryID={setmaxsalaryID}
                                maxsalaryID={maxsalaryID}
                                setminsalary={setminsalary}
                                minsalary={minsalary}
                                setminsalaryID={setminsalaryID}
                                minsalaryID={minsalaryID}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="mt-8 relative">
                    <p className="text-[#212427] text-opacity-80 text-[16px] font-light ">
                      Required Location
                    </p>
                    <input
                      placeholder=""
                      type="text"
                      value={
                        locationName === ""
                          ? companyValue?.c_location?.formet_address
                          : locationName
                      }
                      className="focus:outline-none placeholder:text-[16px] placeholder:text-opacity-80 text-opacity-80 text-[16px] placeholder:text-[#212427] text-[#212427] pl-0   placeholder:font-medium font-medium border-white  input  w-full mb-[5px] h-[30px] border border-[2px] rounded "
                    />
                    {openLocationDropdown === true ? (
                      <>
                        <img
                          onClick={() => setOpenLocationDropdown(false)}
                          src="/images/companyIIn.svg"
                          className="absolute -rotate-90 cursor-pointer inset-y-0 right-3 top-[43px] transform -translate-y-1/2 h-[15px] w-[15px] "
                        />{" "}
                      </>
                    ) : (
                      <>
                        <img
                          onClick={() => setOpenLocationDropdown(true)}
                          src="/images/companyIIn.svg"
                          className="absolute rotate-90 cursor-pointer inset-y-0 right-3 top-[43px] transform -translate-y-1/2 h-[15px] w-[15px] "
                        />{" "}
                      </>
                    )}
                  </div>

                  <div className=" absolute z-20 mt-3 w-full bg-white">
                    {openLocationDropdown === true && (
                      <div className="border border-[#212427] border-opacity-70 rounded py-2 px-1">
                        <div>
                          <div className="relative w-full  ">
                            <p className="text-[14px] fonrmal text-[#212427]  absolute left-3 top-1 ">
                              Job Location
                            </p>
                            <div className="" onClick={handleInputClick}>
                              <input
                                placeholder="Select location from the google map"
                                type="text"
                                // value={selectedLocation ? `Lat: ${selectedLocation.lat}, Lng: ${selectedLocation.lng}` : ''}
                                value={
                                  locationName === ""
                                    ? companyValue?.c_location?.formet_address
                                    : locationName
                                }
                                className="focus:outline-none cursor-pointer placeholder:text-[#212427]  placeholder:text-opacity-70  input pl-3 pt-4 w-full mb-[5px] h-[60px] "
                              />

                              {locationName === "" ? (
                                <>
                                  <img
                                    src="/images/companyIIn.svg"
                                    className="absolute cursor-pointer inset-y-0 right-3 top-2/3 transform -translate-y-1/2 h-[15px] w-[15px] "
                                  />
                                </>
                              ) : (
                                <>
                                  {" "}
                                  <img
                                    src="/images/companyLoI.svg"
                                    className="absolute  right-3 bottom-5    h-[15px] w-[15px] "
                                  />
                                </>
                              )}
                            </div>
                            {isModalOpenJobLocation && (
                              <div className="map-modal">
                                <JobLocationModal
                                  google={google}
                                  handleMapClick={handleMapClick}
                                  selectedLocation={selectedLocation}
                                  setIsModalOpenJobLocation={
                                    setIsModalOpenJobLocation
                                  }
                                  setSelectedLocation={setSelectedLocation}
                                  setLocationName={setLocationName}
                                ></JobLocationModal>
                              </div>
                            )}
                          </div>
                          <img
                            src="/images/companyLoI.svg"
                            className="absolute  right-3 bottom-5    h-[15px] w-[15px] "
                          />
                        </div>
                        <div className="relative w-full ">
                          <p className="text-[14px] fonrmal text-[#212427]  absolute left-3 top-1 ">
                            Job Addess (Optional) 0/100
                          </p>
                          <div className="">
                            <input
                              placeholder="House, Road"
                              type="text"
                              maxLength={100}
                              {...register("locationoptional", {
                                required: "Company Addess is Required",
                              })}
                              defaultValue={
                                locationoptional === ""
                                  ? companyValue?.c_location?.locationoptional
                                  : locationoptional
                              }
                              onChange={(e) =>
                                setlocationoptional(e.target.value)
                              }
                              className="focus:outline-none placeholder:text-[#212427]  placeholder:text-opacity-70  input pl-3 pt-4 w-full mb-[5px] h-[60px] "
                            />
                            {errors.locationoptional && (
                              <p className="text-red-500">
                                {errors.locationoptional.message}
                              </p>
                            )}
                          </div>

                          {locationoptional === "" ? (
                            <>
                              <img
                                src="/images/wright.svg"
                                className="absolute cursor-pointer inset-y-0 right-3 top-2/3 transform -translate-y-1/2 h-[15px] w-[15px] "
                              />
                            </>
                          ) : (
                            <>
                              <img
                                src="/images/companyLoI.svg"
                                className="absolute  right-3 bottom-5    h-[15px] w-[15px] "
                              />
                            </>
                          )}
                        </div>
                        <div className="pb-2">
                          <p className="text-[14px] fonrmal text-[#212427]  ml-3  ">
                            Select City
                          </p>
                          <div className="relative w-full">
                            <div className="" onClick={handleLocationClick}>
                              {selectedClickDivision === "" ||
                              companyValue?.c_location?.divisiondata
                                ?.divisionname === null ? (
                                <>
                                  <p className="w-full cursor-pointer mt-[2px] h-[20px] text-[#212427] text-opacity-70 ml-3">
                                    Damrai, Dhaka
                                  </p>
                                </>
                              ) : (
                                <>
                                  <p className="w-full cursor-pointer mt-[2px] h-[20px] text-[#212427] ml-3">
                                    {selectedClickDivision === ""
                                      ? `${companyValue?.c_location?.divisiondata?.divisionname}, ${companyValue?.c_location?.divisiondata?.cityid?.name}`
                                      : selectedClickDivision
                                      ? `${selectedClickDivision}, ${selectedcityname}`
                                      : selectedcityname}
                                  </p>
                                </>
                              )}
                            </div>

                            {selectedClickDivision === "" ? (
                              <>
                                <img
                                  onClick={handleLocationClick}
                                  src="/images/companyIIn.svg"
                                  className="absolute cursor-pointer inset-y-0 right-3 top-2/3 transform -translate-y-1/2 h-[15px] w-[15px] "
                                />
                              </>
                            ) : (
                              <>
                                {" "}
                                <img
                                  onClick={handleLocationClick}
                                  src="/images/companyLoI.svg"
                                  className="absolute  right-3 bottom-5  top-[5px]  h-[15px] w-[15px] "
                                />
                              </>
                            )}
                          </div>
                          {locationopen && (
                            <div className="map-modal">
                              <CompanyLocation
                                selectedClickDivision={selectedClickDivision}
                                selectedcityname={selectedcityname}
                                setSelectedcityname={setSelectedcityname}
                                setSelectedcityID={setSelectedcityID}
                                setSelectedClickDivision={
                                  setSelectedClickDivision
                                }
                                setSelectedClickDivisionID={
                                  setSelectedClickDivisionID
                                }
                                setLocationOpen={setLocationOpen}
                              ></CompanyLocation>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-[#212427] text-opacity-80 text-[16px] font-light ">
                    Set Various Skills (Optional)
                  </p>

                  <div className="w-full flex flex-wrap gap-3 mt-2">
                    {/* {skill.map((s, index) => (
                      <div key={index} className="flex gap-x-1">
                        <div className="flex items-center h-[30px]  text-[#212427] text-[16px] text-opacity-90 border border-[#212427] border-opacity-40 rounded rounded-[25px] px-2">
                          <div className=" flex gap-x-2  items-center">
                            <p>{s}</p>
                            <img
                              className="w-[13px] h-[13px] cursor-pointer"
                              onClick={() => handleRemoveSkill(index)} // Call handleRemoveSkill with the index
                              src="/images/skillremove.svg"
                            />
                          </div>
                        </div>
                      </div>
                    ))} */}
                  </div>
                  {defaultSkill.length > 0 ? (
                    <>
                      <div className="w-full flex flex-wrap gap-3 mt-2 mb-1">
                        {skilltype.map((s, index) => (
                          <div key={index} className="flex gap-x-1">
                            <div className="flex items-center h-[30px] font-normal text-[#0077B5] border-blue-500 text-[16px] text-opacity-90 border  border-opacity-40 rounded rounded-[25px] px-2">
                              <div className=" flex gap-x-2  items-center">
                                <p>{s}</p>
                                <img
                                  className="w-[13px] h-[13px] cursor-pointer"
                                  onClick={() => handleRemoveSkill(s)} // Call handleRemoveSkill with the index
                                  src="/images/skillremove.svg"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                        {defaultSkill?.map((ds) => (
                          <div key={ds._id} className="flex gap-x-1">
                            <p
                              className={`flex items-center h-[30px] text-[16px] font-normal border border-[#212427] border-opacity-40 rounded rounded-[25px] px-2 cursor-pointer ${
                                skill.includes(ds.functionalname)
                                  ? "text-[#0077B5] border-blue-500"
                                  : ""
                              }`}
                              onClick={() => {
                                if (skill.includes(ds.functionalname)) {
                                  handleRemoveSkills(ds.functionalname);
                                } else {
                                  handleAddDefaultSkill(ds.functionalname);
                                }
                              }}
                            >
                              {ds.functionalname}

                              {skill.includes(ds.functionalname) && (
                                <img
                                  className="w-[13px] h-[13px] cursor-pointer ml-2"
                                  // Call handleRemoveSkill with the index
                                  src="/images/skillremove.svg"
                                />
                              )}
                            </p>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  <div className="flex justify-end">
                    <p className="text-blue-500 text-[16px] font-medium">
                      {skillCountText}
                    </p>
                    <p className="text-[#212427] text-[16px] font-medium">/5</p>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="w-[110px] h-[30px] text-[#212427] text-[16px] border font-normal border-[#212427] border-opacity-40 rounded rounded-[25px] px-1 -mt-[20px]"
                  >
                    Add Skills +
                  </button>

                  {skillModalOpen && (
                    <AddSkill
                      setskillModalOpen={setskillModalOpen}
                      setSkill={setSkill}
                      setskilltype={setskilltype}
                      skilltype={skilltype}
                      skill={skill}
                      experticeAreaCatagoryID={experticeAreaCatagoryID}
                    ></AddSkill>
                  )}

                  {showErrorPopup && (
                    <SkillAddError
                      setShowErrorPopup={setShowErrorPopup}
                    ></SkillAddError>
                  )}
                </div>
                <div className="my-7">
                  <p className="text-[#212427] text-opacity-60 text-[16px] font-normal ">
                    <span className="text-[#212427]">Note:</span> The job type,
                    job title, and expertise area can’t be changed once the job
                    posting is submitted.
                  </p>
                </div>
                <div className="flex justify-between items-center mb-7">
                  <div className="flex gap-x-3">
                    <img src="/images/joblocationremote.svg" />
                    <p className="text-[#212427]  text-[16px] font-medium">
                      This is a remote job
                    </p>
                  </div>
                  <div>
                    {/* Your complex checkbox input with classes */}
                    <input
                      className="mr-2 mt-[0.3rem] h-3.5 w-10 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-blue-500 checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.2985rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                      type="checkbox"
                      role="switch"
                      //   onClick={onChangeRemote}
                      checked={remote}
                      onChange={onChangeRemote}
                    />{" "}
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full mb-5 h-[44px]  bg-[#00A0DC] bg-opacity-40 text-[18px] text-[#212427] mt-5 font-semibold hover:bg-[#0077B5] hover:text-white rounded text-center "
                >
                  Post Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Responsive */}

      <div className="flex justify-center block lg:hidden bg-white">
        <div>
          <div className="mx-[10px] w-[360px]">
            <div className="flex justify-around">
              <img
                className="w-[24px] h-[24px] -ms-12 cursor-pointer"
                src={a}
                alt=""
              />
              <p className="text-[#00A0DC] underline text-[14px]">Need Help?</p>
              <button className="w-[58px] h-[28px] bg-[#1C4B81] text-white border border-1 rounded-md text-center text-[16px]">
                Save
              </button>
            </div>
            <div>
              <p className="text-[#212427] text-[22px] font-semibold mt-4">
                Post a Full Time Job
              </p>
              <div className="flex gap-2">
                <img className="w-[16px] h-[16px]" src={b} alt="" />
                <p className="text-[#212427] text-opacity-80 text-[14px]">
                  Switch Job Type
                </p>
              </div>
              <div>
                <div className="mb-2 px-2 pb-2">
                  <p className="text-[#454545] text-[14px] mt-4">Job Title</p>
                  <div className="flex justify-between">
                    <p className="text-[#212427] text-opacity-90 text-[16px] font-semibold">
                      Add job title
                    </p>
                    <img
                      className="w-[12px] h-[12px] cursor-pointer"
                      src={c}
                      alt=""
                    />
                  </div>
                </div>
                <div className="mb-2 px-2 pb-2">
                  <p className="text-[#454545] text-[14px]">Expertise Area</p>
                  <div className="flex justify-between">
                    <p className="text-[#212427] text-opacity-90 text-[16px] font-semibold">
                      UI/UX Designer
                    </p>
                    <img
                      className="w-[12px] h-[12px] cursor-pointer"
                      src={c}
                      alt=""
                    />
                  </div>
                </div>
                <div className="mb-2 px-2 pb-2">
                  <p className="text-[#454545] text-[14px]">Job Descriptions</p>
                  <div className="flex justify-between">
                    <p className="text-[#212427] text-opacity-90 text-[16px] font-semibold">
                      Describe key responsibilities, skills & oth...
                    </p>
                    <img
                      className="w-[12px] h-[12px] cursor-pointer"
                      src={c}
                      alt=""
                    />
                  </div>
                </div>
                <div className="mb-2 px-2 pb-2">
                  <p className="text-[#454545] text-[14px]">Job Requirements</p>
                  <div className="flex justify-around border border-1 rounded-md p-2 mt-2">
                    <div className="flex flex-col">
                      <p className="text-[#212427] text-[14px] font-semibold">
                        Experience
                      </p>
                      <p className="text-[#212427] text-opacity-90 text-[14px]">
                        Select
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-[#212427] text-[14px] font-semibold">
                        Education
                      </p>
                      <p className="text-[#212427] text-opacity-90 text-[14px]">
                        Select
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-[#212427] text-[14px] font-semibold">
                        Salary
                      </p>
                      <p className="text-[#212427] text-opacity-90 text-[14px]">
                        Select
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 mb-2 px-2 pb-2">
                    <p className="text-[#454545] text-[14px]">
                      Required Location
                    </p>
                    <div className="flex justify-between">
                      <p className="text-[#212427] text-opacity-90 text-[14px] font-semibold">
                        House 25, Road 04, Sector 10, Uttara, Dhaka
                      </p>
                      <img
                        className="w-[12px] h-[12px] cursor-pointer"
                        src={c}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="mb-2 px-2 pb-2">
                    <p className="text-[#454545] text-[14px]">
                      Required Skills (optional)
                    </p>
                    <div className="flex justify-between">
                      <p className="text-[#212427] text-opacity-90 text-[16px] font-semibold">
                        Set Various Skills
                      </p>
                      <img
                        className="w-[12px] h-[12px] cursor-pointer"
                        src={c}
                        alt=""
                      />
                    </div>
                  </div>
                  <p className="text-[#212427] text-opacity-60 text-[14px] ps-1">
                    Note: The job type, job title, and expertise area can’t be
                    changed once the job posting is submitted.
                  </p>
                  <div className="flex justify-around my-3">
                    <img
                      className="w-[26px] h-[26px]cursor-pointer -ms-6"
                      src={d}
                      alt=""
                    />
                    <p className="text-[#212427] text-opacity-90 text-[16px]">
                      This is a remote job
                    </p>
                    <input
                      className="mr-2 mt-[0.3rem] h-3.5 w-10 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-blue-500 checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.2985rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                      type="checkbox"
                      role="switch"
                      //   onClick={onChangeRemote}
                      checked={remote}
                      onChange={onChangeRemote}
                    />
                  </div>
                  <div className="m-4">
                    <button className="bg-[#1C4B81] w-[330px] h-[48px] border border-1 rounded-lg text-white text-[16px] text-center">
                      Post Now
                    </button>
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

export default RecruterJobpost;
