import { useEffect, useState } from "react";
import Spinner from "../../Spinner/Spinner";
import pro from "../../../assets/commonlogo/Group (1).png";
import { Image } from "antd";
import { AiFillDelete } from "react-icons/ai";

import FilterVerifyRecruter from "../VarifyProfile/FilterVerifyRecruter";

const AllRecruter = () => {
  const [isLoding, setIsLoding] = useState(false);
  const [refresh, setRefresh] = useState(true);

  const [profileVerify, setProfileVerify] = useState([]);
  useEffect(() => {
    fetch("https://rsapp.unbolt.co/admin_all_recruter_profile")
      .then((res) => res.json())
      .then((data) => {
        setIsLoding(true);
        setProfileVerify(data);
        console.log(data);
      });
  }, [refresh]);
  console.log(profileVerify);

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

  const handelDeeted = (recruiterId) => {
    const proced = window.confirm("Are You Sure");
    if (proced) {
      fetch(`https://rsapp.unbolt.co/recruiter_deletes/${recruiterId}`, {
        method: "DELETE",
        headers: {
          authorization: `bearer ${localStorage.getItem("admin_token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data > 0) {
            // Remove the deleted candidate from the candidate list
            const updatedCandidates = profileVerify.filter(
              (c) => c._id !== recruiterId
            );
            setProfileVerify(updatedCandidates);
            setRefresh(!refresh);
            alert("Deleted successfully");
          }
        });
      console.log(recruiterId);
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
            htmlFor="verifyprofile-modal"
            className="cursor-pointer  px-3 py-2 "
          >
            Filter
          </label>{" "}
        </div>
      </div>
      <div>
        <div className="flex flex-col ">
          <div className="sm:-mx-6 lg:-mx-2">
            <div className="inline-block w-full py-2 sm:px-6 lg:px-2">
              <div className="">
                <table className="w-full text-left ">
                  <thead className="border-b font-medium bg-[#005784] ">
                    <tr>
                      <th
                        scope="col"
                        className="pl-3 w-[100px] text-[14px] text-white ml-3 font-medium py-2 border-r-[1px] border-white"
                      >
                        ID NO
                      </th>
                      <th
                        scope="col"
                        className="pl-3 w-[70px] text-[14px] text-white  font-medium py-3 border-r-[1px] border-white"
                      >
                        <img src={pro} />
                      </th>
                      <th
                        scope="col"
                        className="pl-3 w-[230px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        Recruiter Name
                      </th>
                      <th
                        scope="col"
                        className="pl-3 w-[190px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        Designation
                      </th>
                      <th
                        scope="col"
                        className="pl-3 w-[180px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        Mobile
                      </th>
                      <th
                        scope="col"
                        className="pl-3 w-[180px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        Work Email
                      </th>
                      <th
                        scope="col"
                        className="pl-3 w-[230px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        Company Name
                      </th>
                      <th
                        scope="col"
                        className="pl-3 w-[230px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        Industry
                      </th>
                      <th
                        scope="col"
                        className="pl-3 w-[180px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        Location
                      </th>
                      <th
                        scope="col"
                        className="pl-3 w-[180px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        Reg. Date
                      </th>
                      <th
                        scope="col"
                        className="pl-3 w-[180px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        Profile
                      </th>
                      <th
                        scope="col"
                        className="pl-3 w-[100px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        Actoin{" "}
                      </th>
                    </tr>
                  </thead>

                  {recruter
                    .filter((pre) => {
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
                        : pre?.designation
                            .toLocaleLowerCase()
                            .includes(search) || pre?.number === null
                        ? pre
                        : pre?.number.toLocaleLowerCase().includes(search);
                    })
                    .map((pre, i) => (
                      <tbody key={i}>
                        <tr className="">
                          <td className="whitespace-nowrap text-[14px] pl-3 py-1 border-2 ">
                            {i + 1}
                          </td>
                          <td className="whitespace-nowrap  px-1 py-1 border-2 ">
                            <Image
                              width={31}
                              height={31}
                              className="rounded rounded-full"
                              src={`https://rsapp.unbolt.co/$${pre?.image}`}
                            />
                          </td>
                          <td className="whitespace-nowrap text-[14px]  border-2 pl-3 py-1">
                            {pre?.firstname} {pre?.lastname}
                          </td>
                          <td className="whitespace-nowrap text-[14px]  border-2 pl-3 py-1">
                            {pre?.designation}
                          </td>
                          <td className="whitespace-nowrap text-[14px]  border-2 pl-3 py-1">
                            {pre?.number}
                          </td>
                          <td className="whitespace-nowrap text-[14px]  border-2 pl-3 py-1">
                            {pre?.email}
                          </td>
                          <td className="whitespace-nowrap text-[14px]  border-2 pl-3 py-1">
                            {pre?.companyname?.legal_name}
                          </td>
                          <td className="whitespace-nowrap text-[14px]  border-2 pl-3 py-1">
                            {
                              pre?.companyname?.industry?.industryid
                                ?.industryname
                            }
                          </td>
                          <td className="whitespace-nowrap text-[14px]  border-2 pl-3 py-1">
                            {pre?.companyname?.c_location?.city},{" "}
                            {pre?.companyname?.c_location?.division}
                          </td>
                          <td className="whitespace-nowrap text-[14px]  border-2 pl-3 py-1">
                            {pre?.createdAt.slice(0, 10)}
                          </td>
                          <td className="whitespace-nowrap text-[13px]  border-2 pl-2 py-1">
                            <a
                              href={`https://unbolt.co/profiles-recruiters/${pre?._id}`}
                              target="_blank"
                            >
                              <p className="text-blue-500">Profile</p>
                            </a>
                          </td>

                          <td className="whitespace-nowrap text-[13px]  ">
                            <button onClick={() => handelDeeted(pre?._id)}>
                              <AiFillDelete className="text-red-500"></AiFillDelete>
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
                    {firstIndex + 1} - {lastIndex} of {profileVerify.length}
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

export default AllRecruter;
