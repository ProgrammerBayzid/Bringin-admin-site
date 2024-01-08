import { useEffect, useState } from "react";

const FilterVerifyRecruter = ({setItems, data}) => {
  const [industry, setIndustry] = useState([]);

  useEffect(() => {
    fetch("https://rsapp.unbolt.co/admin/industry")
      .then((res) => res.json())
      .then((data) => {
        setIndustry(data);
        console.log(data);
      });
  }, []);
  console.log(industry);



  

  const [isActiveIndustry, setisActiveIndustry] = useState(false);
  const [industryValue, setIndustryValue] = useState("");
  console.log(industryValue);

  const handleIndustryClick = (value) => {
    setIndustryValue(value);
    setisActiveIndustry(value);
  };




  const [isActivesubscription, setisActivesubscription] = useState(false);
  const [subscriptionValue, setsubscriptionValue] = useState("");
  console.log(subscriptionValue);
  const handlesubscriptionClick = (value) => {
    setsubscriptionValue(value);
    setisActivesubscription(value);
  };



  const applyFilters = () => {
      let updatedList = data;
      console.log(updatedList);
      if (industryValue) {
        updatedList = updatedList.filter(
          (item) => item?.companyname?.industry?.industryid?.industryname == industryValue
        );
      }

      setItems(updatedList);

    };

    useEffect(() => {
      applyFilters();
    }, [industryValue]);


    const inAll = ()=>{
      setIndustryValue('');
      setisActiveIndustry(false)
    }

    const reset = ()=>{
    
      setIndustryValue('');
      setisActiveIndustry(false)
    
    }


  const subscription = [
    {
      subscription: "Silver",
      value: true,
    },
    {
      subscription: "Gold",
      value: true,
    },
    {
      subscription: "Platinum",
      value: true,
    },
  ];

  return (
    <div>
      <div>
        <input type="checkbox" id="verifyprofile-modal" className="modal-toggle" />
        <div className="modal w-full  backdrop-blur-[60px] bg-opacity-50">
          <div className="bg-white rounded-lg relative  lg:w-[850px]  lg:h-[600px] md:w-[750px] md:h-[550px] w-full h-full">
            <label
              htmlFor="verifyprofile-modal"
              className="cursor-pointer text-[25px] absolute right-4 top-2 text-black"
            >
              ✕
            </label>
            <div>
              <div className="p-5">
                <div className="flex justify-between">
                  <div>
                    <p className="text-[13px] w-[114px] font-semibold bg-[#0077B5] text-white py-1 px-[15px] rounded rounded-[20px]">
                      Subscription
                    </p>
                    <div className="flex gap-2 mt-3">
                      {subscription.map((sub, i) => (
                        <button
                          key={i}


                          onClick={() => handlesubscriptionClick(sub?.subscription)}
                          className={
                            isActivesubscription == sub?.subscription
                              ? "border text-[13px] border-[1px] m-1.5 bg-[#0077B5] text-white rouunded rounded-[30px] px-2"
                              : "border text-[13px] border-[1px] rouunded rounded-[30px] px-2 hover:bg-[#0077B5] hover:text-white"
                          }
                        >
                          {sub?.subscription}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-4 ">
                  <label
              htmlFor="verifyprofile-modal"
              className="text-[18px] h-[30px] border border-2 border-[#0077B5]  px-4  bg-[#0077B5] text-white cursor-pointer"
              >
              Submit
            </label>
                    <p
                      onClick={reset}
                      className="text-[18px] text-[#0077B5] h-[30px] border border-2 border-[#0077B5] py- px-4 mr-14 hover:bg-[#0077B5] hover:text-white cursor-pointer"
                    >
                      Reset
                    </p>
                  </div>
                </div>
                <div className="mt-5">
                  <p className="text-[13px] w-[117px] font-semibold bg-[#0077B5] text-white py-1 px-[18px] rounded rounded-[20px]">
                    Job Industry
                  </p>

                  <div className="gap-2 mt-3">
                  <button
                          onClick={inAll}
                          className={
                            "border border-[1px] m-1.5 text-[13px] hover:bg-[#0077B5] hover:text-white rouunded rounded-[30px] px-2"
                          }
                        >
                          All
                        </button>
                    {industry.map((ind) => (
                      <button
                        key={ind._id}
                        onClick={() => handleIndustryClick(ind?.industryname)}
                        className={
                          isActiveIndustry == ind?.industryname
                            ? "border  text-[13px]  border-[1px] m-1.5 bg-[#0077B5] text-white rouunded rounded-[30px] px-2"
                            : "border  text-[13px] border-[1px] m-1.5 hover:bg-[#0077B5] hover:text-white rouunded rounded-[30px] px-2"
                        }
                      >
                        {ind?.industryname}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterVerifyRecruter;
