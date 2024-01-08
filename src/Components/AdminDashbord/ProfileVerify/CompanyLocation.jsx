import { useState } from "react";
import { useEffect } from "react";
import { ScaleLoader } from "react-spinners";

const CompanyLocation = ({
  setLocationOpen,
  setSelectedcityname,
  setSelectedcityID,
  setSelectedClickDivision,
  setSelectedClickDivisionID,
  selectedClickDivision,
  selectedcityname,
}) => {
  const [location, setLocation] = useState([]);
  const [loding, setloding] = useState(true);

  useEffect(() => {
    fetch("https://rsapp.unbolt.co/admin/location")
      .then((res) => res.json())
      .then((data) => {
        setLocation(data);
        setloding(false)
      });
  }, []);
  //   console.log(location);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedcity, setSelectedcity] = useState(null);
  //   const [selectedcityname, setSelectedcityname] = useState(null);
  //   const [selectedcityID, setSelectedcityID] = useState(null);
  //   const [selectedClickDivision, setSelectedClickDivision] = useState(null);
  //   const [selectedClickDivisionID, setSelectedClickDivisionID] = useState(null);

  const handleDivisionClick = (divisionname, id) => {
    setSelectedClickDivision(divisionname);
    setSelectedClickDivisionID(id);
  };

  const handleLocationClick = (lo, name, id) => {
    setSelectedcity(lo);
    setSelectedcityname(name);
    setSelectedcityID(id);
  };

  const handleremoveDivisionCity = () => {
    setSelectedcityname("");
    setSelectedcityID(null);
    setSelectedClickDivision("");
    setSelectedClickDivisionID(null);
    setLocationOpen(false);
  };
  const selectedCityDivisions =
    selectedcity !== null
      ? selectedcity.divisionid.filter((di) =>
          di.divisionname.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : [];


      useEffect(() => {
        // Trigger the click for the first element when the component mounts
        if (location.length > 0) {
          const firstIndustry = location[0];
          handleLocationClick(firstIndustry, firstIndustry.name, firstIndustry._id);
        }
      }, [location]);

  return (
    <div className="fixed inset-0 bg-[#E6E6E6] bg-opacity-90 flex justify-center items-center z-40 ">
      <div className="  bg-white  relative  w-[350px] h-[550px] lg:w-[584px] lg:h-[550px]   lg:p-0 md:p-0 p-2 rounded rounded-[10px]">
        <div className="px-3">
          <div className="my-5">
            <div className="flex justify-between">
              <img
                onClick={handleremoveDivisionCity}
                className="cursor-pointer"
                src="/images/tircompany.svg"
              />
              <h1 className="text-[18px] font-semibold text-[#212427] text-opacity-90 ">
                Preferred Location
              </h1>
              <button
                onClick={() => setLocationOpen(false)}
                className=" text-white bg-[#0077B5] h-[25px] w-[50px] text-[14px] rounded rounded-[5px]"
              >
                Save
              </button>
            </div>

            <h5 className="text-[14px] fonrmal text-[#212427] text-opacity-90 text-center">
              Select your preferred location to find nearby job opportunities.
            </h5>
          </div>
          {
            loding === true ? <div className="flex justify-center  mt-36"><ScaleLoader color="#365dd6" size="50" /></div> : 

            <>
            
          
          <div>

          <div className="px-5">
            <div className="relative w-full  ">
              <div className="">
                <input
                  placeholder="Search for cities/district/division"
                  type="text"
                  className="focus:outline-none input pl-3 w-full  h-[44px] border border-[#212427] border-opacity-90 border-[1px] placeholder:text-[14px] rounded rounded-[10px] "
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <img
                src="/images/companyIL2.svg"
                className="absolute inset-y-0 right-5 top-1/2 transform -translate-y-1/2 h-[16px] w-[16px] "
              />
            </div>
          </div>

          <div className="relative">
            <div className="flex gap-x-[170px] mx-5 mt-7">
              <div>
                <h3 className=" lg:text-[18px] md:text-[16px] text-[14px] font-bold text-[#454545]  ">
                  Divisional Cities
                </h3>
                <div className="mt-4">
                  {location.map((lo) => (
                    <div key={lo._id}>
                      <div className="flex justify-between mb-3">
                        <p
                          className={`cursor-pointer lg:text-[16px] md:text-[16px] text-[13px] text-[#212427]  ${
                            selectedcityname === lo.name ? "text-blue-500" : ""
                          }`}
                          onClick={() =>
                            handleLocationClick(lo, lo.name, lo._id)
                          }
                        >
                          {lo.name}
                        </p>
                        { selectedcityname === lo.name ? (
                      <>
                        <img
                          
                          src="/images/locationCompanySelect.svg"
                          className=" rotate-90 cursor-pointer "
                        />{" "}
                      </>
                    ) : (
                      <>
                        <img
                          onClick={() =>
                            handleLocationClick(lo, lo.name, lo._id)
                          }
                          src="/images/locationCompanySelect.svg"
                          className="  cursor-pointer "
                        />{" "}
                      </>
                    )}
                    
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative" id="division">
                <h3 className="lg:text-[18px] md:text-[16px] text-[14px] font-bold text-[#454545]  ">
                  Popular Areas
                </h3>
                <div className="mt-[30px] h-[350px] absolute inset-x-0 top-0 overflow-y-auto lg:w-[175px] w-[135px] ">
                  {selectedCityDivisions
                    .filter((di) =>
                      di.divisionname
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    )
                    .map((di) => (
                      <div key={di._id}>
                        <p
                          className={`my-2 cursor-pointer lg:text-[16px] md:text-[16px] text-[13px] text-[#212427]  ${
                            selectedClickDivision === di.divisionname
                              ? "text-blue-500"
                              : ""
                          }`}
                          onClick={() =>
                            handleDivisionClick(di.divisionname, di._id)
                          }
                        >
                          {di.divisionname}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
          </div>
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default CompanyLocation;
