import { useState } from "react";
import { useEffect } from "react";
import { Collapse } from "react-collapse";
import { ScaleLoader } from "react-spinners";


const ExperticeAreaSelectForJobPost = ({ setexperticeAreaModalOpen, setexperticeArea, setexperticeAreaID, experticeArea, setexperticeAreaCatagoryID, experticeAreaCatagoryID }) => {
  const [industry, setIndustry] = useState([]);
  const [loding, setloding] = useState(true);

  useEffect(() => {
    fetch("https://rsapp.unbolt.co/admin/industry")
      .then((res) => res.json())
      .then((data) => {
        setIndustry(data);
        console.log(data);
        setloding(false)
      });
  }, []);
  console.log(industry);
  const [searchQuery, setSearchQuery] = useState("");

  const [highlightIT, setHighlightIT] = useState(true);
  const [experticeAreass, setexperticeAreaex] = useState(null);
  const [experticeAreaname, setexperticeAreaname] = useState(null);
  const [experticeAreaids, setexperticeAreaids] = useState(null);

  const handleExperticeClick = (ind, industryname, id) => {
    setexperticeAreaex(ind);
    setexperticeAreaname(industryname);
    setexperticeAreaids(id);
  };


  const handleAreaClick = (functionalname, id, categoryid) => {
    setexperticeArea(functionalname);
    setexperticeAreaID(id);
    setexperticeAreaCatagoryID(categoryid)
  };

  console.log("catagori id", experticeAreaCatagoryID);
  const handleAreaRemoveClick = () => {
    setexperticeArea("");
    setexperticeAreaID(null);
    setexperticeAreaModalOpen(false)
    setexperticeAreaCatagoryID(null)

  };

  const selectedCityDivisions =
    experticeAreass !== null
      ? experticeAreass.category.filter((ca) =>
        ca.categoryname.toLowerCase().includes(searchQuery.toLowerCase())
      )
      : [];




  console.log(experticeAreass);



  const [industryOpenState, setIndustryOpenState] = useState({});

  const toggleIndustry = (industryId) => {
    // Update the open state for the specific industry
    setIndustryOpenState((prevState) => ({
      ...prevState,
      [industryId]: !prevState[industryId],
    }));
  };

  useEffect(() => {
    // Trigger the click for the first element when the component mounts
    if (industry.length > 0) {
      const firstIndustry = industry[0];
      handleExperticeClick(firstIndustry, firstIndustry.industryname, firstIndustry._id);
    }
  }, [industry]);

  


  return (
    <div className="fixed inset-0 bg-[#090808] bg-opacity-70 flex justify-center items-center z-40 App">
      <div className="  bg-white  relative  w-[350px] h-[570px] lg:w-[640px] lg:h-[580px]   lg:p-0 md:p-0 py-2 px-4 rounded rounded-[10px]">
        <div className="px-3">
          <div className="my-5">
            <div className="flex justify-between">
              <img
                onClick={() => setexperticeAreaModalOpen(false)}
                className="cursor-pointer"
                src="/images/tircompany.svg"
              />
              <h1 className="text-[22px] mx-auto font-bold text-[#212427] text-opacity-90 ">
                Expertise Area
              </h1>
              <button
                onClick={() => setexperticeAreaModalOpen(false)}
                className=" text-white bg-[#0077B5] h-[25px] w-[50px] text-[14px] rounded rounded-[5px]"
              >
                Save
              </button>
            </div>

            <h5 className="text-[14px] font-normal text-[#212427] text-opacity-60 text-center px-4">
              Select an expertise area to facilitate our search for the most
              suitable candidates for your needs.
            </h5>
          </div>
          {
            loding === true ? <div className="flex justify-center  mt-36">
              <ScaleLoader color="#365dd6" size="50" />
            </div> :

              <>



                <div>
                  <div className="relative w-full mb-1">
                    <div className="">
                      <input
                        placeholder="Full Stack Engineer"
                        type="text"
                        className="focus:outline-none input pl-3 w-full  h-[35px] border border-[2px] placeholder:text-[14px] rounded"
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
                  <div className="lg:flex md:flex justify-evenly gap-x-4">
                    <div className="lg:w-[170px] h-[380px] overflow-y-auto ">


                      {industry.map((ind) => (
                        <div key={ind._id}>
                          <p
                            className={`cursor-pointer lg:text-[16px] md:text-[16px] text-[13px] my-4 text-center text-[#212427] text-opacity-70 ${(experticeAreaname === ind.industryname && ind.industryname !== "IT") || (ind.industryname === "IT" && highlightIT)
                                ? "bg-[#0077B5] bg-opacity-20 border border-none rounded-xl"
                                : ""
                              }`}
                            key={ind._id}
                            onClick={() => {
                              handleExperticeClick(ind, ind.industryname, ind._id);
                              toggleIndustry(ind._id);
                              if (ind.industryname === "IT") {
                                setHighlightIT(true); // Set IT to be highlighted
                              } else {
                                setHighlightIT(false); // Set other fields to not be highlighted
                              }
                            }}
                          >
                            {ind.industryname}
                          </p>


                          <div className="block lg:hidden md:hidden">
                            <Collapse isOpened={industryOpenState[ind._id]}>



                              {selectedCityDivisions
                                .filter((ca) =>
                                  ca.categoryname
                                    .toLowerCase()
                                    .includes(searchQuery.toLowerCase())
                                )
                                .map((ca) => (
                                  <div key={ca._id}>
                                    <p
                                      //   className={`my-2 cursor-pointer text-[16px] text-[#212427] text-opacity-70 ${
                                      //     selectedClickDivision === di.divisionname
                                      //       ? "text-blue-500"
                                      //       : ""
                                      //   }`}
                                      //   onClick={() =>
                                      //     handleDivisionClick(di.divisionname, di._id)
                                      //   }
                                      className="lg:text-[14px] text-[12px] text-[#212427] text-opacity-90 font-semibold mb-1"
                                    >
                                      {ca.categoryname}
                                    </p>
                                    <div className="gap-[2px] lg:flex lg:flex-wrap">

                                      {ca.functionarea.map((fantional) => (
                                        <div key={fantional._id} className=" ">
                                          <button type="button" onClick={() =>
                                            handleAreaClick(fantional.functionalname, fantional._id, fantional.categoryid)
                                          } className={` py-[2px] px-[5px] m-[3px] rounded rounded-[7px] ${experticeArea === fantional.functionalname ? " bg-[#0077B5] py-[2px] px-[5px] text-white lg:text-[14px] text-[12px]" : "bg-[#E9EDF0] text-[#000000] lg:text-[14px] text-[12px] text-opacity-60 "}`}>
                                            {fantional.functionalname}
                                          </button>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                            </Collapse>

                          </div>
                        </div>
                      ))}
                    </div>
                    {/* <div className="w-[1px] h-[350px] mt-[10px] bg-[#212427] bg-opacity-20"></div> */}
                    <div className="relative hidden lg:block md:block" id="division">
                      <div className="h-[370px] overflow-y-auto ms-[25px] lg:w-[390px]">
                        {selectedCityDivisions
                          .filter((ca) =>
                            ca.categoryname
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase())
                          )
                          .map((ca) => (
                            <div key={ca._id}>
                              <p
                                //   className={`my-2 cursor-pointer text-[16px] text-[#212427] text-opacity-70 ${
                                //     selectedClickDivision === di.divisionname
                                //       ? "text-blue-500"
                                //       : ""
                                //   }`}
                                //   onClick={() =>
                                //     handleDivisionClick(di.divisionname, di._id)
                                //   }
                                className="lg:text-[14px] text-[12px] text-[#212427] text-opacity-90 font-semibold mb-1"
                              >
                                {ca.categoryname}
                              </p>
                              <div className="gap-[2px] lg:flex lg:flex-wrap">

                                {ca.functionarea.map((fantional) => (
                                  <div key={fantional._id} className=" ">
                                    <button type="button" onClick={() =>
                                      handleAreaClick(fantional.functionalname, fantional._id, fantional.categoryid)
                                    } className={` py-[2px] px-[5px] m-[3px] rounded rounded-[7px] ${experticeArea === fantional.functionalname ? " text-[#0077B5]  py-[2px] px-[5px] bg-[#E9EDF0]  font-normal" : "bg-[#E9EDF0] text-[#000000]  font-normal "}`}>
                                      {fantional.functionalname}
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
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

export default ExperticeAreaSelectForJobPost;



