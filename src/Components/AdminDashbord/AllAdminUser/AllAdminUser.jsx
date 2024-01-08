import { useState } from "react";
import { useEffect } from "react";
import Spinner from "../../Spinner/Spinner";
import { toast } from "react-toastify";

const AllAdminUser = () => {
  const [user, setUser] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [isLoding, setIsLoding] = useState(false);

  useEffect(() => {
    fetch("https://rsapp.unbolt.co/all_admin_user")
      .then((res) => res.json())
      .then((data) => {
        setIsLoding(true);
        setUser(data);
        console.log(data);
      });
  }, [refresh]);
  console.log(location);




  const AppAdminModaretorRequestAccept = (_id) => {
    try {
      fetch(`https://rsapp.unbolt.co/v_appadmin/${_id}`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            toast.success("App Moderator Request Accept");
            console.log(data);
            setRefresh(!refresh)
          }
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.error(error);
    }
  };

  const sentAppAdminModaretorRequest = (_id) => {
    try {
      fetch(`https://rsapp.unbolt.co/appadmin/${_id}`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            toast.success("App Moderator Request Regect");
            console.log(data);
            setRefresh(!refresh)

          }
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.error(error);
    }
  };









  const WebAdminModaretorRequestAccept = (_id) => {
    fetch(`https://rsapp.unbolt.co/v_webadmin/${_id}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
            toast.success("Web Moderator Request Accept");
          console.log(data);
          setRefresh(!refresh)

        }
      });
  };






  const sentWebAdminModaretorRequest = (_id) => {
    fetch(`https://rsapp.unbolt.co/webadmin/${_id}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
            toast.success("Web Moderator Request Reject");
          console.log(data);
          setRefresh(!refresh)

        }
      });
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
      <div className="flex flex-col">
        <div className=" ">
          <div className="inline-block min-w-full py-2 ">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light w-[1000px]">
                <thead className="border-b text-[18px] font-medium  bg-gray-100 ">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      No
                    </th>
                    <th scope="col" className="px-6 py-4">
                      {" "}
                      Name
                    </th>
                    <th scope="col" className="px-6 py-4">
                      {" "}
                      Email
                    </th>
                    <th scope="col" className="px-6 py-4 text-center">
                      For App
                    </th>
                    <th scope="col" className="px-6 py-4 text-center">
                      For Web{" "}
                    </th>
                  </tr>
                </thead>
              
                {user.map((lo, i) => (
                      <tbody
                        className="text-[15px] bg-gray-50"
                        key={lo._id}
                       
                      >
                        <tr className="border-b dark:border-neutral-500">
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {i + 1}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            <div>
                              <p className="my-2"> {lo.displayName}</p>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            <div>
                              <p className="my-2"> {lo.email}</p>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            <div>
                              <p className="my-2"> {lo.addAdmin === false ? 
                               <button
                               onClick={() => AppAdminModaretorRequestAccept(lo?._id)}
                               className="btn btn-xs bg-indigo-500 text-white "
                             >
                               {" "}
                               App Moderator Request Accept
                             </button>

                              :
                              
                              <button
                              onClick={() => sentAppAdminModaretorRequest(lo?._id)}
                              className="btn btn-xs bg-red-600 text-white "
                            >
                              {" "}
                              App Moderator Reject
                            </button>
                              }</p>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            <div>
                              <p className="my-2"> {lo.webAdmin === false ?
                              
                              <button
                              onClick={() => WebAdminModaretorRequestAccept(lo?._id)}
                              className="btn btn-xs bg-indigo-500 text-white "
                            >
                              {" "}
                              Web Moderator Request Accept
                            </button>

                             :
                             
                             <button
                             onClick={() => sentWebAdminModaretorRequest(lo?._id)}
                             className="btn btn-xs bg-red-600 text-white "
                           >
                             {" "}
                             Web Moderator Reject
                           </button>                              
                              
                              }
                              
                              </p>
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
  );
};

export default AllAdminUser;
