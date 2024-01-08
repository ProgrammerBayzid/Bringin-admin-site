import { useState } from "react";
import { useEffect } from "react";
import Spinner from "../../Spinner/Spinner";
import pro from "../../../assets/commonlogo/Group (1).png";
import { Image } from "antd";
import vec from "../../../assets/commonlogo/Vector.png";
import { toast } from "react-hot-toast";
import { AiFillDelete } from "react-icons/ai";
import PubliceJobModal from "./PubliceJobModal";
import JobPostDeleteModal from "./JobPostDeleteModal";
import FilterJob from "./FilterJob";

const RejectedJobPost = () => {
  const [isLoding, setIsLoding] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [jobPost, setjobPost] = useState([]);

  useEffect(() => {
    fetch("https://rsapp.unbolt.co/admin/job_list?job_hidden=true")
      .then((res) => res.json())
      .then((data) => {
        setIsLoding(true);
        setjobPost(data);
        console.log(data);
      });
    // Reset the update trigger after fetching the data
  }, []);
  useEffect(() => {
    if (refresh) {
      setIsLoding(false);
      fetch("https://rsapp.unbolt.co/admin/job_list?job_hidden=true")
        .then((res) => res.json())
        .then((data) => {
          setIsLoding(true);
          setjobPost(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setIsLoding(false);
        });
    }
  }, [refresh]);
  console.log(jobPost);

  console.log(jobPost);

  const [reject, setReject] = useState(null);
  const closeModal = () => {
    setReject(null);
  };

  const [remove, setremove] = useState(null);
  const closeremoveModal = () => {
    setremove(null);
  };

  const makeDelete = (_id, recipientEmail) => {
    const storedToken = localStorage.getItem("admin_token");
    const token = storedToken ? storedToken.replace(/"/g, "") : null;

    if (token === null) {
      console.log("token not found");
    } else {


      try {
        fetch(`https://rsapp.unbolt.co/admin/job_delete/${_id}`, {
          method: "PATCH",
          headers:{
            Authorization: `Bearer ${token}`,
  
          }
        })
          .then((res) => res.json())
          .then((data) => {
            if (data) {
              toast.success("Delete Successful.");
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
      console.log(_id);
      console.log(recipientEmail);
    }
  };

  const makeRejected = (_id) => {
    const storedToken = localStorage.getItem("admin_token");
    const token = storedToken ? storedToken.replace(/"/g, "") : null;

    if (token === null) {
      console.log("token not found");
    } else {

      try {
        fetch(`https://rsapp.unbolt.co/job_hidden_false/${_id}`, {
          method: "PATCH",
          headers:{
            Authorization: `Bearer ${token}`,
  
          }
        })
          .then((res) => res.json())
          .then((data) => {
            if (data) {
              toast.success("Job Publish            Successful.");
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

  const [items, setItems] = useState(jobPost);

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
        : pre?.userid?.firstname === null
        ? pre
        : (
            pre?.userid?.firstname?.toLocaleLowerCase() +
            " " +
            pre?.userid?.lastname?.toLocaleLowerCase()
          ).includes(search) || pre?.userid?.designation === null
        ? pre
        : pre?.userid?.designation.toLocaleLowerCase().includes(search) ||
          pre?.userid?.number === null
        ? pre
        : pre?.userid?.number.toLocaleLowerCase().includes(search) ||
          pre?.expertice_area?.industryid?.industryname === null
        ? pre
        : pre?.expertice_area?.industryid?.industryname
            .toLocaleLowerCase()
            .includes(search) || pre?.expertice_area?.functionalname === null
        ? pre
        : pre?.expertice_area?.functionalname
            .toLocaleLowerCase()
            .includes(search) || pre?.job_title === null
        ? pre
        : pre?.job_title.toLocaleLowerCase().includes(search);
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
              className="placeholder:text-[11px] placeholder:font-normal h-[35px]  w-[260px] pl-3 border  rounded rounded-[20px]   max-w-xs outline-none"
            />
            <img
              src="/img/se.png"
              className="absolute inset-y-0 right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 "
            />
          </div>

          <div className="ml-3">
            <label htmlFor="Jobpost-filter" className="cursor-pointer">
              <img src="/img/fi.png" className="w-[60px] h-[30px]" />
            </label>{" "}
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-col ">
          <div className="">
            <div className=" py-2   lg:px-8">
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
                        className="text-center w-[230px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="text-center w-[220px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        Job Title
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
                        Company Name
                      </th>
                      <th
                        scope="col"
                        className="text-center w-[120px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        Mobile
                      </th>
                      <th
                        scope="col"
                        className="text-center w-[150px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        Company Size
                      </th>
                      <th
                        scope="col"
                        className="text-center w-[150px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        Post Date
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
                        <div className="flex justify-center">
                          <AiFillDelete className="text-red-500 text-[15px]"></AiFillDelete>
                        </div>
                      </th>
                    </tr>
                  </thead>

                  {items.map((pre, i) => (
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
                            src={`https://rsapp.unbolt.co/${pre?.userid?.image}`}
                          />
                        </td>
                        <td className="whitespace-nowrap  text-[13px]  border-2 pl-2 py-1">
                          <a
                            href={`https://unbolt.co/profiles-recruiters/${pre?.userid?._id}`}
                            target="_blank"
                          >
                            <p className="hover:text-blue-500">
                              {" "}
                              {pre?.userid?.firstname} {pre?.userid?.lastname}
                            </p>
                          </a>
                        </td>
                        <td className="whitespace-nowrap text-[14px] pl-2 border-2 py-1 hover:text-blue-500">
                          <a
                            href={`https://unbolt.co/job-details/${pre?._id}`}
                            target="_blank"
                          >
                            {pre?.job_title}
                          </a>
                        </td>
                        <td className="whitespace-nowrap text-[14px] pl-2 border-2 py-1">
                          {pre?.userid?.email}
                        </td>
                        <td className="whitespace-nowrap text-[14px] pl-2 border-2 py-1">
                          {pre?.company?.legal_name}
                        </td>
                        <td className="whitespace-nowrap text-[14px] pl-2 border-2 py-1">
                          {pre?.userid?.number}
                        </td>
                        <td className="whitespace-nowrap text-[14px] pl-2 border-2 py-1">
                          {pre?.company?.c_size?.size}
                        </td>
                        <td className="whitespace-nowrap text-[14px] pl-2 border-2 py-1">
                          {pre?.createdAt.slice(8, 10) +
                            "-" +
                            pre?.createdAt.slice(5, 7) +
                            "-" +
                            pre?.createdAt.slice(0, 4)}
                        </td>
                        <td className="whitespace-nowrap text-[14px] pl-2 border-2 py-1">
                          <div className="flex justify-center px-1">
                            <div className=" ">
                              <label
                                onClick={() => setReject(pre)}
                                htmlFor="job-Publish-modal"
                                className="cursor-pointer border px-3 py-1 rounded rounded-[30px]"
                              >
                                Publish
                              </label>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap text-[14px] pl-2 border-2 py-1">
                          <div className="flex justify-center px-1">
                          <label
                              onClick={() => setremove(pre)}
                              htmlFor="job-delete-modal"
                              className="cursor-pointer border px-3 py-1 rounded rounded-[30px]"
                            >

                            <AiFillDelete
                              className="text-red-500 text-[15px]"
                            ></AiFillDelete>
                            </label>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        {reject && (
          <PubliceJobModal
            title={`Are you sure you?`}
            successButtonName="Delete"
            modalData={reject}
            message={`Do you want to edit ${reject.firstname}.`}
            rejact={makeRejected}
            closeModal={closeModal}
          ></PubliceJobModal>
        )}
      </div>
      <div className="flex justify-center">
        {remove && (
           <JobPostDeleteModal
           title={`Are you sure you?`}
           modalData={remove}
           remove={makeDelete}
           closeModal={closeremoveModal}
         ></JobPostDeleteModal>
        )}
      </div>

      <FilterJob setItems={setItems} data={jobPost}></FilterJob>
    </div>
  );
};

export default RejectedJobPost;
