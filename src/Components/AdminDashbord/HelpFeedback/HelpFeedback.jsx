import { useEffect, useState } from "react";
import Spinner from "../../Spinner/Spinner";
import { AiFillDelete } from "react-icons/ai";
import pro from "../../../assets/commonlogo/Group (1).png";
import vec from "../../../assets/commonlogo/Vector.png";
import { Image } from "antd";
import HelpfeedbackDetails from "./HelpfeedbackDetails";

const HelpFeedback = () => {
  

    const [isLoding, setIsLoding] = useState(false);

    const [premium, setPremium] = useState([]);
    useEffect(() => {
      fetch("https://rsapp.unbolt.co/chatfeedback")
        .then((res) => res.json())
        .then((data) => {
          setIsLoding(true);
          setPremium(data);
          console.log(data);
        });
    }, []);
    console.log(premium);




   
    
      const handelDeeted = (id) => {
        const proced = window.confirm("Are You Sure");
        
        const storedToken = localStorage.getItem("admin_token");
        const token = storedToken ? storedToken.replace(/"/g, "") : null;
    
        if (!proced && token === null) {
          console.log("token not found");
        } else {
        
          fetch(`https://rsapp.unbolt.co/chatfeedback/${id}`, {
            method: "DELETE",
            headers:{
              Authorization: `Bearer ${token}`,
            }
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              if (data) {
                alert("deleted successfully");
                const remaining = premium?.filter((odr) => odr._id !== id);
                setPremium(remaining);
              }
            });
        }
      };




      const [cnadidatereportdetails, setcnadidatereportdetails] = useState(null);
      const closecandidatereportModal = () => {
        setcnadidatereportdetails(null);
      };




      const [search, setSearch] = useState("");
      const [currentPage, SetCurrentPage] = useState(1);
      const recruterPerPage = 50;
      const lastIndex = currentPage * recruterPerPage;
      const firstIndex = lastIndex - recruterPerPage;
      const recruter = premium.slice(firstIndex, lastIndex);
      const npage = Math.ceil(premium / recruterPerPage);



  
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
              className="placeholder:text-[12px] border h-[36px] rounded rounded-[20px] pl-2 w-full max-w-xs outline-none"
            />
         
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
                            className="pl-2 w-[30px] text-[13px] text-white ml-3 font-medium py-2 border-r-[1px] border-white"
                          >
                            ID NO
                          </th>
                          <th
                            scope="col"
                            className="pl-3 w-[31px] text-[13px] text-white ml-3 font-medium py-2 border-r-[1px] border-white"
                          >
                            <img src={pro} />
                          </th>
                          <th
                            scope="col"
                            className="pl-2 w-[130px] text-[13px] text-white ml-3 font-medium  border-r-[1px] border-white"
                          >
                       Name
                          </th>
                          
                          <th
                            scope="col"
                            className="pl-2 w-[120px] text-[13px] text-white ml-3 font-medium  border-r-[1px] border-white"
                          >
                            Mobile
                          </th>
                          <th
                            scope="col"
                            className="pl-2 w-[150px] text-[13px] text-white ml-3 font-medium  border-r-[1px] border-white"
                          >
                            Email
                          </th>
                          
                          
                        
    
                          
                          <th
                            scope="col"
                            className="pl-2 w-[50px] text-[13px] text-white ml-3 font-medium  border-r-[1px] border-white"
                          >
                        Date
                          </th>
                          
                          <th
                            scope="col"
                            className="pl-2 w-[40px] text-[13px] text-white ml-3 font-medium  border-r-[1px] border-white"
                          >
                            <img src={vec} />
                          </th>
                          <th
                            scope="col"
                            className="pl-2 w-[40px] text-[13px] text-white ml-3 font-medium  border-r-[1px] border-white"
                          >
                          Action
                          </th>
                        
                        </tr>
                      </thead>
    
                      {recruter
                        .filter((pre) => {
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
                            : pre?.userid?.lastname
                                .toLocaleLowerCase()
                                .includes(search) || pre?.userid?.number === null
                            ? pre
                            : pre?.userid?.number
                                .toLocaleLowerCase()
                                .includes(search) ;
                        })
                        .map((pre, i) => (
                          <tbody key={i}>
                            <tr className="">
                              <td className="whitespace-nowrap text-[13px] pl-2 py-1 border-2 ">
                                {i + 1}
                              </td>
    
                              <td className="w-[35px] pl-1   py-1 border-2  ">
                                <Image
                                  height={31}
                                  width={31}
                                  className="rounded rounded-full "
                                  src={`https://rsapp.unbolt.co/${pre?.userid?.image}`}
                                />
                              </td>
    
                              <td className="whitespace-nowrap text-[13px]  border-2 pl-2 py-1">
                                {pre?.userid?.fastname} {pre?.userid?.lastname}
                              </td>
                             
                              <td className="whitespace-nowrap text-[13px]  border-2 pl-2 py-1">
                                 {pre?.userid?.number}
                              </td>
                              <td className="whitespace-nowrap text-[13px]  border-2 pl-2 py-1">
                                {pre?.userid?.email}
                              </td>
                            
                            
    
                              <td className="whitespace-nowrap text-[13px]  border-2 pl-2 py-1">
                                {pre?.createdAt.slice(0, 10)}{" "}
                              </td>
                            
                              <td className="whitespace-nowrap text-[13px]  border-2 pl-2 py-1">
                               
                              <label
                              onClick={() => setcnadidatereportdetails(pre)}
                              htmlFor="helpfeedback-details-modal"
                              className="cursor-pointer border px-3 py-1 rounded rounded-[30px]"
                            >
                              a
                            </label>
                                
                              </td>
                              <td className="whitespace-nowrap text-[13px]  border-2 pl-2 py-1">
                              <button onClick={() => handelDeeted(pre._id)}>
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
                        {firstIndex + 1} - {lastIndex} of {premium.length}
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
        <HelpfeedbackDetails
          modalData={cnadidatereportdetails}
          closeModal={closecandidatereportModal}
        ></HelpfeedbackDetails>
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

export default HelpFeedback;
