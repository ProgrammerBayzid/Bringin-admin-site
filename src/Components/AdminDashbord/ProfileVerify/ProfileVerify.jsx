import { useState } from "react";
import { useEffect } from "react";
import Spinner from "../../Spinner/Spinner";
import pro from "../../../assets/commonlogo/Group (1).png";
import RejectModal from "./RejectModal";
import ProfileVerifyDetails from "./ProfileVerifyDetails";
import FilterModal from "./FilterModal";
import { Image } from "antd";
import vec from "../../../assets/commonlogo/Vector.png";
import { toast } from "react-hot-toast";
import ApproveModal from "./ApproveModal";

const ProfileVerify = () => {
  const [isLoding, setIsLoding] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [profileVerify, setProfileVerify] = useState([]);
  useEffect(() => {

    // Initialize an array to store the combined data
    const combinedData = [];

    const profileTypes = [0, 3, 4, 5, 6, 7 , 8, 9];

    // Use Promise.all to fetch data for each profile_verify_type
    Promise.all(
      profileTypes.map((type) =>
        fetch(`https://rsapp.unbolt.co/profile_verifys?profile_verify_type=${type}`)
          .then((res) => res.json())
          .then((data) => {
            // Push the data for the current type into the combinedData array
            combinedData.push(...data);
          })
          .catch((error) => {
            console.error(`Error fetching data for profile_verify_type ${type}:`, error);
          })
      )
    )
      .then(() => {
        setIsLoding(true);
        setProfileVerify(combinedData);
      });
    // Reset the update trigger after fetching the data
  }, []);

  useEffect(() => {
    if (refresh) {
      setIsLoding(false);
 
    // Initialize an array to store the combined data
    const combinedData = [];

    const profileTypes = [0, 3, 4, 5, 6, 7 , 8, 9];

    // Use Promise.all to fetch data for each profile_verify_type
    Promise.all(
      profileTypes.map((type) =>
        fetch(`https://rsapp.unbolt.co/profile_verifys?profile_verify_type=${type}`)
          .then((res) => res.json())
          .then((data) => {
            // Push the data for the current type into the combinedData array
            combinedData.push(...data);
          })
          .catch((error) => {
            console.error(`Error fetching data for profile_verify_type ${type}:`, error);
          })
      )
    )
        .then(() => {
          setIsLoding(true);
          setProfileVerify(combinedData);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setIsLoding(false);
        });
    }
  }, [refresh]);
  console.log(profileVerify);

  console.log(profileVerify);

  const [reject, setReject] = useState(null);
  const closeModal = () => {
    setReject(null);
  };
  const [aprove, setaprove] = useState(null);
  const closeaproveModal = () => {
    setaprove(null);
  };

  const [verifydetails, setverifydetails] = useState(null);
  const closeverifyModal = () => {
    setverifydetails(null);
  };

  const makeVerifide = (_id, recipientEmail) => {

    const storedToken = localStorage.getItem("admin_token");
    const token = storedToken ? storedToken.replace(/"/g, "") : null;

    if (token === null) {
      console.log("token not found");
    } else {
      try {
        fetch(`https://rsapp.unbolt.co/verifyRecruterProfile/${_id}`, {
          method: "PATCH",
          headers:{
            Authorization: `Bearer ${token}`,
          }
        })
          .then((res) => res.json())
          .then((data) => {
            if (data) {
              toast.success("Make Verify Successful.");
              setRefresh(true); // Set refresh to true to trigger data fetch
              // Use setInterval to repetitively trigger data fetch every X seconds
              const fetchInterval = setInterval(() => {
                setRefresh(true);
              }, 5000); // Fetch every 5 seconds
              // Clear the interval after a certain duration (e.g., 1 minute)
              setTimeout(() => {
                clearInterval(fetchInterval);
              }, 30000); // Clear after 1/2 minute (adjust as needed)
  
              // Call the email verification API
              fetch(
                "https://rsapp.unbolt.co/admin_recruter_profile_verify_email",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({
                    email: recipientEmail,
                  }),
                }
              )
                .then((emailRes) => emailRes.json())
                .then((emailData) => {
                  if (emailData) {
                    alert("Make Verify and Email Send Successful.");
                  }
                })
                .catch((emailError) => console.error("Email Error:", emailError));
            }
          })
          .catch((error) => console.error("API Error:", error));
      } catch (error) {
        console.error("Error:", error);
      }
    }


    console.log(_id);
    console.log(recipientEmail);
  };

  const makeReVerifide = (_id) => {
    const storedToken = localStorage.getItem("admin_token");
    const token = storedToken ? storedToken.replace(/"/g, "") : null;

    if (token === null) {
      console.log("token not found");
    } else {

      try {
        fetch(`https://rsapp.unbolt.co/rejectRecruterProfile/${_id}`, {
          method: "PATCH",
          headers:{
            Authorization: `Bearer ${token}`,

          }
        })
          .then((res) => res.json())
          .then((data) => {
            if (data) {
              toast.success("Recruter Reject Successful.");
              setRefresh(true); // Set refresh to true to trigger data fetch
              // Use setInterval to repetitively trigger data fetch every X seconds
              const fetchInterval = setInterval(() => {
                setRefresh(true);
              }, 5000); // Fetch every 5 seconds
              // Clear the interval after a certain duration (e.g., 1 minute)
              setTimeout(() => {
                clearInterval(fetchInterval);
              }, 30000); // Clear after 1/2 minute (adjust as needed)
              closeModal();
            }
          })
          .catch((error) => console.error(error));
      } catch (error) {
        console.error(error);
      }
      console.log(_id);
    }

  };

  const [search, setSearch] = useState("");
  // const [recruters, setFilterRecruters] = useState([]);

  const [items, setItems] = useState(profileVerify);

  console.log(items);

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
          : pre?.firstname === null
          ? pre
          : (
              pre?.firstname?.toLocaleLowerCase() +
              " " +
              pre?.lastname?.toLocaleLowerCase()
            ).includes(search) || pre?.designation === null
          ? pre
          : pre?.designation.toLocaleLowerCase().includes(search) ||
            pre?.number === null
          ? pre
          : pre?.number.toLocaleLowerCase().includes(search) ||
            pre?.companyname?.legal_name === null
          ? pre
          : pre?.companyname?.legal_name.toLocaleLowerCase().includes(search) ||
            pre?.companyname?.industry?.industryid?.industryname === null
          ? pre
          : pre?.companyname?.industry?.industryid?.industryname
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
      <div className="sticky  top-[13px] z-50 w-[320px]">
        <div className="flex justify-between items-center ">
          <div className="relative w-full max-w-xs">
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search by name, designation, mobile"
              className="placeholder:text-[11px] placeholder:font-normal h-[35px]  w-[260px]  pl-3 border rounded rounded-[20px]  max-w-xs outline-none"
            />
            <img
              src="/img/se.png"
              className="absolute inset-y-0 right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 "
            />
          </div>

          <div className="ml-3">
            <label htmlFor="profile-modal" className="cursor-pointer">
              <img src="/img/fi.png" className="w-[60px] h-[30px]" />
            </label>{" "}
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-col ">
          <div className="">
            <div className=" py-2   ">
              <div className="h-[620px] overflow-y-auto">
                <table className=" text-left mt-5 w-full">
                  <thead className="border-b font-medium bg-[#005784] sticky  top-[17px] z-50 ">
                    <tr classNameName="">
                      <th
                        scope="col"
                        className="text-center w-[35px] text-[14px] text-white ml-3 font-medium py-2 border-r-[1px] border-white"
                      >
                        No
                      </th>
                      <th
                        scope="col"
                        className="pl-3 w-[40px] text-[14px] text-white ml-3 font-medium py-2 border-r-[1px] border-white"
                      >
                        <img className="w-[15px]" src={pro} />
                      </th>
                      <th
                        scope="col"
                        className="text-center w-[250px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="text-center w-[240px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        Designation
                      </th>
                      <th
                        scope="col"
                        className="text-center w-[250px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="text-center w-[300px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        Company Name
                      </th>
                      <th
                        scope="col"
                        className="text-center w-[130px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        Mobile
                      </th>
                      <th
                        scope="col"
                        className="text-center w-[110px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        Company Size
                      </th>
                      <th
                        scope="col"
                        className="text-center w-[90px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        Reg. Date
                      </th>
                      <th
                        scope="col"
                        className="text-center w-[50px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        <div className="flex justify-center">
                          <img src={vec} className=" w-[15px]" />
                        </div>{" "}
                      </th>
                      <th
                        scope="col"
                        className="text-center w-[100px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        Eligibility
                      </th>
                    </tr>
                  </thead>

                  {filteredCandidates.map((pre, i) => (
                    <tbody key={i}>
                      <tr className="overflow-y-auto">
                        <td className="whitespace-nowrap text-[14px] text-center border-2 py-1  ">
                          {(currentPage - 1) * recruterPerPage + i + 1}
                        </td>
                        <td className="w-[20px] py-1 border-2  ">
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
                        <td className="whitespace-nowrap text-[14px] pl-2 border-2 py-1">
                          {pre?.designation}
                        </td>
                        <td className="whitespace-nowrap text-[14px] pl-2 border-2 py-1">
                          {pre?.email}
                        </td>
                        <td className="whitespace-nowrap text-[14px] pl-2 border-2 py-1">
                          {pre?.companyname?.legal_name}
                        </td>
                        <td className="whitespace-nowrap text-[14px] pl-2 border-2 py-1">
                          {pre?.number}
                        </td>
                        <td className="whitespace-nowrap text-[14px] pl-2 border-2 py-1">
                          {pre?.companyname?.c_size?.size}
                        </td>
                        <td className="whitespace-nowrap text-[13px]   border-2 pl-2 py-1 " >
                         <p className="tooltip tooltip-left" data-tip={pre?.createdAt.slice(11, 16)}>

                          {pre?.createdAt.slice(8, 10) +
                            "-" +
                            pre?.createdAt.slice(5, 7) +
                            "-" +
                            pre?.createdAt.slice(0, 4)}
                         </p>
                        </td>
                        <td className="whitespace-nowrap text-[14px] pl-2 border-2 py-1">
                          <label
                            onClick={() => setverifydetails(pre)}
                            htmlFor="verifi-details-modal"
                            className="cursor-pointer border px-3 py-1 rounded rounded-[30px]"
                          >
                            a
                          </label>
                        </td>
                        <td className="whitespace-nowrap text-[14px] pl-2 border-2 py-1">
                          <div className="flex justify-center px-1">
                            <div className="flex gap-1">
                              <label
                                htmlFor="aprove-modal"
                                onClick={() => setaprove(pre)}
                                className="border px-3 py-1 rounded rounded-[30px] cursor-pointer"
                              >
                                Approve
                              </label>

                              <label
                                onClick={() => setReject(pre)}
                                htmlFor="reject-modal"
                                className="cursor-pointer border px-3 py-1 rounded rounded-[30px]"
                              >
                                Reject
                              </label>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          </div>
          {/* <div className=" flex justify-between px-10 mt-10 ">
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

      <div className="flex justify-center">
        {reject && (
          <RejectModal
            title={`Are you sure you?`}
            successButtonName="Delete"
            modalData={reject}
            message={`Do you want to edit ${reject.firstname}.`}
            rejact={makeReVerifide}
            closeModal={closeModal}
          ></RejectModal>
        )}
      </div>
      <div className="flex justify-center">
        {aprove && (
          <ApproveModal
            title={`Are you sure you?`}
            successButtonName="Delete"
            modalData={aprove}
            message={`Do you want to edit ${aprove.firstname}.`}
            rejact={makeVerifide}
            closeModal={closeaproveModal}
          ></ApproveModal>
        )}
      </div>

      {verifydetails && (
        <ProfileVerifyDetails
          modalData={verifydetails}
          closeModal={closeverifyModal}
          setRefresh={setRefresh}
        ></ProfileVerifyDetails>
      )}

      <FilterModal setItems={setItems} data={profileVerify}></FilterModal>
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

export default ProfileVerify;
