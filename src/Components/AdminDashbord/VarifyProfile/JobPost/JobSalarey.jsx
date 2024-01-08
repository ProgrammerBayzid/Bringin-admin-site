import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

const JobSalarey = ({
  setsalaryModalOpen,
  setmaxsalary,
  maxsalary,
  setmaxsalaryID,
  maxsalaryID,
  setminsalary,
  minsalary,
  setminsalaryID,
  minsalaryID,
}) => {
  const [salarytype, setsalarytype] = useState([]);

  useEffect(() => {
    fetch("https://rsapp.unbolt.co/admin/salarie")
      .then((res) => res.json())
      .then((data) => {
        setsalarytype(data);
        console.log(data);
      });
  }, []);
  console.log(salarytype);

  const [selectedMaxsalary, setselectedMaxsalary] = useState(null);

  const handleSalaryClick = (sa, salary, id) => {
    setselectedMaxsalary(sa);
    setminsalary(salary);
    setminsalaryID(id);
    console.log(selectedMaxsalary, minsalary, minsalaryID);
  };
  const handleMaxSalaryClick = (salary, id) => {
    setmaxsalary(salary);
    setmaxsalaryID(id);
    console.log("maxsalary", maxsalary, maxsalaryID);
  };

  const selectedMaxsalaryFilter =
    selectedMaxsalary !== null ? selectedMaxsalary.other_salary : [];

  const handelRemoveJobSalary = () => {
    setsalaryModalOpen(false);
  };

  const [selectedItem, setSelectedItem] = useState(null);
  const scrollContainerRef = useRef(null);

  const handleScroll = () => {
    const scrollIndex = Math.round(scrollContainerRef.current.scrollTop / 50);
    const selectedItem = salarytype[scrollIndex];

    // Check if selectedItem is defined to avoid errors when scrolling quickly
    if (selectedItem) {
      handleSalaryClick(selectedItem, selectedItem.salary, selectedItem._id);
      setSelectedItem(selectedItem);
    }
  };

  const [selectedItems, setSelectedItems] = useState(null);
  const scrollContainerRefs = useRef(null);

  const handleScrolls = () => {
    const scrollIndexs = Math.round(scrollContainerRefs.current.scrollTop / 50);
    const selectedItems = selectedMaxsalaryFilter[scrollIndexs];

    // Check if selectedItem is defined to avoid errors when scrolling quickly
    if (selectedItems) {
      handleMaxSalaryClick(selectedItems.salary, selectedItems._id);
      setSelectedItems(selectedItems);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#090808] bg-opacity-70 flex justify-center items-center z-40 App">
      <div className="  bg-white  relative  w-[350px] h-[550px] lg:w-[584px] lg:h-[300px]   lg:p-0 md:p-0 p-2 rounded rounded-[10px]">
        <div className="px-3">
          <div className="my-6">
            <div className="flex">
              <img
                onClick={handelRemoveJobSalary}
                className="cursor-pointer -mt-3 ms-[20px]"
                src="/images/tircompany.svg"
              />
              <h1 className="text-[22px] font-bold text-[#212427] text-opacity-90 mb-3 ms-[140px]">
                Offered Salary
              </h1>
              <button   onClick={handelRemoveJobSalary} className=" text-[#1C4B81] border border-1 border-[#1C4B81] h-[28px] w-[52px] text-[16px] ms-[140px] rounded-[10px] font-semibold">
                Save
              </button>
            </div>
            <div className="flex justify-center">
              <div>
                <div className="flex flex-col items-center">
                  <div
                    className="scroll-container  pt-5 pb-[150px] h-[200px]"
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    style={{
                      maxHeight: "100%", // Set a maximum height
                      overflowY: "scroll",
                      scrollbarWidth: "thin", // For Firefox
                      scrollbarColor: "transparent transparent", // For Firefox
                      WebkitOverflowScrolling: "touch", // For smoother scrolling on iOS devices
                      msOverflowStyle: "none", // For IE
                    }}
                  >
                    <div className="pt-10">
                      {salarytype.length > 0 &&
                        salarytype.map((item, index) => (
                          <div
                            key={index}
                            className={`scroll-item py-[10px] px-4 w-[180px] ${
                              selectedItem === item
                                ? " bg-[#D2DBE6]  px-4 rounded-l-[22px] "
                                : ""
                            }`}
                          >
                            <p
                              onClick={() =>
                                handleSalaryClick(item, item.salary, item._id)
                              }
                              className={`${
                                minsalary === item.salary
                                  ? "font-semibold text-[#212427] text-[16px]"
                                  : "text-[14px] text-[#212427] my-[7px] text-opacity-60 font-normal cursor-pointer"
                              }`}
                            >
                              {item.salary}
                              {item.simbol} {item.currency}
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex flex-col items-center">
                  <div
                    className="scroll-container overflow-y-scroll  pt-5 pb-[180px] h-[200px]"
                    ref={scrollContainerRefs}
                    onScroll={handleScrolls}
                  >
                    <div className="pt-10">
                      {selectedMaxsalaryFilter.length > 0 &&
                        selectedMaxsalaryFilter.map((item, index) => (
                          <div
                            key={index}
                            className={`scroll-item py-[10px] px-4 w-[180px] ${
                              selectedItems === item
                                ? "bg-[#D2DBE6]  px-4 rounded-r-[22px]"
                                : ""
                            }`}
                          >
                            <p
                              className={`${
                                maxsalary === item.salary
                                  ? "font-semibold text-[#212427] text-[16px]"
                                  : "text-[14px] text-[#212427] my-[7px] text-opacity-60 font-normal cursor-pointer"
                              }`}
                            >
                              {item.salary}
                              {item.simbol} {item.currency}
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
      </div>
    </div>
  );
};

export default JobSalarey;
