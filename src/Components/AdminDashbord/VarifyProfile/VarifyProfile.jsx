import { useEffect, useState } from "react";
import Spinner from "../../Spinner/Spinner";
import pro from "../../../assets/commonlogo/Group (1).png";
import vec from "../../../assets/commonlogo/Vector.png";
import { Image } from "antd";
import ProfileVerifyDetails from "../ProfileVerify/ProfileVerifyDetails";
import FilterVerifyRecruter from "./FilterVerifyRecruter";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-hot-toast";
import RecruterRejectModal from "../RejectRecureter/RecruterRejectModal";
import { Link } from "react-router-dom";

const VarifyProfile = () => {
  const [isLoding, setIsLoding] = useState(false);
  const [refresh, setRefresh] = useState(true);

  const [profileVerify, setProfileVerify] = useState([]);
  useEffect(() => {
    fetch("https://rsapp.unbolt.co/profile_verifys?profile_verify_type=1")
      .then((res) => res.json())
      .then((data) => {
        setIsLoding(true);
        setProfileVerify(data);
        console.log(data);
      });
    // Reset the update trigger after fetching the data
  }, []);

  console.log("profileVerify",profileVerify);
  const recall = () => {
    setIsLoding(false);
    fetch("https://rsapp.unbolt.co/profile_verifys?profile_verify_type=1")
      .then((res) => res.json())
      .then((data) => {
        setIsLoding(true);
        setProfileVerify(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoding(false);
      });
  };

  const handelDeeted = (recruiterId) => {
    fetch(`https://rsapp.unbolt.co/recruiter_deletes/${recruiterId}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("admin_token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          toast.success("Delete Successful.");
          recall();
        }
      });
    console.log(recruiterId);
  };

  const [verifydetails, setverifydetails] = useState(null);
  const closeverifyModal = () => {
    setverifydetails(null);
  };

  console.log(verifydetails);

  const [search, setSearch] = useState("");

  const [items, setItems] = useState(profileVerify);

  console.log(items);

  const [currentPage, SetCurrentPage] = useState(1);
  const recruterPerPage = 50;
  const lastIndex = currentPage * recruterPerPage;
  const firstIndex = lastIndex - recruterPerPage;
  const recruter = items.slice(firstIndex, lastIndex);
  const npage = Math.ceil(items / recruterPerPage);
  // const number =[...Array(npage+1).keys()].slice(1)
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
          : pre?.firstname === null
          ? pre
          : (
              pre?.firstname?.toLocaleLowerCase() +
              " " +
              pre?.lastname?.toLocaleLowerCase()
            ).includes(search) || pre?.lastname === null
          ? pre
          : pre?.lastname.toLocaleLowerCase().includes(search) ||
            pre?.designation === null
          ? pre
          : pre?.designation.toLocaleLowerCase().includes(search) ||
            pre?.number === null
          ? pre
          : pre?.number.toLocaleLowerCase().includes(search)|| pre?.companyname?.legal_name === null
          ? pre
          : pre?.companyname?.legal_name.toLocaleLowerCase().includes(search) ||   pre?.companyname?.industry?.industryid?.industryname          === null
          ? pre
          : pre?.companyname?.industry?.industryid?.industryname .toLocaleLowerCase().includes(search);
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
      <div className="sticky  top-[13px] z-50 w-[320px]">
        <div className="flex justify-between items-center   ">
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
            <label htmlFor="verifyprofile-modal" className="cursor-pointer">
              <img src="/img/fi.png" className="w-[60px] h-[30px]" />
            </label>{" "}
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-col ">
          <div className="sm:-mx-6 lg:-mx-2">
            <div className="inline-block w-full py-2 sm:px-6 lg:px-2">
              <div className="h-[600px] overflow-y-auto">
                <table className="w-full text-left mt-5 ">
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
                        Recruiter Name
                      </th>
                      <th
                        scope="col"
                        className="text-center w-[200px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        Designation
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
                        Work Email
                      </th>
                      <th
                        scope="col"
                        className="text-center w-[230px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        Company Name
                      </th>
                      <th
                        scope="col"
                        className="text-center w-[80px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        Industry
                      </th>
                      <th
                        scope="col"
                        className="text-center w-[150px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        Location
                      </th>
                      <th
                        scope="col"
                        className="text-center w-[100px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        Reg. Date
                      </th>
                      <th
                        scope="col"
                        className="text-center w-[40px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        <div className="flex justify-center">
                          <img src={vec} className=" w-[15px]" />
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="text-center w-[40px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        <div className="flex justify-center">
                          <p>JP</p>
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
                    <tbody key={i}>
                      <tr className="overflow-y-auto">
                        <td className="whitespace-nowrap text-[13px] text-center py-1 border-2 ">
                          {(currentPage - 1) * recruterPerPage + i + 1}
                        </td>
                        <td className="whitespace-nowrap  px-1 py-1 border-2 ">
                          <Image
                            width={31}
                            height={31}
                            className="rounded rounded-full"
                            src={`https://rsapp.unbolt.co/${pre?.image}`}
                          />
                        </td>
                        <td className="whitespace-nowrap  text-[13px]  border-2 pl-2 py-1">
                          <a
                            href={`https://unbolt.co/profiles-recruiters/${pre?._id}`}
                            target="_blank"
                          >
                            <p className="hover:text-blue-500">
                              {" "}
                              {pre?.firstname} {pre?.lastname}
                            </p>
                          </a>
                        </td>
                        <td className="whitespace-nowrap text-[13px]  border-2 pl-2 py-1">
                          {pre?.designation}
                        </td>
                        <td className="whitespace-nowrap text-[13px]  border-2 pl-2 py-1">
                          {pre?.number}
                        </td>
                        <td className="whitespace-nowrap text-[13px]  border-2 pl-2 py-1">
                          {pre?.email}
                        </td>
                        <td className="whitespace-nowrap text-[13px]  border-2 pl-2 py-1">
                          {pre?.companyname?.legal_name}
                        </td>
                        <td className="whitespace-nowrap tooltip-trigger relative group text-[13px]  border-2 pl-2 py-1">
                          {pre?.companyname?.industry?.industryid?.industryname.slice(
                            0,
                            7
                          )}
                          ...
                          <p className="tooltip absolute z-40 bg-[#0077B5] text-white p-2 rounded-md -mt-2 invisible group-hover:opacity-100 group-hover:visible transition">
                            {
                              pre?.companyname?.industry?.categoryname
                            }
                          </p>
                        </td>
                        <td className="whitespace-nowrap tooltip-trigger relative group text-[13px]  border-2 pl-2 py-1">
                          {pre?.companyname?.c_location?.locationoptional
                            ? pre?.companyname?.c_location?.locationoptional.slice(
                                0,
                                10
                              )
                            : ""}
                          <p className="tooltip absolute bg-[#0077B5] text-white p-2 rounded-md -mt-2 invisible group-hover:opacity-100 group-hover:visible transition -left-56 top-1/2 transform translate-y-[5%] z-40">
                            {pre?.companyname?.c_location?.formet_address}
                            <p>
                              {pre?.companyname?.c_location?.divisiondata?.divisionname &&
                              pre?.companyname?.c_location?.divisiondata?.divisionname
                                ? pre.companyname.c_location.divisiondata?.divisionname +
                                  ", " +
                                  pre.companyname.c_location.divisiondata?.cityid?.name
                                : pre?.companyname?.c_location?.divisiondata?.cityid?.name ||
                                  pre?.companyname?.c_location?.divisiondata?.cityid?.name ||
                                  ""}
                            </p>
                          </p>
                        </td>
                        <td className="whitespace-nowrap text-[13px]   border-2 pl-2 py-1">
                          {pre?.createdAt.slice(8, 10) +
                            "-" +
                            pre?.createdAt.slice(5, 7) +
                            "-" +
                            pre?.createdAt.slice(0, 4)}
                        </td>
                        <td className="whitespace-nowrap text-[13px]  border-2  py-1 w-[50px]  ">
                          <div className="flex justify-center">
                            <label
                              onClick={() => setverifydetails(pre)}
                              htmlFor="verifi-details-modal"
                              className="cursor-pointer border px-2 py-1 rounded rounded-[30px] "
                            >
                              a
                            </label>
                          </div>
                        </td>
                        <td className="whitespace-nowrap text-[13px]   border-2 pl-2 py-1">
                         <Link to={`/verification/recruter_job_post/${pre?._id}`}>
                         JP
                         </Link>
                        </td>
                        <td className="whitespace-nowrap text-[14px]  border-2  py-1">
                          <div className=" flex justify-center">
                            <label
                              onClick={() => setremove(pre)}
                              htmlFor="reject-modal"
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
              {/* <div className=" flex justify-between px-10 mt-5 ">
                <div>
                  <p className="text-[16px]">
                    {Math.min(firstIndex + 1, profileVerify.length)} -{" "}
                    {Math.min(lastIndex, profileVerify.length)} of{" "}
                    {profileVerify.length} - Page {currentPage} of{" "}
                    {Math.ceil(profileVerify.length / recruterPerPage)},{" "}
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
      {verifydetails && (
        <ProfileVerifyDetails
          modalData={verifydetails}
          closeModal={closeverifyModal}
        ></ProfileVerifyDetails>
      )}
      {remove && (
        <RecruterRejectModal
          title={`Are you sure you?`}
          successButtonName="Delete"
          modalData={remove}
          message={`Do you want to edit ${remove.firstname}.`}
          // add={editskill}
          setProfileVerify={setProfileVerify}
          profileVerify={profileVerify}
          closeModal={closeModal}
          recall={recall}
        ></RecruterRejectModal>
      )}

      <FilterVerifyRecruter
        setItems={setItems}
        data={profileVerify}
      ></FilterVerifyRecruter>
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

export default VarifyProfile;
