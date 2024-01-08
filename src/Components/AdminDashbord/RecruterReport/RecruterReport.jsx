import { useEffect } from "react";
import { useState } from "react";
import pro from "../../../assets/commonlogo/Group (1).png";
import vec from "../../../assets/commonlogo/Vector4.png";
import { Image } from "antd";
import Spinner from "../../Spinner/Spinner";
import FilterRepoted from "./FilterRepoted";
import RecruterReportDetails from "./RecruterReportDetails";

const RecruterReport = () => {
  const [repoted, setRepoted] = useState([]);
  const [isLoding, setIsLoding] = useState(false);

  useEffect(() => {
    fetch("https://rsapp.unbolt.co/job_report")
      .then((res) => res.json())
      .then((data) => {
        setIsLoding(true);
        setRepoted(data);
        console.log(data);
      });
  }, []);
  console.log(repoted);

  const [search, setSearch] = useState("");

  const [items, setItems] = useState(repoted);

  console.log(items);

  const [recruterreportdetails, setrecruterreportdetails] = useState(null);
  const closerecruterreportModal = () => {
    setrecruterreportdetails(null);
  };

  const [currentPage, SetCurrentPage] = useState(1);
  const recruterPerPage = 50;
  const lastIndex = currentPage * recruterPerPage;
  const firstIndex = lastIndex - recruterPerPage;
  const recruter = items.slice(firstIndex, lastIndex);
  const npage = Math.ceil(items / recruterPerPage);
  // const number =[...Array(npage+1).keys()].slice(1)

  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const filterCandidates = () => {
    setFilteredCandidates(
      items.filter((pre) => {
        return search.toLocaleLowerCase() === ""
          ? pre
          : pre?.jobid?.userid?.firstname === null
          ? pre
          : (
              pre?.jobid?.userid?.firstname.toLocaleLowerCase() +
              " " +
              pre?.jobid?.userid?.lastname.toLocaleLowerCase()
            ).includes(search) || pre?.jobid?.userid?.designation === null
          ? pre
          : pre?.jobid?.userid?.designation
              .toLocaleLowerCase()
              .includes(search) || pre?.jobid?.userid?.number === null
          ? pre
          : pre?.jobid?.userid?.number.toLocaleLowerCase().includes(search);
      })
    );
  };
  useEffect(() => {
    filterCandidates(); // Call the filter function whenever the search input changes
  }, [search, items]);
  // 01716512671
  if (isLoding === false) {
    return <Spinner></Spinner>;
  }
  return (
    <div>
      <div className=" sticky  top-[13px] z-50 w-[320px]">
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
            <label htmlFor="repotedJob-modal" className="cursor-pointer">
              <img src="/img/fi.png" className="w-[60px] h-[30px]" />
            </label>{" "}
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-col ">
          <div className="sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="h-[600px] overflow-y-auto">
                <table className="w-full text-left mt-5">
                  <thead className="border-b font-medium bg-[#005784] top-[17px] z-50 ">
                    <tr>
                      <th
                        scope="col"
                        className="text-center w-[100px] text-[14px] text-white  font-medium py-2 border-r-[1px] border-white"
                      >
                        N0
                      </th>
                      <th
                        scope="col"
                        className="px-4 w-[70px] text-[14px] text-white  font-medium py-2 border-r-[1px] border-white"
                      >
                        <div className="flex justify-center">
                          <img className="w-[15px]" src={pro} />
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="text-center w-[230px] text-[14px] text-white  font-medium  border-r-[1px] border-white"
                      >
                        Recruiter Name
                      </th>
                      <th
                        scope="col"
                        className="text-center w-[190px] text-[14px] text-white  font-medium  border-r-[1px] border-white"
                      >
                        Designation
                      </th>
                      <th
                        scope="col"
                        className="text-center w-[85px] text-[14px] text-white  font-medium  border-r-[1px] border-white"
                      >
                        Mobile
                      </th>
                      <th
                        scope="col"
                        className="text-center w-[220px] text-[14px] text-white  font-medium  border-r-[1px] border-white"
                      >
                        Work Email
                      </th>
                      <th
                        scope="col"
                        className="text-center w-[230px] text-[14px] text-white  font-medium  border-r-[1px] border-white"
                      >
                        Company Name
                      </th>
                      <th
                        scope="col"
                        className="text-center w-[230px] text-[14px] text-white  font-medium  border-r-[1px] border-white"
                      >
                        Industry
                      </th>
                      <th
                        scope="col"
                        className="text-center w-[180px] text-[14px] text-white  font-medium  border-r-[1px] border-white"
                      >
                        Location
                      </th>
                      <th
                        scope="col"
                        className="text-center w-[180px] text-[14px] text-white  font-medium  border-r-[1px] border-white"
                      >
                        Reg. Date
                      </th>
                      <th
                        scope="col"
                        className="text-center w-[100px] text-[14px] text-white  font-medium  border-r-[1px] border-white"
                      >
                        Subscription
                      </th>
                      <th
                        scope="col"
                        className="text-center w-[10px] h-[10px] text-[00px] text-white  font-medium  border-r-[1px] border-white"
                      >
                        <div className="flex justify-center">
                          <img className="w-[15px] " src={vec} />
                        </div>
                      </th>
                    </tr>
                  </thead>

                  {filteredCandidates.map((pre, i) => (
                      <tbody key={i} className="overflow-y-auto">
                        <tr className="">
                          <td className="whitespace-nowrap text-[14px] text-center py-1 border-2 ">
                            {(currentPage - 1) * recruterPerPage + i + 1}
                          </td>
                          <td className="w-[50px]   py-1 border-2  ">
                            <div className="flex justify-center">
                              <Image
                                width={31}
                                height={31}
                                className="rounded rounded-full w-[30px] h-[30px]"
                                src={`https://rsapp.unbolt.co/${pre?.jobid?.userid?.image}`}
                              />
                            </div>
                          </td>
                          <td className="whitespace-nowrap text-[14px]  border-2 pl-2 py-1">
                            <a
                              href={`https://unbolt.co/profiles-recruiters/${pre?._id}`}
                              target="_blank"
                            >
                              <p className="hover:text-blue-500">
                                {pre?.jobid?.userid?.firstname}{" "}
                                {pre?.jobid?.userid?.lastname}
                              </p>
                            </a>
                          </td>
                          <td className="whitespace-nowrap text-[14px]  border-2 pl-2 py-1">
                            {pre?.jobid?.userid?.designation}
                          </td>
                          <td className="whitespace-nowrap text-[14px]  border-2 pl-2 py-1">
                            {pre?.jobid?.userid?.number}
                          </td>
                          <td className="whitespace-nowrap text-[14px]  border-2 pl-2 py-1">
                            {pre?.jobid?.userid?.email}
                          </td>
                          <td className="whitespace-nowrap text-[14px]  border-2 pl-2 py-1">
                            {pre?.jobid?.company?.legal_name}
                          </td>

                          <td className="whitespace-nowrap  text-[14px]  border-2 pl-2 py-1">
                            {
                              pre?.jobid?.company?.industry?.industryid
                                ?.industryname
                            }
                          </td>
                          <td className="whitespace-nowrap text-[14px] tooltip-trigger relative group  border-2 pl-2 py-1">
                            {pre?.jobid?.company?.c_location?.formet_address.slice(
                              0,
                              20
                            )}
                            <p className="tooltip absolute bg-[#0077B5] text-white p-2 rounded-md -mt-2 invisible group-hover:opacity-100 group-hover:visible transition -left-56 top-1/2 transform translate-y-[5%] z-40">
                              {pre?.jobid?.company?.c_location?.formet_address}
                            </p>
                          </td>
                          <td className="whitespace-nowrap text-[14px]  border-2 pl-2 py-1">
                            {pre?.createdAt.slice(8, 10) +
                              "-" +
                              pre?.createdAt.slice(5, 7) +
                              "-" +
                              pre?.createdAt.slice(0, 4)}
                          </td>
                          <td className="whitespace-nowrap text-[14px]  border-2 pl-2 py-1">
                            {pre?.jobid?.userid?.other?.premium === false
                              ? "Free User"
                              : "Premium"}
                          </td>
                          <td className="whitespace-nowrap text-[14px]  border-2 pl-1 py-1">
                            <label
                              onClick={() => setrecruterreportdetails(pre)}
                              htmlFor="recruterreport-details-modal"
                              className="cursor-pointer border px-2 py-1 rounded rounded-[30px]"
                            >
                              att
                            </label>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                </table>
              </div>
              {/* <div className=" flex justify-between px-10 mt-10 ">
                <div>
                  <p className="text-[16px]">
                    {Math.min(firstIndex + 1, repoted.length)} -{" "}
                    {Math.min(lastIndex, repoted.length)} of {repoted.length} -{" "}
                    Page {currentPage} of{" "}
                    {Math.ceil(repoted.length / recruterPerPage)},
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

      {recruterreportdetails && (
        <RecruterReportDetails
          modalData={recruterreportdetails}
          closeModal={closerecruterreportModal}
        ></RecruterReportDetails>
      )}

      <FilterRepoted setItems={setItems} data={repoted}></FilterRepoted>
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

export default RecruterReport;

// return (
//   <div>
//     <div>
//       <div>
//         <div className="flex flex-col">
//           <div className=" ">
//             <div className="inline-block min-w-full py-2 ">
//               <div className="overflow-hidden">
//                 <table className="min-w-full text-left text-sm font-light w-[1000px]">
//                   <thead className="border-b text-[18px] bg-gray-100 font-medium dark:border-neutral-500 ">
//                     <tr>
//                       <th scope="col" className="px-6 py-4">
//                         No
//                       </th>
//                       <th scope="col" className="px-6 py-4">
//                         Job Title{" "}
//                       </th>
//                       <th scope="col" className="px-6 py-4">
//                         Name
//                       </th>
//                       <th scope="col" className="px-6 py-4">
//                         Email
//                       </th>
//                       <th scope="col" className="px-6 py-4">
//                         Number
//                       </th>
//                       <th scope="col" className="px-6 py-4 text-center">
//                         Action
//                       </th>
//                     </tr>
//                   </thead>
//                   {repoted.map((candi, i) => (
//                     <tbody
//                       className="text-[15px] bg-gray-50"
//                       key={candi._id}
//                       onDragStart={(e) => (dragItem.current = i)}
//                       onDragEnter={(e) => (dragOverItem.current = i)}
//                       onDragEnd={handelSort}
//                       draggable
//                     >
//                       <tr className="border-b dark:border-neutral-500">
//                         <td className="whitespace-nowrap px-6 py-4 font-medium">
//                           {i + 1}
//                         </td>
//                         <td className="whitespace-nowrap px-6 py-4 font-medium">
//                           <div>
//                               {
//                                   candi?.jobid?.job_title?
//                                   <p>{candi?.jobid?.job_title}</p>: <p>Null</p>
//                               }
//                           </div>
//                         </td>
//                         <td className="whitespace-nowrap px-6 py-4 font-medium">
//                           <div>
//                               {candi?.jobid?.userid?

//                             <p className="my-2">
//                               {candi?.jobid?.userid?.firstname}{" "}
//                               {candi?.jobid?.userid?.lastname}
//                             </p>: <p>Null</p>
//                               }
//                           </div>
//                         </td>
//                         <td className="whitespace-nowrap px-6 py-4 font-medium">
//                           <div>
//                             {candi?.jobid?.userid?.email? (
//                               <p className="my-2">
//                                 {candi?.jobid?.userid?.email}
//                               </p>
//                             ) : (
//                               <p>Null</p>
//                             )}
//                           </div>
//                         </td>
//                         <td className="whitespace-nowrap px-6 py-4 font-medium">
//                           <div>
//                             {candi?.jobid?.userid?.number? (
//                               <p className="my-2">
//                                 {candi?.jobid?.userid?.number}
//                               </p>
//                             ) : (
//                               <p>Null</p>
//                             )}
//                           </div>
//                         </td>
//                         <td className="whitespace-nowrap px-6 py-4 text-center">
//                           <Link to={ `/dashboard/reacruterLayout/recruter_ob_report_details/${candi._id}`}>

//                           <button className="bg-cyan-400	p-2 border rounded text-white font-bold">
//                             View Details
//                           </button>
//                           </Link>
//                         </td>
//                       </tr>
//                     </tbody>
//                   ))}
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div></div>
//     </div>
//   </div>
// );
