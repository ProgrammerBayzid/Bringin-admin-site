import { useEffect, useRef } from "react";
import { useState } from "react";

import Spinner from "../../Spinner/Spinner";
// import { Link } from "react-router-dom";

const RecruterReport = () => {
  const [repoted, setRepoted] = useState([]);
  const [isLoding, setIsLoding] = useState(false);

  useEffect(() => {
    fetch("http://rsapp.bringin.io/job_report")
      .then((res) => res.json())
      .then((data) => {
        setIsLoding(true);
        setRepoted(data);
        console.log(data);
      });
  }, []);
  console.log(repoted);

//   const dragItem = useRef(null);
//   const dragOverItem = useRef(null);

//   const handelSort = () => {
//     let _industry = [...repoted];
//     //remove and save the dragged item content
//     const draggedItemContent = _industry.splice(dragItem.current, 1)[0];
//     //switch the position
//     _industry.splice(dragOverItem.current, 0, draggedItemContent);

//     //reset the position ref
//     dragItem.current = null;
//     dragOverItem.current = null;

//     //update the actual array
//     setRepoted(_industry);
//   };

  if (isLoding === false) {
    return <Spinner></Spinner>;
  }
  return (
    <div>
      <div>
        <div>
          <div className="flex flex-col">
            <div className=" ">
              <div className="inline-block min-w-full py-2 ">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left text-sm font-light w-[1000px]">
                    <thead className="border-b text-[18px] bg-gray-100 font-medium dark:border-neutral-500 ">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          No
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Image{" "}
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Number
                        </th>
                        <th scope="col" className="px-6 py-4 text-center">
                          Action
                        </th>
                      </tr>
                    </thead>
                    {/* {repoted.map((candi, i) => (
                      <tbody
                        className="text-[15px] bg-gray-50"
                        key={candi._id}
                        onDragStart={(e) => (dragItem.current = i)}
                        onDragEnter={(e) => (dragOverItem.current = i)}
                        onDragEnd={handelSort}
                        draggable
                      >
                        <tr className="border-b dark:border-neutral-500">
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {i + 1}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            <div>
                                {
                                    candi?.id?.image? 
                                    <img className="w-16" src={candi.id.image} /> : <p>Null</p>
                                }
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            <div>
                                {candi?.candidateid?.fastname? 

                              <p className="my-2">
                                {candi.candidateid.fastname}{" "}
                                {candi.candidateid.lastname}
                              </p>: <p>Null</p>
                                }
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            <div>
                              {candi?.candidateid?.email? (
                                <p className="my-2">
                                  {candi.candidateid.email}
                                </p>
                              ) : (
                                <p>Null</p>
                              )}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            <div>
                              {candi?.candidateid?.number? (
                                <p className="my-2">
                                  {candi.candidateid.number}
                                </p>
                              ) : (
                                <p>Null</p>
                              )}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-center">
                            <Link to={ `/candidate_report_details/${candi._id}`}> 


                            <button className="bg-cyan-400	p-2 border rounded text-white font-bold">
                              View Details
                            </button>
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    ))} */}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default RecruterReport;
