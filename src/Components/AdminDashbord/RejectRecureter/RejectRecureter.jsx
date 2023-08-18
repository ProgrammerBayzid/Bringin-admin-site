import { useState } from "react";
import { useEffect } from "react";
import Spinner from "../../Spinner/Spinner";
import RecruterRejectModal from "./RecruterRejectModal";
import ProfileVerifyDetails from "../ProfileVerify/ProfileVerifyDetails";
import pro from "../../../assets/commonlogo/Group (1).png";
import FilterRejectRecruter from "./FilterRejectRecruter";
import { Image } from "antd";
const RejectRecureter = () => {
  const [isLoding, setIsLoding] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [profileVerify, setProfileVerify] = useState([]);
  useEffect(() => {
    fetch("https://rsapp.bringin.io/profile_verifys?profile_verify_type=2")
      .then((res) => res.json())
      .then((data) => {
        setIsLoding(true);
        setProfileVerify(data);
        console.log(data);
      });
  }, [refresh]);
  console.log(profileVerify);

  const [remove, setremove] = useState(null);
  const closeModal = () => {
    setremove(null);
  };

  const [verifydetails, setverifydetails] = useState(null);
  const closeverifyModal = () => {
    setverifydetails(null);
  };

  const makeVerifirejectrecruter = (_id) => {
    try {
      fetch(`https://rsapp.bringin.io/verifyRecruterProfile/${_id}`, {
        method: "PATCH",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            alert("Make Verifiy Successful.");
            setRefresh(true);
          }
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.error(error);
    }
    console.log(_id);
  };

  const [search, setSearch] = useState("");

  const [items, setItems] = useState(profileVerify);
  const [currentPage, SetCurrentPage] = useState(1);
  const recruterPerPage = 50;
  const lastIndex = currentPage * recruterPerPage;
  const firstIndex = lastIndex - recruterPerPage;
  const recruter = items.slice(firstIndex, lastIndex);
  const npage = Math.ceil(items / recruterPerPage);
  // const number =[...Array(npage+1).keys()].slice(1)

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
        <div className="w-[64px] h-[36px] flex fustify-between btn border border-1 bg-white ">
          {/* <img className="w-5 h-5" src={f} /> */}
          <label
            // onClick={() => setFilterRecruters(profileVerify)}
            htmlFor="rejectprofile-modal"
            className="cursor-pointer border px-3 py-2 rounded rounded-[30px]"
          >
            Filter
          </label>
        </div>
      </div>
      <div>
        <div className="flex flex-col overflow-x-auto">
          <div className="sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:pl-3  lg:px-8">
              <div className="overflow-x-auto">
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
                        className="pl-2 w-[40px] text-[14px] text-white ml-3 font-medium py-3 border-r-[1px] border-white"
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
                        className="pl-3 w-[230px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        Company Name
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
                        Company Size
                      </th>
                      <th
                        scope="col"
                        className="pl-3 w-[180px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        Attachments
                      </th>
                      <th
                        scope="col"
                        className="pl-3 w-[230px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        Eligibility
                      </th>
                    </tr>
                  </thead>

                  {recruter
                    .filter((pre) => {
                      return  search.toLocaleLowerCase() === ""
                      ? pre
                      : pre?.firstname===null? pre:
                      (
                          pre?.firstname?.toLocaleLowerCase() +
                          " " +
                          pre?.lastname?.toLocaleLowerCase()
                        ).includes(search) ||
                          pre?.designation===null? pre :
                          pre?.designation.toLocaleLowerCase()
                            .includes(search) ||
                          pre?.number===null? pre:pre?.number.toLocaleLowerCase().includes(search);
                    })
                    .map((pre, i) => (
                      <tbody key={i}>
                        <tr className="">
                          <td className="whitespace-nowrap text-[14px] pl-3 border-2 py-1  ">
                            {i + 1}
                          </td>
                          <td className="w-[20px]   py-1 border-2  ">
                            <Image
                              className="rounded rounded-full "
                              src={`https://rsapp.bringin.io/${pre?.image}`}
                            />
                          </td>
                          <td className="whitespace-nowrap text-[14px] pl-3 border-2 py-1">
                            {pre?.firstname} {pre?.lastname}
                          </td>
                          <td className="whitespace-nowrap text-[14px] pl-3 border-2 py-1">
                            {pre?.designation}
                          </td>
                          <td className="whitespace-nowrap text-[14px] pl-3 border-2 py-1">
                            {pre?.companyname?.legal_name}
                          </td>
                          <td className="whitespace-nowrap text-[14px] pl-3 border-2 py-1">
                            +880 {pre?.number}
                          </td>
                          <td className="whitespace-nowrap text-[14px] pl-3 border-2 py-1">
                            {pre?.companyname?.c_size?.size}
                          </td>
                          <td className="whitespace-nowrap text-[14px] pl-3 border-2 py-1">
                            <label
                              onClick={() => setverifydetails(pre)}
                              htmlFor="verifi-details-modal"
                              className="cursor-pointer border px-3 py-2 rounded rounded-[30px]"
                            >
                              att
                            </label>
                          </td>
                          <td className="whitespace-nowrap text-[14px] pl-3 border-2 py-1">
                            <div className="flex gap-1">
                              <button
                                onClick={() =>
                                  makeVerifirejectrecruter(pre?._id)
                                }
                                className="border px-3 py-2 rounded rounded-[30px]"
                              >
                                Approve
                              </button>

                              <label
                                onClick={() => setremove(pre)}
                                htmlFor="reject-modal"
                                className="cursor-pointer border px-3 py-2 rounded rounded-[30px]"
                              >
                                Remove
                              </label>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                </table>
              </div>
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
        ></RecruterRejectModal>
      )}

      {verifydetails && (
        <ProfileVerifyDetails
          modalData={verifydetails}
          closeModal={closeverifyModal}
        ></ProfileVerifyDetails>
      )}

      <FilterRejectRecruter
        setItems={setItems}
        data={profileVerify}
      ></FilterRejectRecruter>
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

export default RejectRecureter;
