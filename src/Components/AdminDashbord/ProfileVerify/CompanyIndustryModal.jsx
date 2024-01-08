import { Collapse } from "react-collapse";
import { useEffect } from "react";
import { useState } from "react";
import { ScaleLoader } from "react-spinners";

const CompanyIndustryModal = ({
  setindustryOpen,
  setSelectedClickcatagoryID,
  setSelectedClickcatagory,
  setSelectedIndustryname,
  setSelectedIndustryID,
  selectedIndustryname,
  selectedClickcatagory,
}) => {
  const [industry, setIndustry] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loding, setloding] = useState(true);
  useEffect(() => {
    fetch("https://rsapp.unbolt.co/admin/industry2")
      .then((res) => res.json())
      .then((data) => {
        setIndustry(data);
        console.log(data);
        setloding(false)
      });
  }, []);
  console.log(industry);

  const [selectedIndustry, setSelectedIndustry] = useState(null);
  //   const [selectedIndustryname, setSelectedIndustryname] = useState(null);
  //   const [selectedIndustryID, setSelectedIndustryID] = useState(null);
  const handleIndustryonClick = (ind, industryname, id) => {
    setSelectedIndustry(ind);
    setSelectedIndustryname(industryname);
    setSelectedIndustryID(id);
  };

  console.log(selectedIndustry);

  //   const [selectedClickcatagory, setSelectedClickcatagory] = useState(null);
  //   const [selectedClickcatagoryID, setSelectedClickcatagoryID] = useState(null);

  const handlecatagoryClick = (categoryname, id) => {
    setSelectedClickcatagory(categoryname);
    setSelectedClickcatagoryID(id);
  };

  const handleremoveIndustry = () => {
    setSelectedClickcatagory("Information Technology");
    setSelectedClickcatagoryID(null);
    setSelectedIndustryname(null);
    setSelectedIndustryID(null);
    setindustryOpen(false);
  };

  const selectedIndustrys =
    selectedIndustry !== null
      ? selectedIndustry.category.filter((ca) =>
          ca.categoryname.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : [];

  console.log(selectedClickcatagory);

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
      handleIndustryonClick(firstIndustry, firstIndustry.industryname, firstIndustry._id);
    }
  }, [industry]);

  return (
    <div className="fixed inset-0 bg-[#E6E6E6] bg-opacity-90 flex justify-center items-center z-40 ">
      <div className="  bg-white  relative  w-[350px] h-[550px] lg:w-[640px] lg:h-[500px]   lg:p-0 md:p-0 p-2 rounded rounded-[10px]">
        <div className="px-3">
          <div className="my-5">
            <div className="flex justify-between">
              <img
                onClick={handleremoveIndustry}
                className="cursor-pointer"
                src="/images/tircompany.svg"
              />
              <h1 className="text-[18px] font-semibold text-[#212427]  ">
                Field of Industry
              </h1>
              <button
                onClick={() => setindustryOpen(false)}
                className=" text-white bg-[#0077B5] h-[25px] w-[50px] text-[14px] rounded rounded-[5px]"
              >
                Save
              </button>
            </div>

            <h5 className="text-[14px] fonrmal text-[#212427]  text-center">
              Select your preferred location to find nearby job opportunities.
            </h5>
          </div>

          <div>
          {
            loding === true ? <div className="flex justify-center  mt-36"><ScaleLoader color="#365dd6" size="50" /></div> : 

            <>
            
            <div>

<div className="px-5">
  <div className="relative w-full mb-1">
    <div className="">
      <input
        placeholder="Any Industry / Garments / SME etc."
        type="text"
        className="focus:outline-none input pl-3 w-full rounded rounded-[7px]   h-[44px] border border-[#212427] border-opacity-90 border-[1px] placeholder:text-[14px] rounded rounded-[10px]"
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
<div className="px-4">
  <div className="">
    <div className="lg:flex md:lg:flex gap-x-3 px-2">
      <div>
        <div className="mt-7 h-[300px] lg:w-[170px] md:w-[170px] w-full  overflow-y-auto">
          {industry.map((ind) => (
            <div key={ind._id}>
              <div className="flex justify-between mb-3">
                <p
                  className={`cursor-pointer text-[15px] text-[#212427] my-[2px]  ${
                    selectedIndustryname === ind.industryname
                      ? "text-blue-500"
                      : ""
                  }`}
                  onClick={() => {
                    handleIndustryonClick(
                      ind,
                      ind.industryname,
                      ind._id
                    );
                    toggleIndustry(ind._id); // Toggle the specific industry
                  }}
                >
                  {ind.industryname.split("/").join(" / ")}
                </p>
              </div>

              <div className="block lg:hidden md:hidden ">
                <Collapse isOpened={industryOpenState[ind._id]}>
                  <div className=" flex flex-wrap gap-x-3 gap-y-3 ">
                    {selectedIndustrys
                      .filter((ca) =>
                        ca.categoryname
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
                      )
                      .map((ca) => (
                        <div key={ca._id} className="">
                          <p
                            className={` cursor-pointer text-[14px]  px-[3px] py-[2px] border border-[#828282] border-opacity-40 rounded rounded-[5px] text-[#212427] text-opacity-70${
                              selectedClickcatagory !==
                              ca.categoryname
                                ? ""
                                : " text-white text-opacity-100 bg-blue-500"
                            }`}
                            onClick={() =>
                              handlecatagoryClick(
                                ca.categoryname,
                                ca._id
                              )
                            }
                          >
                            {ca.categoryname}
                          </p>
                        </div>
                      ))}
                  </div>
                </Collapse>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className="relative mt-5 flex-1 hidden lg:block md:block"
        id="division"
      >
        {/* <h3 className="text-[16px] font-semibold text-[#212427]  ">
          Most Popular Job Industry
        </h3> */}
        <div className="mt-[12px] h-[320px] absolute inset-x-0 top-0 overflow-y-auto ">
          <div className=" flex flex-wrap gap-x-3 gap-y-3 ">
            {selectedIndustrys
              .filter((ca) =>
                ca.categoryname
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              )
              .map((ca) => (
                <div key={ca._id} className="">
                  <p
                    className={` cursor-pointer text-[14px]  px-[3px] py-[2px] border border-[#828282] border-opacity-40 rounded rounded-[5px]${
                      selectedClickcatagory !==
                      ca.categoryname
                        ? ""
                        : " text-white text-opacity-100 bg-blue-500"
                    }`}
                    onClick={() =>
                      handlecatagoryClick(ca.categoryname, ca._id)
                    }
                  >
                    {ca.categoryname}
                  </p>
                </div>
              ))}
          </div>
        </div>
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
    </div>
  );
};

export default CompanyIndustryModal;
