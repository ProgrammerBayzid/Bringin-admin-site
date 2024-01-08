import { useEffect, useState } from "react";
import Spinner from "../../Spinner/Spinner";
import { AiFillDelete } from "react-icons/ai";

const UserContactus = () => {
  const [isLoding, setIsLoding] = useState(false);

  const [premium, setPremium] = useState([]);
  useEffect(() => {
    fetch("https://rsapp.unbolt.co/web_contact")
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
      fetch(`https://rsapp.unbolt.co/web_contact/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

  if (isLoding === false) {
    return (
      <div className="">
        <Spinner></Spinner>
      </div>
    );
  }

  return (
    <div>
      <div>
        <div>
          <div>
            <div>
              <div className="flex flex-col">
                <div className=" ">
                  <div className="inline-block  py-2 ">
                    <div className="overflow-hidden">
                      <table className=" text-left text-sm font-light w-[1000px]">
                        <thead className="border-b text-[18px] bg-gray-100 font-medium dark:border-neutral-500   w-[1000px]">
                          <tr>
                            <th scope="col" className="px-6 py-4">
                              No
                            </th>

                            <th scope="col" className="px-6 py-4">
                              Email
                            </th>
                            <th scope="col" className="px-6 py-4  w-[450px]">
                              Feedback
                            </th>
                            <th scope="col" className="px-6 py-4  w-[450px]">
                              Action
                            </th>
                          </tr>
                        </thead>

                        {premium?.map((pre, i) => (
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
                                  {pre?.email ? (
                                    <p className="my-2">{pre.email}</p>
                                  ) : (
                                    <p>Null</p>
                                  )}
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 font-medium w-[450px]">
                                <div>
                                  {pre?.about ? (
                                    <p className="my-2">{pre.about}</p>
                                  ) : (
                                    <p>Null</p>
                                  )}
                                </div>
                              </td>
                              <td>
                                <button onClick={() => handelDeeted(pre._id)}>
                                  <AiFillDelete className="text-red-500"></AiFillDelete>
                                </button>
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
    </div>
  );
};

export default UserContactus;
