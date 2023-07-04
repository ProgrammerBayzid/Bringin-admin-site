import { useState } from "react";
import { useEffect } from "react";
import Spinner from "../../Spinner/Spinner";
import { Link } from "react-router-dom";

const CompanyVerify = () => {


    const [isLoding, setIsLoding] = useState(false);
  
    const [premium, setPremium] = useState([]);
    useEffect(() => {
      fetch("http://rsapp.bringin.io/verifyCompny")
        .then((res) => res.json())
        .then((data) => {
          setIsLoding(true);
          setPremium(data);
          console.log(data);                                                                        
        });
    }, []);
    console.log(premium);




    if (isLoding === false) {
        return <div className="">
          <Spinner></Spinner>
        </div>;
      }
    return (
        <div>
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
                          Name
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Number
                        </th>
                        <th scope="col" className="px-6 py-4">
                         Premium
                        </th>
                        <th scope="col" className="px-6 py-4 text-center">
                          Action
                        </th>
                      </tr>
                    </thead>
                    {premium.map((pre, i) => (
                      <tbody
                        className="text-[15px] bg-gray-50"
                        key={pre._id}
                        
                      >
                        <tr className="border-b dark:border-neutral-500">
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {i + 1}
                          </td>
                        
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            <div>
                                {pre?.fieldname? 

                              <p className="my-2">
                                {pre.fieldname}{" "}
                               
                              </p>: <p>Null</p>
                                }
                            </div>
                          </td>
                          {/* <td className="whitespace-nowrap px-6 py-4 font-medium">
                            <div>
                              {pre?.email? (
                                <p className="my-2">
                                  {pre.email}
                                </p>
                              ) : (
                                <p>Null</p>
                              )}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            <div>
                              {pre?.number? (
                                <p className="my-2">
                                  {pre.number}
                                </p>
                              ) : (
                                <p>Null</p>
                              )}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            <div>
                              {pre?.premium === true?(
                                <p className="my-2">
                                Premium
                                </p>
                              ) : (
                                <p>Null</p>
                              )}
                            </div>
                          </td> */}
                          <td className="whitespace-nowrap px-6 py-4 text-center">
                            <Link to={ `/company_varify/${pre._id}`}> 


                            <button className="bg-cyan-400	p-2 border rounded text-white font-bold">
                              View Details
                            </button>
                            </Link>
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
        <div></div>
      </div>
    </div>
        </div>
    );
};

export default CompanyVerify;