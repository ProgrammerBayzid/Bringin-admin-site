import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import CompanyIndustryModal from "./CompanyIndustryModal";
import CompanySizeModal from "./CompanySizeModal";
import LocationModal from "./LocationModal";
import CompanyLocation from "./CompanyLocation";
import RecruterCompanyRegiserSuccessModal from "./RecruterCompanyRegiserSuccessModal";
const RecruterCompanyRegister = ({ google , modalData}) => {
    const id = modalData._id;
    const [recruter, setrecruter] = useState([]);

    const fetchData = () => {
      fetch(`https://rsapp.unbolt.co/clint_recruiters_profile/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setrecruter(data);
          // console.log(data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    };
    useEffect(() => {
      // Initial data fetch when component mounts
      fetchData();
    }, [id]);
    const companyValue = recruter?.companyname;

    const {
      register, 
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm();
   const [isModalOpen, setIsModalOpen] = useState(false);
   const handleInputClick = () => {
     setIsModalOpen(true);
   };
   const [ropenModal, rcloseModal] = useState(false);

   const handleMapClick = (mapProps, map, clickEvent) => {
     const lat = clickEvent.latLng.lat();
     const lng = clickEvent.latLng.lng();
     setSelectedLocation({ lat, lng });
     setLocationName(""); // Clear location name when clicking on the map
     console.log(`Latitude: ${lat}, Longitude: ${lng}`); // Log lat and lng
   };
   const [isOpenc, setIsOpenc] = useState(false);
   const toggleDrop = () => {
    setIsOpenc(!isOpenc);
  };
  const [company, setCompany] = useState([]);
  const [clegal_name, setcLegalName] = useState("");

  useEffect(() => {
    fetch(`https://rsapp.unbolt.co/seekercompany?name=${clegal_name}`)
      .then((res) => res.json())
      .then((data) => {
        setCompany(data);
        // console.log(data);
      });
  }, [clegal_name]);
  const [showfuntionalareasSuggestions, setShowfuntionalareasSuggestions] =
  useState(false);

const handleCompanySelect = (selectedfuntionalareas) => {
  console.log("Selected Location:", selectedfuntionalareas);
  setcLegalName(selectedfuntionalareas); // Set legal_name to the same value
  setShowfuntionalareasSuggestions(false);
  setIsOpenc(!isOpenc);
};
const inputRef = useRef(null);

useEffect(() => {
  // Event listener function to close the dropdown when clicking outside
  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      // Click occurred outside of the input element
      setIsOpenc(false);
    }
  };

  // Attach the event listener to the document body
  document.body.addEventListener("click", handleClickOutside);

  // Clean up the event listener when the component unmounts
  return () => {
    document.body.removeEventListener("click", handleClickOutside);
  };
}, []);
 // company devision

 const [location, setLocation] = useState([]);

 useEffect(() => {
   fetch("https://rsapp.unbolt.co/admin/location")
     .then((res) => res.json())
     .then((data) => {
       setLocation(data);
       // console.log(data);
     });
 }, []);

 const [locationopen, setLocationOpen] = useState(false);
 const handleLocationClick = () => {
   setLocationOpen(true);
 };
 const [selectedcityname, setSelectedcityname] = useState("");
 const [selectedClickDivision, setSelectedClickDivision] = useState("");
 const [selectedClickDivisionID, setSelectedClickDivisionID] = useState(null);
 // console.log("selectedcityname", selectedcityname);
 // console.log(selectedcityID);
 // console.log(selectedClickDivision);
 // console.log(selectedClickDivisionID);

 // Company industry

 const [industryopen, setindustryOpen] = useState(false);
 const handleindustryClick = () => {
   setindustryOpen(true);
 };

 const [selectedClickcatagory, setSelectedClickcatagory] = useState("");

 const [selectedIndustryname, setSelectedIndustryname] = useState(null);
 const [selectedIndustryID, setSelectedIndustryID] = useState(null);
 const [companySize, setcompanySize] = useState("");
 const [sizeOpen, setSizeOpen] = useState(false);
 console.log(companySize);
 const [sort_name, setSortName] = useState("");
 const [c_website, setc_website] = useState("");
 const [selectedClickcatagoryID, setSelectedClickcatagoryID] = useState(null);
 const [selectedLocation, setSelectedLocation] = useState(null);
 const [locationName, setLocationName] = useState("");
 const [locationoptional, setlocationoptional] = useState("");
 const [selectedcityID, setSelectedcityID] = useState(null);
 const [companySizeId, setcompanySizeId] = useState(null);
 // console.log("si",companySizeId);
 console.log(selectedClickcatagoryID);

 const onSubmit = () => {
    const postData = {
      userid: id,
      legal_name: clegal_name ||  companyValue?.legal_name ,
      sort_name: sort_name ||  companyValue?.sort_name,
      industry:
        selectedClickcatagoryID ||
        ( companyValue &&  companyValue?.industry?._id),
      c_size: companySizeId || ( companyValue &&  companyValue?.c_size?._id),
      c_location: {
        lat: selectedLocation
          ? selectedLocation.lat
          : null ||  companyValue?.c_location?.lat,
        lon: selectedLocation
          ? selectedLocation.lng
          : null ||  companyValue?.c_location?.lon,
        formet_address:
          locationName ||  companyValue?.c_location?.formet_address,
        locationoptional:
          locationoptional ||  companyValue?.c_location?.locationoptional, // Add locationoptional if needed
        divisiondata:
          selectedClickDivisionID ||  companyValue?.c_location?.divisiondata,
      },
      c_website: c_website ||  companyValue?.c_website, // Replace with your website dataa
    };
    console.log(postData);

    const token = localStorage.getItem("admin_token");
    const tokenWithoutQuotes = token.replace(/"/g, "");

    fetch(`http://localhost:3002/adminPanel_company_register/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenWithoutQuotes}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP Error! Status: ${res.status}`);
        }
        return res.text(); // Read the response as text
      })
      .then((result) => {
        console.log("Response Body:", result); // Log the response body
        rcloseModal(true);
        fetchData()
        console.log("open");
        try {
          const jsonResponse = JSON.parse(result); // Attempt to parse as JSON
          console.log(jsonResponse);
          
          
          
          // ...rest of your code
        } catch (jsonError) {
          console.error("JSON Parsing Error:", jsonError);
        }
      })
      .catch((error) => {
        console.error("Error uploading data:", error);
      });
  };

  useEffect(() => {
    // Assuming profileData and recruter are fetched asynchronously
    if (companyValue !== null) {
      // Set the default values here
      // Set the default values here using setValue
      setValue("legal_name", clegal_name || companyValue?.legal_name);
      setValue("sort_name", sort_name || companyValue?.sort_name);

      setValue("c_website", c_website || companyValue?.c_website);
      setValue(
        "formet_address",
        locationName || companyValue?.c_location?.formet_address
      );
      setValue(
        "locationoptional",
        locationoptional || companyValue?.c_location?.locationoptional
      );
    }
  }, [companyValue]);
    return (
        <div>
             <div className="lg:w-[700px] bg-white lg:h-auto border border-[#212427] border-opacity-20 rounded rounded-[10px] px-7">
             <div>
            <div >
                    <div className="">
                      <div className="mx-auto ">
                      <h1 className="text-[22px] font-bold  text-center text-opacity-90 text-[#212427] pt-9">
                        Register Your Company
                      </h1>
                      <p className="text-center text-[16px] text-[#212427]  font-normal">
                        Introduce your company to the candidates.
                      </p>
                      </div>
                    </div>
                    <div className="mb-7 mt-12">
                      <h1 className="text-[18px] font-semibold text-[#212427] text-opacity-90">
                        Company Legal Name
                      </h1>
                      <h5 className="text-[14px] font-normal text-[#212427] text-opacity-60">
                        Please provide the full legal name of your company
                        exactly as it appears on official documents.
                      </h5>
                    </div>

                    <div className="mb-5">
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                          <div className="relative w-full mb-1">
                            <img
                              src="/images/companyIL1.svg"
                              className="absolute inset-y-0 left-3 top-1/2 transform -translate-y-1/2 h-[25px] w-[25px] "
                            />
                            <div className="" onClick={toggleDrop}>
                              <input
                                ref={inputRef}
                                placeholder="Bringin Technologies Limited"
                                type="text"
                                value={
                                  clegal_name ||
                                  ( companyValue &&  companyValue?.legal_name) 
                        
                                } // Set the input value to legal_name
                                onChange={(e) => setcLegalName(e.target.value)} // Update legal_name when input changes
                                onFocus={() =>
                                  setShowfuntionalareasSuggestions(true)
                                }
                                onBlur={() =>
                                  setShowfuntionalareasSuggestions(false)
                                }
                                className="focus:outline-none placeholder: text-[#212427] border-opacity-80 rounded font-normal text-[16px] placeholder:text-opacity-70 input pl-12 w-full mb-[5px] h-[44px] border border-[#212427] "
                                required=" legal_name is required"
                              />

                              {errors.legal_name && (
                                <p className="text-red-500">
                                  {errors.legal_name.message}
                                </p>
                              )}
                            </div>
                            {clegal_name !== "" ||
                              ( companyValue &&
                                 companyValue?.legal_name === null) ? (
                              <>
                                <img
                                  src="/images/companyIL2.svg"
                                  className="absolute inset-y-0 right-3 top-1/2 transform -translate-y-1/2 h-[16px] w-[16px] "
                                />
                              </>
                            ) : (
                              <>
                                <img
                                  src="/images/inputtik.svg"
                                  className="absolute inset-y-0 right-3 top-1/2 transform -translate-y-1/2 h-[16px] w-[16px] "
                                />
                              </>
                            )}
                          </div>

                          <div className="ml-[50px] absolute z-40">
                            {isOpenc && (
                              <div className="shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] bg-white rounded w-[250px] h-[300px] pb-3 pt-2  overflow-auto">
                                {company.map((co) => (
                                  <div
                                    key={co._id}
                                    onClick={() => {
                                      // console.log(
                                      //   "Suggestion Clicked:",
                                      //   co.functionalname
                                      // );
                                      handleCompanySelect(co.name);
                                    }}
                                    className="suggestion-item "
                                  >
                                    <div className="hover:bg-[#0077B5] hover:text-white">
                                      <p className="text-[16px] mb-2 cursor-pointer  mx-3">
                                        {co.name}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="mb-2 my-6">
                          <h1 className=" text-[16px] text-[#212427]  font-light  mb-1 ">
                            Short Name of Company
                          </h1>
                          <input
                            placeholder="Bringin"
                            type="text"
                            {...register("sort_name", {
                              required: "sort_name is Required",
                            })}
                            value={
                              sort_name ||
                              ( companyValue &&  companyValue?.sort_name)
                            }
                            onChange={(e) => setSortName(e.target.value)}
                            className="focus:outline-none placeholder:text-[#000000] font-normal text-[16px] border-opacity-80 rounded  input pl-3 w-full mb-[5px] h-[44px] border border-[#212427]"
                          />
                          {errors.sort_name && (
                            <p className="text-red-500">
                              {errors.sort_name.message}
                            </p>
                          )}
                        </div>
                        <div className="mb-3 my-7">
                          <h1 className=" text-[16px] text-[#212427]  font-light">
                            Field of Industry
                          </h1>

                          <div
                            className="relative w-full"
                            onClick={handleindustryClick}
                          >
                            <div className="">
                              { companyValue &&
                               companyValue.industry === null ||
                              selectedClickcatagory === "" ? (
                                selectedClickcatagory === "" ? (
                                  <p
                                    onClick={handleindustryClick}
                                    className="w-full mb-[0px] h-[20px] text-[#212427] text-opacity-70"
                                  >
                                    Informetion & Tecnalogy
                                  </p>
                                ) : (
                                  <p
                                    onClick={handleindustryClick}
                                    className="w-full mb-[0px] h-[20px] text-[#212427] text-opacity-90"
                                  >
                                    {selectedClickcatagory ||
                                      ( companyValue &&
                                         companyValue?.industry?.categoryname)}
                                  </p>
                                )
                              ) :  companyValue?.industry?.categoryname ===
                                  null && selectedClickcatagory === "" ? (
                                <p
                                  onClick={handleindustryClick}
                                  className="w-full mb-[0px] h-[20px] text-[#212427] text-opacity-70"
                                >
                                  Informetion & Tecnalogy
                                </p>
                              ) : (
                                <p
                                  onClick={handleindustryClick}
                                  className="w-full mb-[0px] h-[20px] text-[#212427] text-opacity-90"
                                >
                                  {selectedClickcatagory ||
                                    ( companyValue &&
                                       companyValue?.industry?.categoryname)}
                                </p>
                              )}
                            </div>
                            <img
                              onClick={handleindustryClick}
                              src="/images/companyIIn.svg"
                              className="absolute cursor-pointer inset-y-0 right-3 top-[11px] transform -translate-y-1/2 h-[15px] w-[15px] "
                            />
                          </div>
                          {industryopen && (
                            <div className="map-modal">
                              <CompanyIndustryModal
                                setSelectedIndustryname={
                                  setSelectedIndustryname
                                }
                                setSelectedClickcatagory={
                                  setSelectedClickcatagory
                                }
                                setSelectedIndustryID={setSelectedIndustryID}
                                setSelectedClickcatagoryID={
                                  setSelectedClickcatagoryID
                                }
                                selectedIndustryname={selectedIndustryname}
                                selectedClickcatagory={selectedClickcatagory}
                                setindustryOpen={setindustryOpen}
                              ></CompanyIndustryModal>
                            </div>
                          )}
                        </div>
                        <div className="mb-3">
                          <div
                            className=" relative w-full"
                            onClick={() => setSizeOpen(true)}
                          >
                            <h1 className=" text-[16px] text-[#212427]  font-light  mb-1 my-7">
                              Company Size
                            </h1>
                            { companyValue &&
                             companyValue.c_size === null ||
                            companySize === "" ? (
                              companySize === "" ? (
                                <p
                                  onClick={() => setSizeOpen(true)}
                                  className="w-full mb-[0px] h-[20px] text-[#212427] text-opacity-70"
                                >
                                  100-500
                                </p>
                              ) : (
                                <p
                                  onClick={() => setSizeOpen(true)}
                                  className="w-full mb-[0px] h-[20px] text-[#212427]"
                                >
                                  {companySize ||
                                    ( companyValue &&
                                       companyValue?.c_size?.size)}
                                </p>
                              )
                            ) :  companyValue?.c_size?.size === null &&
                              companySize === "" ? (
                              <p
                                onClick={() => setSizeOpen(true)}
                                className="w-full mb-[0px] h-[20px] text-[#212427] text-opacity-70"
                              >
                                100-500
                              </p>
                            ) : (
                              <p
                                onClick={() => setSizeOpen(true)}
                                className="w-full mb-[0px] h-[20px] text-[#212427]"
                              >
                                {companySize ||
                                  ( companyValue &&  companyValue?.c_size?.size)}
                              </p>
                            )}

                            <img
                              onClick={() => setSizeOpen(true)}
                              src="/images/companyIIn.svg"
                              className="absolute cursor-pointer inset-y-0 right-3 top-[41px] transform -translate-y-1/2 h-[15px] w-[15px] "
                            />
                          </div>
                          {sizeOpen && (
                            <div className="map-modal">
                              <CompanySizeModal
                                setcompanySize={setcompanySize}
                                setcompanySizeId={setcompanySizeId}
                                companySizeId={companySizeId}
                                companySize={companySize}
                                setSizeOpen={setSizeOpen}
                              ></CompanySizeModal>
                            </div>
                          )}
                        </div>
                        <div className="relative w-full mb-2 my-7">
                          <h1 className=" text-[16px] text-[#212427]  font-light  mb-1">
                            Company Website
                          </h1>
                          <input
                            placeholder="www.unbolt.co"
                            type="text"
                            value={
                              c_website ||
                              ( companyValue &&  companyValue.c_website)
                            }
                            onChange={(e) => setc_website(e.target.value)}
                            className="focus:outline-none text-[#000000] text-[16px] font-normal border-opacity-80 rounded input pl-3 w-full mb-[5px] h-[44px] border border-[#212427]"
                          />

                          {c_website !== "" ||
                            ( companyValue &&  companyValue.c_website !== null) ? (
                            <>
                              <img
                                src="/images/companyLoI.svg"
                                className="absolute right-3 bottom-5 h-[15px] w-[15px] "
                              />
                            </>
                          ) : (
                            <img
                              onClick={() => setSizeOpen(true)}
                              src="/images/wright.svg"
                              className="absolute cursor-pointer inset-y-0 right-3 top-2/3 transform -translate-y-1/2 h-[15px] w-[15px] "
                            />
                          )}
                        </div>

                        <div className="mb-2 mt-7">
                          <h1 className="text-[18px] font-semibold text-[#212427] text-opacity-90">
                            Company Location
                          </h1>
                          <h5 className="text-[14px] font-normal text-[#212427] text-opacity-70">
                            Mark the precise location of your company on Google
                            Maps and provide the complete address.
                          </h5>
                        </div>
                        <div className="border border-[#212427] border-opacity-70 rounded py-2 px-1">
                          <div>
                            <div className="relative w-full  ">
                              <p className="text-[14px] font-light text-[#212427]  absolute left-3 top-1 ">
                                Company Location
                              </p>
                              <div className="" onClick={handleInputClick}>
                                <input
                                  placeholder="Select location from the google map"
                                  type="text"
                                  // value={selectedLocation ? `Lat: ${selectedLocation.lat}, Lng: ${selectedLocation.lng}` : ''}
                                  value={
                                    locationName ||
                                    ( companyValue &&
                                       companyValue?.c_location?.formet_address)
                                  }
                                  className="focus:outline-none placeholder:text-[#212427] placeholder:text-opacity-70  input pl-3 pt-4 w-full mb-[5px] h-[60px] "
                                />

                                {locationName === "" ||
                                  ( companyValue &&
                                     companyValue?.c_location?.formet_address ===
                                    null) ? (
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
                              {isModalOpen && (
                                <div className="map-modal">
                                  <LocationModal
                                    google={google}
                                    handleMapClick={handleMapClick}
                                    selectedLocation={selectedLocation}
                                    setIsModalOpen={setIsModalOpen}
                                    setSelectedLocation={setSelectedLocation}
                                    setLocationName={setLocationName}
                                  ></LocationModal>
                                </div>
                              )}
                            </div>
                            <img
                              src="/images/companyLoI.svg"
                              className="absolute  right-3 bottom-5    h-[15px] w-[15px] "
                            />
                          </div>
                          <div className="relative w-full ">
                            <p className="text-[14px] font-light text-[#212427]  absolute left-3 top-1 ">
                              Company Address (Optional) 0/100
                            </p>
                            <div className="">
                              <input
                                placeholder="House, Road"
                                type="text"
                                maxLength={100}
                                {...register("locationoptional", {
                                //   required: "Company Address is Required",
                                })}
                                value={
                                  locationoptional ||
                                  ( companyValue &&
                                     companyValue?.c_location?.locationoptional)
                                }
                                onChange={(e) =>
                                  setlocationoptional(e.target.value)
                                }
                                className="focus:outline-none text-[#000000] text-[16px] font-normal  input pl-3 pt-4 w-full mb-[5px] h-[60px] "
                              />
                              {errors.locationoptional && (
                                <p className="text-red-500">
                                  {errors.locationoptional.message}
                                </p>
                              )}
                            </div>

                            {locationoptional === "" ||
                              ( companyValue &&
                                 companyValue?.c_location?.locationoptional ===
                                null) ? (
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
                                    <p className="w-full mt-[2px] h-[20px] text-[#212427] text-opacity-70 ml-3">
                                      Damrai, Dhaka
                                    </p>
                                  </>
                                ) : (
                                  <>
                                    <p className="w-full mt-[2px] h-[20px] text-[#212427]  ml-3">
                                      {selectedClickDivision === ""
                                        ? `${ companyValue?.c_location?.divisiondata?.divisionname}, ${ companyValue?.c_location?.divisiondata?.cityid?.name}`
                                        : selectedClickDivision
                                        ? `${selectedClickDivision}, ${selectedcityname}`
                                        : selectedcityname}
                                    </p>
                                  </>
                                )}
                              </div>

                              {selectedClickDivision === "" ||
                                selectedClickDivision === null ? (
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

                        <button
                          type="submit"
                          className="w-full mb-2 h-[44px] bg-[#00A0DC] bg-opacity-40 text-[18px] mt-5 font-semibold hover:bg-[#0077B5] hover:text-white rounded text-center"
                        >
                          Register
                        </button>
                      </form>
                    </div>
                  </div>
            </div>
             </div>
             <RecruterCompanyRegiserSuccessModal
        rvisible={ropenModal}
        rcloseModal={rcloseModal}
      ></RecruterCompanyRegiserSuccessModal>
        </div>
    );
};

export default RecruterCompanyRegister;