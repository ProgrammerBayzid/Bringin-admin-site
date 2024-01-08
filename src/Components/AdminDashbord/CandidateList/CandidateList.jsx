import { useEffect, useState } from "react";
import Spinner from "../../Spinner/Spinner";
import FilterCandidate from "./FilterCandidate";
import pro from "../../../assets/commonlogo/Group (1).png";
import vec from "../../../assets/commonlogo/Vector.png";
import { Image } from "antd";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-hot-toast";
import CandidateModal from "./CandidateModal";
import App from "../../../App.css";


const CandidateList = () => {
  const [isLoding, setIsLoding] = useState(false);
  const [refresh, setRefresh] = useState(true);

  const [candidate, setcandidate] = useState([]);
  useEffect(() => {
    fetch("https://rsapp.unbolt.co/admin/candidatelist")
      .then((res) => res.json())
      .then((data) => {
        setIsLoding(true);
        setcandidate(data);
        console.log(data);
      });
  }, []);
  console.log(candidate);
  const recall = () => {
    setIsLoding(false);
    fetch("https://rsapp.unbolt.co/admin/candidatelist")
      .then((res) => res.json())
      .then((data) => {
        setIsLoding(true);
        setcandidate(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoding(false);
      });
  };

  const [search, setSearch] = useState("");

  const [items, setItems] = useState(candidate);

  console.log(items);

  const [currentPage, SetCurrentPage] = useState(1);
  const recruterPerPage = 50;
  const lastIndex = currentPage * recruterPerPage;
  const firstIndex = lastIndex - recruterPerPage;
  const recruter = items.slice(firstIndex, lastIndex);
  const npage = Math.ceil(items / recruterPerPage);

  const [remove, setremove] = useState(null);
  const closeModal = () => {
    setremove(null);
  };



    // Define CSS styles for the sticky container
    // const stickyContainerStyle = {
    //   position: "sticky",
    //   top: "0", // Stick to the top
    //   zIndex: "100", // Adjust z-index as needed
    //   backgroundColor: "white", // Background color of the sticky container
    // };
    const [filteredCandidates, setFilteredCandidates] = useState([]);

    const filterCandidates = () => {
      setFilteredCandidates(
        items.filter((pre, i) => {
          return search.toLocaleLowerCase() === ""
            ? pre
            : pre?.userid?.fastname === null
            ? pre
            : (
                pre?.userid?.fastname?.toLocaleLowerCase() +
                " " +
                pre?.userid?.lastname?.toLocaleLowerCase()
              ).includes(search) || pre?.userid?.lastname === null
            ? pre
            : pre?.userid?.lastname.toLocaleLowerCase().includes(search) ||
              pre?.userid?.number === null
            ? pre
            : pre?.userid?.number.toLocaleLowerCase().includes(search) ||
              pre?.careerPreference[0]?.functionalarea?.industryid?.industryname ===
              null
            ? pre
            : pre?.careerPreference[0]?.functionalarea?.industryid?.industryname
                .toLocaleLowerCase()
                .includes(search) ||
              pre?.careerPreference[0]?.functionalarea?.functionalname === null
            ? pre
            : pre?.careerPreference[0]?.functionalarea?.functionalname
                .toLocaleLowerCase()
                .includes(search) ||
              pre?.careerPreference[0]?.division?.divisionname === null
            ? pre
            : pre?.careerPreference[0]?.division?.divisionname
                .toLocaleLowerCase()
                .includes(search);
        })
      );
    };
  
    useEffect(() => {
      filterCandidates(); // Call the filter function whenever the search input changes
    }, [search, items]);

  if (isLoding === false) {
    return (
      <div className="">
        <Spinner></Spinner>
      </div>
    );
  }

  return (
    <div>
      <div className="sticky  top-[13px] z-50 w-[320px] ">
        <div className="flex justify-between items-center  ">
          <div className="relative w-full max-w-xs">
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search by name, designation, mobile"
              className="placeholder:text-[11px] placeholder:font-normal h-[35px]  w-[260px] pl-3 border  rounded rounded-[20px]   max-w-xs outline-none"
            />
            <img
              src="/img/se.png"
              className="absolute inset-y-0 right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 "
            />
          </div>

          <div className=" ml-3">
            <label htmlFor="repotedJob-modal" className="cursor-pointer">
              <img src="/img/fi.png" className="w-[60px] h-[30px]" />
            </label>{" "}
          </div>
        </div>
      </div>
      <div >
        <div className="flex flex-col ">
          <div className="sm:-mx-6 lg:-mx-2">
            <div className="inline-block w-full pb-2 sm:px-6 lg:px-2">
              <div className=" h-[620px] overflow-y-auto">
                <table className="w-full  text-left mt-5">
                  <thead className="border-b font-medium bg-[#005784] sticky  top-[17px] z-50 ">
                    <tr>
                      <th
                        scope="col"
                        className="text-center w-[35px] text-[14px] text-white ml-3 font-medium py-2 border-r-[1px] border-white"
                      >
                        No
                      </th>
                      <th
                        scope="col"
                        className="text-center w-[31px] text-[14px] text-white  font-medium py-2 border-r-[1px] border-white"
                      >
                        <div className="flex justify-center">
                          <img className="w-[15px]" src={pro} />
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="text-center w-[230px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        Candidate Name
                      </th>
                      <th
                        scope="col"
                        className="text-center w-[120px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        Ex. Level
                      </th>
                      <th
                        scope="col"
                        className="text-center w-[120px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        Mobile
                      </th>
                      <th
                        scope="col"
                        className="text-center w-[230px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="text-center w-[230px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        Expertise Area
                      </th>
                      <th
                        scope="col"
                        className="text-center w-[150px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        Education
                      </th>
                      <th
                        scope="col"
                        className="text-center w-[100px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        Location
                      </th>
                      <th
                        scope="col"
                        className="text-center w-[80px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        Reg. Date
                      </th>
                      <th
                        scope="col"
                        className="text-center w-[40px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        <div className="flex justify-center">
                          <img className="w-[15px]" src={vec} />
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="text-center w-[25px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        <div className="flex justify-center">
                          <AiFillDelete className="text-red-500 text-[15px]"></AiFillDelete>
                        </div>
                      </th>
                    </tr>
                  </thead>

                  {filteredCandidates.map((pre, i) => (
                      <tbody key={i} >
                        <tr className="overflow-y-auto ">
                          <td className="whitespace-nowrap text-[13px] text-center py-1 border-2 ">
                          {(currentPage - 1) * recruterPerPage + i + 1}
                          </td>
                          <td className="whitespace-nowrap  px-1 py-1 border-2 ">
                            <div className="flex justify-center">
                              <Image
                                height={31}
                                width={31}
                                className="rounded rounded-full "
                                src={`https://rsapp.unbolt.co/${pre?.userid?.image}`}
                              />
                            </div>
                          </td>
                          <td className="whitespace-nowrap  text-[13px]  border-2 pl-2 py-1">
                            <a
                              href={`https://unbolt.co/candidate-profile/${pre?._id}`}
                              target="_blank"
                              className=""
                            >
                              <p className="hover:text-blue-500">
                                {pre?.userid?.fastname} {pre?.userid?.lastname}
                              </p>
                            </a>
                          </td>
                          <td className="whitespace-nowrap text-[13px]  border-2 pl-2 py-1">
                            {pre?.userid?.experiencedlevel?.name}
                          </td>
                          <td className="whitespace-nowrap text-[13px]  border-2 pl-2 py-1">
                            {pre?.userid?.number}
                          </td>
                          <td className="whitespace-nowrap text-[13px]  border-2 pl-2 py-1">
                            {pre?.userid?.email}
                          </td>
                          <td className="whitespace-nowrap text-[13px]  border-2 pl-2 py-1">
                            {
                              pre?.careerPreference[0]?.functionalarea
                                ?.functionalname
                            }
                          </td>
                          <td className="whitespace-nowrap tooltip-trigger relative group text-[13px]  border-2 pl-2 py-1">
                            {pre?.education[0]?.digree?.education?.name.slice(
                              0,
                              20
                            )}
                          
                            <p className="tooltip absolute z-40 bg-[#0077B5] text-white p-2 rounded-md -mt-2 invisible group-hover:opacity-100 group-hover:visible transition">
                              {pre?.education[0]?.digree?.education?.name}
                            </p>
                          </td>
                          <td className="whitespace-nowrap tooltip-trigger relative group text-[13px]  border-2 pl-2 py-1 ">
                            {pre?.careerPreference[0]?.division?.divisionname.slice(
                              0,
                              7
                            )}
                            {","}
                            {pre?.careerPreference[0]?.division?.cityid?.name.slice(
                              0,
                              7
                            )}
                            <p className="tooltip absolute z-40 bg-[#0077B5] text-white p-2 rounded-md -mt-2 invisible group-hover:opacity-100 group-hover:visible transition">
                            {pre?.careerPreference[0]?.division?.divisionname}
                            {","}
                            {pre?.careerPreference[0]?.division?.cityid?.name}
                            </p>
                          </td>
                          <td className="whitespace-nowrap text-[13px]  border-2 pl-2 py-1">
                          {pre?.createdAt.slice(8, 10) + '-' + pre?.createdAt.slice(5, 7) + '-' + pre?.createdAt.slice(0, 4)}
                           
                          </td>
                          <td className="whitespace-nowrap text-[13px]  border-2  py-1 w-[50px]  ">
                            <div className="flex justify-center">
                              <label className="cursor-pointer border px-2 py-1 rounded rounded-[30px] ">
                                a
                              </label>
                            </div>
                          </td>
                          <td className="whitespace-nowrap text-[14px]  border-2  py-1">
                            <div className=" flex justify-center">
                              <label
                                onClick={() => setremove(pre)}
                                htmlFor="delete-candidate-modal"
                                className="cursor-pointer "
                              >
                                <AiFillDelete className="text-red-500"></AiFillDelete>
                              </label>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                </table>
              </div>
              {/* <div className=" ">

              <div className=" flex justify-between px-10 mt-5 ">
                <div className="">
                  <p className="text-[16px]">
                  
                    {Math.min(firstIndex + 1, candidate.length)} -{" "}
                    {Math.min(lastIndex, candidate.length)} of{" "}
                    {candidate.length} 
                   {" "}-{" "}  Page {currentPage} of{" "}
                    {Math.ceil(candidate.length / recruterPerPage)}
                  </p>
                 
                </div>
                <div>
                  <div className="flex gap-2">
                    <p
                      onClick={pevPage}
                      className="text-[16px] text-[#0077B5] border border-2 border-[#0077B5] py-1 px-4  hover:bg-[#0077B5] hover:text-white cursor-pointer"
                    >
                      <a href="#" className="">
                        Previous
                      </a>
                    </p>
                    <p
                      onClick={nextPage}
                      className="text-[16px] text-[#0077B5] border border-2 border-[#0077B5] py-1 px-4  hover:bg-[#0077B5] hover:text-white cursor-pointer"
                    >
                      <a href="#" className="">
                        Next{" "}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <FilterCandidate setItems={setItems} data={candidate}></FilterCandidate>

      {remove && (
        <CandidateModal
          modalData={remove}
          closeModal={closeModal}
          recall={recall}
        ></CandidateModal>
      )}
    </div>
  );

  function pevPage() {
    if (currentPage !== 1) {
      SetCurrentPage(currentPage - 1);
    }
  }

  function changePage(id) {
    SetCurrentPage(id);
  }

  function nextPage() {
    if (currentPage !== npage) {
      SetCurrentPage(currentPage + 1);
    }
  }
};

export default CandidateList;
