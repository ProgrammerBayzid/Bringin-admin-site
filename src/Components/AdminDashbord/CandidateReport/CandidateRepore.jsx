import { useEffect, useState } from "react";
import Spinner from "../../Spinner/Spinner";
import pro from "../../../assets/commonlogo/Group (1).png";
import vec from "../../../assets/commonlogo/Vector4.png";
import { Image } from "antd";
import FilterReportCandidate from "./FilterReportCandidate";
import RepotedDetails from "./RepotedDetails";
const CandidateList = () => {
  const [repotedCandidate, setRepotedCandidate] = useState([]);
  const [isLoding, setIsLoding] = useState(false);

  useEffect(() => {
    fetch("https://rsapp.bringin.io/candidate_report")
      .then((res) => res.json())
      .then((data) => {
        setIsLoding(true);
        setRepotedCandidate(data);
        console.log(data);
      });
  }, []);
  console.log(repotedCandidate);

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

  const handelDeeted = (id) => {
    const proced = window.confirm("Are You Sure");
    if (proced) {
      fetch(`https://rsapp.bringin.io/seekerProfiledelete/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data) {
            alert("deleted successfully");
            const remaining = repotedCandidate?.filter((odr) => odr._id !== id);
            setRepotedCandidate(remaining);
          }
        });
    }
  };

  if (isLoding === false) {
    return (
      <div className="">
        <Spinner></Spinner>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search by name, designation, mobile"
          className="placeholder:text-[14px] border h-[36px] rounded rounded-[20px] pl-2 w-full max-w-xs outline-none"
        />
        <div className="w-[64px] h-[36px] flex fustify-between  border border-1 rounded rounded-[30px] bg-white ">
          {/* <img className="w-5 h-5" src={f} /> */}
          <label
            // onClick={() => setFilterRecruters(profileVerify)}
            htmlFor="repotedCandidate-modal"
            className="cursor-pointer  px-3 py-2 "
          >
            Filter
          </label>{" "}
        </div>
      </div>
      <div>
        <div className="flex flex-col overflow-x-auto">
          <div className="sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-x-auto">
                <table className="w-full text-left ">
                  <thead className="border-b font-medium bg-[#005784] ">
                    <tr>
                      <th
                        scope="col"
                        className="pl-2 w-[100px] text-[14px] text-white ml-3 font-medium py-2 border-r-[1px] border-white"
                      >
                        ID NO
                      </th>
                      <th
                        scope="col"
                        className="pl-1 w-[70px] text-[14px] text-white ml-3 font-medium py-3 border-r-[1px] border-white"
                      >
                        <img src={pro} />
                      </th>
                      <th
                        scope="col"
                        className="pl-2 w-[230px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        Candidate Name
                      </th>
                      <th
                        scope="col"
                        className="pl-2 w-[190px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        Ex. Level
                      </th>
                      <th
                        scope="col"
                        className="pl-2 w-[180px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        Mobile
                      </th>
                      <th
                        scope="col"
                        className="pl-2 w-[180px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="pl-2 w-[230px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        Expertise Area
                      </th>
                      <th
                        scope="col"
                        className="pl-2 w-[230px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        Industry
                      </th>
                      <th
                        scope="col"
                        className="pl-2 w-[180px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        Education
                      </th>
                      <th
                        scope="col"
                        className="pl-2 w-[180px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        Exp. Salary
                      </th>
                      <th
                        scope="col"
                        className="pl-2 w-[180px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        Location
                      </th>
                      <th
                        scope="col"
                        className="pl-2 w-[180px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        Reg. Date
                      </th>
                      <th
                        scope="col"
                        className="px-4 w-[100px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        <img className="w-[30px] " src={vec} />
                      </th>
                      <th
                        scope="col"
                        className="pl-2 w-[230px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>

                  {recruter
                    .filter((pre) => {
                      return search.toLocaleLowerCase() === ""
                        ? pre
                        : pre?.candidateid?.fastname === null
                        ? pre
                        : (
                            pre?.candidateid?.fastname?.toLocaleLowerCase() +
                            " " +
                            pre?.candidateid?.lastname?.toLocaleLowerCase()
                          ).includes(search) ||
                          pre?.candidateid?.lastname === null
                        ? pre
                        : pre?.candidateid?.lastname
                            .toLocaleLowerCase()
                            .includes(search) ||
                          pre?.candidateid?.number === null
                        ? pre
                        : pre?.candidateid?.number
                            .toLocaleLowerCase()
                            .includes(search) ||
                          pre?.candidatefulldetailsid?.careerPreference[0]
                            ?.functionalarea?.industryid?.industryname === null
                        ? pre
                        : pre?.candidatefulldetailsid?.careerPreference[0]?.functionalarea?.industryid?.industryname
                            .toLocaleLowerCase()
                            .includes(search) ||
                          pre?.candidatefulldetailsid?.careerPreference[0]
                            ?.functionalarea?.functionalname === null
                        ? pre
                        : pre?.candidatefulldetailsid?.careerPreference[0]?.functionalarea?.functionalname
                            .toLocaleLowerCase()
                            .includes(search) ||
                          pre?.candidatefulldetailsid?.careerPreference[0]
                            ?.division?.divisionname === null
                        ? pre
                        : pre?.candidatefulldetailsid?.careerPreference[0]?.division?.divisionname
                            .toLocaleLowerCase()
                            .includes(search);
                    })
                    .map((pre, i) => (
                      <tbody key={i}>
                        <tr className="">
                          <td className="whitespace-nowrap text-[14px] pl-2 py-1 border-2 ">
                            {i + 1}
                          </td>
                          <td className="whitespace-nowrap   px-1 py-1 border-2 ">
                            <Image
                              className="rounded rounded-full w-[31px] h-[31px]"
                              src={`https://rsapp.bringin.io/${pre?.candidateid?.image}`}
                            />
                          </td>
                          <td className="whitespace-nowrap text-[14px]  border-2 pl-2 py-1">
                            {pre?.candidateid?.fastname}{" "}
                            {pre?.candidateid?.lastname}
                          </td>
                          <td className="whitespace-nowrap text-[14px]  border-2 pl-2 py-1">
                            {pre?.candidateid?.experiencedlevel?.name}
                          </td>
                          <td className="whitespace-nowrap text-[14px]  border-2 pl-2 py-1">
                            +880 {pre?.candidateid?.number}
                          </td>
                          <td className="whitespace-nowrap text-[14px]  border-2 pl-2 py-1">
                            {pre?.candidateid?.email}
                          </td>

                          <td className="whitespace-nowrap text-[14px]  border-2 pl-2 py-1">
                            {
                              pre?.candidatefulldetailsid?.careerPreference[0]
                                ?.functionalarea?.functionalname
                            }
                          </td>

                          <td className="whitespace-nowrap text-[14px]  border-2 pl-2 py-1">
                            {
                              pre?.candidatefulldetailsid?.careerPreference[0]
                                ?.functionalarea?.industryid?.industryname
                            }
                          </td>
                          <td className="whitespace-nowrap text-[14px]  border-2 pl-2 py-1">
                            {
                              pre?.candidatefulldetailsid?.education[0]?.digree
                                ?.education?.name
                            }
                          </td>
                          <td className="whitespace-nowrap text-[14px]  border-2 pl-2 py-1">
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
                            <td className="whitespace-nowrap text-[14px]  border-2 pl-2 py-1">
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
                            <td className="whitespace-nowrap text-[14px]  border-2 pl-2 py-1"></td>
                          )}
                          <td className="whitespace-nowrap text-[14px]  border-2 pl-2 py-1">
                            {pre?.candidateid?.createdAt.slice(0, 10)}{" "}
                          </td>
                          <td className="whitespace-nowrap text-[14px]  border-2 pl-3 py-1">
                            <label
                              onClick={() => setcnadidatereportdetails(pre)}
                              htmlFor="candidatereport-details-modal"
                              className="cursor-pointer border px-3 py-1 rounded rounded-[30px]"
                            >
                              att
                            </label>
                          </td>
                          <td className="whitespace-nowrap text-[14px]  border-2 pl-2 py-1">
                            {" "}
                            <button onClick={() => handelDeeted(pre.userid)}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                </table>
              </div>
              <div className=" flex justify-between px-10 mt-10 ">
                <div>
                  <p className="text-[16px]">
                    {firstIndex + 1} - {lastIndex} of {repotedCandidate.length}
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
