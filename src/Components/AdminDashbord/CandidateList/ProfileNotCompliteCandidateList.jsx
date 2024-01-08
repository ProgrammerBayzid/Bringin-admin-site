import { useEffect, useState } from "react";
import Spinner from "../../Spinner/Spinner";
import pro from "../../../assets/commonlogo/Group (1).png";
import vec from "../../../assets/commonlogo/Vector.png";
import { Image } from "antd";
import { AiFillDelete } from "react-icons/ai";
import App from "../../../App.css";
import NotCompliteCandidateDelete from "./NotCompliteCandidateDelete";
import NotCompliteProfileSendMassage from "./NotCompliteProfileSendMassage";
import NotCompliteCandidateSendMassageInOneTime from "./NotCompliteCandidateSendMassageInOneTime";

const ProfileNotCompliteCandidateList = () => {
  const [isLoding, setIsLoding] = useState(false);

  const [candidate, setcandidate] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3002/profile_not_complete_seeker")
      .then((res) => res.json())
      .then((data) => {
        setIsLoding(true);
        setcandidate(data.notCompliteProfileChannelChat);
        console.log(data.notCompliteProfileChannelChat);
      });
  }, []);
  console.log(candidate);
  const recall = () => {
    setIsLoding(false);
    fetch("http://localhost:3002/profile_not_complete_seeker")
      .then((res) => res.json())
      .then((data) => {
        setIsLoding(true);
        setcandidate(data.notCompliteProfileChannelChat);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoding(false);
      });
  };

  const [search, setSearch] = useState("");

  const items = candidate;

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

  const [filteredCandidates, setFilteredCandidates] = useState([]);

  const filterCandidates = () => {
    setFilteredCandidates(
      items.filter((pre, i) => {
        return search.toLocaleLowerCase() === ""
          ? pre
          : pre?.seekerid?.fastname === null
          ? pre
          : (
              pre?.seekerid?.fastname?.toLocaleLowerCase() +
              " " +
              pre?.seekerid?.lastname?.toLocaleLowerCase()
            ).includes(search) || pre?.seekerid?.lastname === null
          ? pre
          : pre?.seekerid?.lastname.toLocaleLowerCase().includes(search) ||
            pre?.seekerid?.number === null
          ? pre
          : pre?.seekerid?.number.toLocaleLowerCase().includes(search);
      })
    );
  };

  useEffect(() => {
    filterCandidates(); // Call the filter function whenever the search input changes
  }, [search, items]);
  const [showSendAllMessageModal, setShowSendAllMessageModal] = useState(false);


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

      <div>
        <div>
         
            <button onClick={()=>setShowSendAllMessageModal(true)} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
              Send Message All Candidates
            </button>
        </div>
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
                        Gender
                      </th>
                      <th
                        scope="col"
                        className="text-center w-[230px] text-[14px] text-white ml-3 font-medium  border-r-[1px] border-white"
                      >
                        Deat Of Birth
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
                    <tbody key={i}>
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
                              src={`https://rsapp.unbolt.co/${pre?.seekerid?.image}`}
                            />
                          </div>
                        </td>
                        <td className="whitespace-nowrap  text-[13px]  border-2 pl-2 py-1">
                          <a
                            href={`https://unbolt.co/candidate-profile/${pre?.seekerid?._id}`}
                            target="_blank"
                            className=""
                          >
                            <p className="hover:text-blue-500">
                              {pre?.seekerid?.fastname}{" "}
                              {pre?.seekerid?.lastname}
                            </p>
                          </a>
                        </td>
                        <td className="whitespace-nowrap text-[13px]  border-2 pl-2 py-1">
                          {pre?.seekerid?.experiencedlevel?.name}
                        </td>
                        <td className="whitespace-nowrap text-[13px]  border-2 pl-2 py-1">
                          {pre?.seekerid?.number}
                        </td>
                        <td className="whitespace-nowrap text-[13px]  border-2 pl-2 py-1">
                          {pre?.seekerid?.email}
                        </td>
                        <td className="whitespace-nowrap text-[13px]  border-2 pl-2 py-1">
                          {pre?.seekerid?.gender}
                        </td>
                        <td className="whitespace-nowrap text-[13px]  border-2 pl-2 py-1">
                          {pre?.seekerid?.deatofbirth === null ? (
                            "null"
                          ) : (
                            <>
                              {pre?.seekerid?.deatofbirth.slice(8, 10) +
                                "-" +
                                pre?.seekerid?.deatofbirth.slice(5, 7) +
                                "-" +
                                pre?.seekerid?.deatofbirth.slice(0, 4)}
                            </>
                          )}
                        </td>

                        <td className="whitespace-nowrap text-[13px]  border-2 pl-2 py-1">
                          {pre?.seekerid?.createdAt.slice(8, 10) +
                            "-" +
                            pre?.seekerid?.createdAt.slice(5, 7) +
                            "-" +
                            pre?.seekerid?.createdAt.slice(0, 4)}
                        </td>
                        <td className="whitespace-nowrap text-[13px]  border-2  py-1 w-[50px]  ">
                          <div className="flex justify-center">
                            <label
                              onClick={() => setremove(pre)}
                              htmlFor="sendMassage-candidate-modal"
                              className="cursor-pointer "
                            >
                              Send Massage
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
            </div>
          </div>
        </div>
      </div>

      {remove && (
        <NotCompliteCandidateDelete
          modalData={remove}
          closeModal={closeModal}
          recall={recall}
        ></NotCompliteCandidateDelete>
      )}
      {remove && (
        <NotCompliteProfileSendMassage
          modalData={remove}
          closeModal={closeModal}
          recall={recall}
        ></NotCompliteProfileSendMassage>
      )}

      {
        showSendAllMessageModal === true && 
      <NotCompliteCandidateSendMassageInOneTime  setShowSendAllMessageModal={setShowSendAllMessageModal}/>
      }

    </div>
  );
};

export default ProfileNotCompliteCandidateList;
