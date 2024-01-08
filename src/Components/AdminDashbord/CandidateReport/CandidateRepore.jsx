import { useEffect, useState } from "react";
import Spinner from "../../Spinner/Spinner";
import pro from "../../../assets/commonlogo/Group (1).png";
import vec from "../../../assets/commonlogo/Vector4.png";
import { Image } from "antd";
import FilterReportCandidate from "./FilterReportCandidate";
import RepotedDetails from "./RepotedDetails";
import { toast } from "react-hot-toast";
import { AiFillDelete } from "react-icons/ai";
import CandidateModal from "../CandidateList/CandidateModal";
const CandidateList = () => {
  const [repotedCandidate, setRepotedCandidate] = useState([]);
  const [isLoding, setIsLoding] = useState(false);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    fetch("https://rsapp.unbolt.co/candidate_report")
      .then((res) => res.json())
      .then((data) => {
        setIsLoding(true);
        setRepotedCandidate(data);
        console.log(data);
      });
  }, []);
  console.log(repotedCandidate);

  const recall = () => {
    setIsLoding(false);
    fetch("https://rsapp.unbolt.co/candidate_report")
      .then((res) => res.json())
      .then((data) => {
        setIsLoding(true);
        setRepotedCandidate(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoding(false);
      });
  };

  const [search, setSearch] = useState("");

  const [items, setItems] = useState(repotedCandidate);

  console.log(items);

  const [currentPage, SetCurrentPage] = useState(1);
  const recruterPerPage = 50;
  const lastIndex = currentPage * recruterPerPage;
  const firstIndex = lastIndex - recruterPerPage;
  const recruter = items.slice(firstIndex, lastIndex);
  const npage = Math.ceil(items / recruterPerPage);
  // const number =[...Array(npage+1).keys()].slice(1)

  const [cnadidatereportdetails, setcnadidatereportdetails] = useState(null);
  const closecandidatereportModal = () => {
    setcnadidatereportdetails(null);
  };

  const handleDelete = (seekerId) => {
    fetch(`https://rsapp.unbolt.co/seeker_deletes/${seekerId}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("admin_token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          recall();
          toast.success("Deleted successfully");
        }
      });
    console.log(seekerId);
  };

  const [remove, setremove] = useState(null);
  const closeModal = () => {
    setremove(null);
  };

  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const filterCandidates = () => {
    setFilteredCandidates(
      items.filter((pre) => {
        return search.toLocaleLowerCase() === ""
          ? pre
          : pre?.candidateid?.fastname === null
          ? pre
          : (
              pre?.candidateid?.fastname?.toLocaleLowerCase() +
              " " +
              pre?.candidateid?.lastname?.toLocaleLowerCase()
            ).includes(search) || pre?.candidateid?.lastname === null
          ? pre
          : pre?.candidateid?.lastname.toLocaleLowerCase().includes(search) ||
            pre?.candidateid?.number === null
          ? pre
          : pre?.candidateid?.number.toLocaleLowerCase().includes(search) ||
            pre?.candidatefulldetailsid?.careerPreference[0]?.functionalarea
              ?.industryid?.industryname === null
          ? pre
          : pre?.candidatefulldetailsid?.careerPreference[0]?.functionalarea?.industryid?.industryname
              .toLocaleLowerCase()
              .includes(search) ||
            pre?.candidatefulldetailsid?.careerPreference[0]?.functionalarea
              ?.functionalname === null
          ? pre
          : pre?.candidatefulldetailsid?.careerPreference[0]?.functionalarea?.functionalname
              .toLocaleLowerCase()
              .includes(search) ||
            pre?.candidatefulldetailsid?.careerPreference[0]?.division
              ?.divisionname === null
          ? pre
          : pre?.candidatefulldetailsid?.careerPreference[0]?.division?.divisionname
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
        <div className="flex justify-between items-center ">
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

          <div className="ml-3">
            <label htmlFor="repotedCandidate-modal" className="cursor-pointer">
              <img src="/img/fi.png" className="w-[60px] h-[30px]" />
            </label>{" "}
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-col overflow-x-auto">
          <div className="sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-x-auto h-[600px]">
                <table className="w-full text-left mt-5">
                  <thead className="border-b font-medium bg-[#005784] sticky  top-[17px] z-50">
                    <tr>
                      <th
                        scope="col"
                        className="text-center w-[30px] text-[13px] text-white  font-medium py-2 border-r-[1px] border-white"
                      >
                        No
                      </th>
                      <th
                        scope="col"
                        className="text-center w-[40px] text-[13px] text-white  font-medium py-2 border-r-[1px] border-white"
                      >
                        <div className="flex justify-center">
                          <img className="w-[15px] " src={pro} />
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="text-center w-[230px] text-[13px] text-white  font-medium  border-r-[1px] border-white"
                      >
                        Candidate Name
                      </th>
                      <th
                        scope="col"
                        className="text-center w-[190px] text-[13px] text-white  font-medium  border-r-[1px] border-white"
                      >
                        Ex. Level
                      </th>
                      <th
                        scope="col"
                        className="text-center w-[120px] text-[13px] text-white  font-medium  border-r-[1px] border-white"
                      >
                        Mobile
                      </th>
                      <th
                        scope="col"
                        className="text-center w-[220px] text-[13px] text-white  font-medium  border-r-[1px] border-white"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="text-center w-[230px] text-[13px] text-white  font-medium  border-r-[1px] border-white"
                      >
                        Expertise Area
                      </th>

                      <th
                        scope="col"
                        className="text-center w-[180px] text-[13px] text-white  font-medium  border-r-[1px] border-white"
                      >
                        Education
                      </th>
                      <th
                        scope="col"
                        className="text-center w-[150px] text-[13px] text-white  font-medium  border-r-[1px] border-white"
                      >
                        Exp. Salary
                      </th>
                      <th
                        scope="col"
                        className="text-center w-[180px] text-[13px] text-white  font-medium  border-r-[1px] border-white"
                      >
                        Location
                      </th>
                      <th
                        scope="col"
                        className="text-center w-[180px] text-[13px] text-white  font-medium  border-r-[1px] border-white"
                      >
                        Reg. Date
                      </th>
                      <th
                        scope="col"
                        className="px-4 w-[100px] text-[13px] text-white  font-medium  border-r-[1px] border-white"
                      >
                        <div className="flex justify-center">
                          <img className="w-[15px] " src={vec} />
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="text-center w-[230px] text-[13px] text-white  font-medium  border-r-[1px] border-white"
                      >
                        <div className="flex justify-center">
                          <AiFillDelete className="text-red-500 text-[15px]"></AiFillDelete>
                        </div>
                      </th>
                    </tr>
                  </thead>

                  {filteredCandidates.map((pre, i) => (
                    <tbody key={i}>
                      <tr className="overflow-y-auto">
                        <td className="whitespace-nowrap text-[13px] text-center py-1 border-2 ">
                          {(currentPage - 1) * recruterPerPage + i + 1}
                        </td>
                        <td className="whitespace-nowrap   px-1 py-1 border-2 ">
                          <div className="flex justify-center">
                            <Image
                              height={31}
                              width={31}
                              className="rounded rounded-full "
                              src={`https://rsapp.unbolt.co/${pre?.candidateid?.image}`}
                            />
                          </div>
                        </td>
                        <td className="whitespace-nowrap text-[13px]  border-2 pl2 py-1">
                          {pre?.candidateid?.fastname}{" "}
                          {pre?.candidateid?.lastname}
                        </td>
                        <td className="whitespace-nowrap text-[13px]  border-2 pl2 py-1">
                          {pre?.candidateid?.experiencedlevel?.name}
                        </td>
                        <td className="whitespace-nowrap text-[13px]  border-2 pl2 py-1">
                          {pre?.candidateid?.number}
                        </td>
                        <td className="whitespace-nowrap text-[13px]  border-2 pl2 py-1">
                          {pre?.candidateid?.email}
                        </td>

                        <td className="whitespace-nowrap text-[13px]  border-2 pl2 py-1">
                          {
                            pre?.candidatefulldetailsid?.careerPreference[0]
                              ?.functionalarea?.functionalname
                          }
                        </td>

                        <td className="whitespace-nowrap text-[13px]  border-2 pl2 py-1">
                          {
                            pre?.candidatefulldetailsid?.education[0]?.digree
                              ?.education?.name
                          }
                        </td>
                        <td className="whitespace-nowrap text-[13px]  border-2 pl2 py-1">
                          {pre?.candidatefulldetailsid?.careerPreference[0]
                            ?.salaray?.min_salary?.salary
                            ? pre?.candidatefulldetailsid?.careerPreference[0]
                                ?.salaray?.min_salary?.salary
                            : "00"}
                          {pre?.candidatefulldetailsid?.careerPreference[0]
                            ?.salaray?.min_salary?.salary == "Negotiable"
                            ? ""
                            : "-"}
                          {pre?.candidatefulldetailsid?.careerPreference[0]
                            ?.salaray?.max_salary?.salary == "Negotiable"
                            ? ""
                            : pre?.candidatefulldetailsid?.careerPreference[0]
                                ?.salaray?.max_salary?.salary}
                          {pre?.candidatefulldetailsid?.careerPreference[0]
                            ?.salaray?.min_salary?.salary == "Negotiable"
                            ? ""
                            : "K"}{" "}
                          {pre?.candidatefulldetailsid?.careerPreference[0]
                            ?.salaray?.min_salary?.salary == "Negotiable"
                            ? ""
                            : "BDT"}
                        </td>
                        {pre?.candidatefulldetailsid?.careerPreference[0]
                          ?.division?.divisionname ? (
                          <td className="whitespace-nowrap text-[13px]  border-2 pl2 py-1">
                            {
                              pre?.candidatefulldetailsid?.careerPreference[0]
                                ?.division?.divisionname
                            }{" "}
                            {
                              pre?.candidatefulldetailsid?.careerPreference[0]
                                ?.division?.cityid?.name
                            }
                          </td>
                        ) : (
                          <td className="whitespace-nowrap text-[13px]  border-2 pl2 py-1"></td>
                        )}
                        <td className="whitespace-nowrap text-[13px]  border-2 pl2 py-1">
                          {pre?.candidateid?.createdAt.slice(8, 10) +
                            "-" +
                            pre?.candidateid?.createdAt.slice(5, 7) +
                            "-" +
                            pre?.candidateid?.createdAt.slice(0, 4)}
                        </td>
                        <td className="whitespace-nowrap text-[13px]  border-2 pl-3 py-1">
                          <label
                            onClick={() => setcnadidatereportdetails(pre)}
                            htmlFor="candidatereport-details-modal"
                            className="cursor-pointer border px-3 py-1 rounded rounded-[30px]"
                          >
                            att
                          </label>
                        </td>
                        <td className="whitespace-nowrap text-[13px]  border-2  py-1">
                          {" "}
                          {/* <button
                              onClick={() =>
                                handleDelete(
                                  pre?.candidatefulldetailsid?.userid?._id
                                )
                              }
                            >
                              <AiFillDelete className="text-red-500"></AiFillDelete>
                            </button> */}
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
              {/* <div className=" flex justify-between px-10 mt-10 ">
                <div>
                  <p className="text-[16px]">
                    {Math.min(firstIndex + 1, repotedCandidate.length)} -{" "}
                    {Math.min(lastIndex, repotedCandidate.length)} of{" "}
                    {repotedCandidate.length} - Page {currentPage} of{" "}
                    {Math.ceil(repotedCandidate.length / recruterPerPage)},{" "}
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
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {cnadidatereportdetails && (
        <RepotedDetails
          modalData={cnadidatereportdetails}
          closeModal={closecandidatereportModal}
        ></RepotedDetails>
      )}
      {remove && (
        <CandidateModal
          modalData={remove}
          closeModal={closeModal}
          recall={recall}
        ></CandidateModal>
      )}

      <FilterReportCandidate
        setItems={setItems}
        data={repotedCandidate}
      ></FilterReportCandidate>
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
