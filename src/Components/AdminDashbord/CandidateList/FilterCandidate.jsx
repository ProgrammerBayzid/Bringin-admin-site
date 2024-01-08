import { useEffect, useState } from "react";

const FilterCandidate = ({ setItems, data }) => {
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

  const [salaries, setSalaries] = useState([]);
  useEffect(() => {
    fetch("https://rsapp.unbolt.co/admin/salarie")
      .then((res) => res.json())
      .then((data) => {
        setSalaries(data);
        console.log(data);
      });
  }, []);
  console.log(salaries);

  const [educationlavel, setEducationlavel] = useState([]);
  useEffect(() => {
    fetch("https://rsapp.unbolt.co/education_lavel")
      .then((res) => res.json())
      .then((data) => {
        setEducationlavel(data);
        console.log(data);
      });
  }, []);
  console.log(educationlavel);

  const [experince, setExperince] = useState([]);

  useEffect(() => {
    fetch("https://rsapp.unbolt.co/admin_exprience")
      .then((res) => res.json())
      .then((data) => {
        setExperince(data);
        console.log(data);
      });
  }, []);
  console.log(experince);

  const [experienceValue, setExperienceValue] = useState("");
  const [isActiveEcprience, setIsActiveExprience] = useState(false);
  console.log(experienceValue);
  const handleExperienceClick = (value) => {
    setExperienceValue(value);
    setIsActiveExprience(value);
  };

  const experinceAll = () =>{
    setExperienceValue("");
    isActiveEcprience(false)
  }

  const [isActivesalary, setIsActivesalary] = useState(false);
  const [salaryValue, setSalaryValue] = useState("");
  console.log(salaryValue);
  const handleSalaryClick = (value) => {
    setSalaryValue(value);
    setIsActivesalary(value);
  };

  const salaryAll = ()=>{
    setSalaryValue('');
    setIsActivesalary(false)
  }

  const [isActiveIndustry, setisActiveIndustry] = useState(false);
  const [industryValue, setIndustryValue] = useState("");
  console.log(industryValue);

  const handleIndustryClick = (value) => {
    setIndustryValue(value);
    setisActiveIndustry(value);
  };


  const inAll = ()=>{
    setIndustryValue('');
    setisActiveIndustry(false)
  }



  const [isActiveEducation, setisActiveEducation] = useState(false);
  const [educationValue, setEducationValue] = useState("");
  console.log(educationValue);

  const handleEducationClick = (value) => {
    setEducationValue(value);
    setisActiveEducation(value);
  };


  const educationAll = ()=>{
    setEducationValue('');
    setisActiveEducation(false)
  }


  const reset = ()=>{
    setEducationValue('');
    setisActiveEducation(false)
    setIndustryValue('');
    setisActiveIndustry(false)
    setSalaryValue('');
    setIsActivesalary(false)
    setExperienceValue('');
    isActive(false)
  }



  const applyFilters = () => {
    let updatedList = data;
    console.log(updatedList);
    if (industryValue) {
      updatedList = updatedList.filter(
        (item) =>
          item?.careerPreference[0]?.functionalarea?.industryid?.industryname ==
          industryValue
      );
    }

    if (salaryValue) {
      updatedList = updatedList.filter(
        (item) =>
          item?.careerPreference[0]?.salaray?.min_salary?.salary == salaryValue
      );
    }

    if (experienceValue) {
      updatedList = updatedList.filter(
        (item) => item?.userid?.experiencedlevel?.name == experienceValue
      );
    }
    if (educationValue) {
      updatedList = updatedList.filter(
        (item) => item?.education[0]?.digree?.education?.name == educationValue
      );
    }

    setItems(updatedList);
  };

  useEffect(() => {
    applyFilters();
  }, [industryValue, salaryValue, experienceValue, educationValue]);

  return (
    <div>
      <div>
        <input type="checkbox" id="repotedJob-modal" className="modal-toggle" />
        <div className="modal w-full  backdrop-blur-[60px] bg-opacity-50">
          <div className="bg-white rounded-lg relative  lg:w-[850px]  lg:h-[600px] md:w-[750px] md:h-[550px] w-full h-full">
            <label
              htmlFor="repotedJob-modal"
              className="cursor-pointer text-[25px] absolute right-4 top-2 text-black"
            >
              ✕
            </label>
            <div>
              <div className="p-5">
                <div className="flex justify-between">
                <div className="mt-5">
                  <p className="text-[13px] w-[130px] font-medium bg-[#0077B5] text-white px-[12px] py-1 rounded rounded-[20px]">
                    <p className="flex gap-1">
                    Experience <span>Level</span>
                    </p>
                  </p>

                  <div className="">
                    <div className="gap-2 mt-3  h-[30px] overflow-auto">
                    <button
                          onClick={experinceAll}
                          className={
                            "border border-[1px] m-1.5 text-[13px] hover:bg-[#0077B5] hover:text-white rouunded rounded-[30px] px-2"
                          }
                        >
                          All
                        </button>
                      {experince.map((exp) => (
                        <button
                          key={exp._id}
                          onClick={() => handleExperienceClick(exp?.name)}
                          className={
                            isActiveEcprience == exp?.name
                              ? "border border-[1px] m-1.5 text-[13px] bg-[#0077B5] text-white rouunded rounded-[30px] px-2"
                              : "border border-[1px] m-1.5 text-[13px] hover:bg-[#0077B5] hover:text-white rouunded rounded-[30px] px-2"
                          }
                        >
                          {exp?.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-4 ">
                  <label
              htmlFor="repotedJob-modal"
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
                  <p className="text-[13px] w-[120px] font-medium bg-[#0077B5] text-white py-1 px-[12px] rounded rounded-[20px]">
                    <p className="flex gap-1">
                      Education <span>Level</span>
                    </p>
                  </p>

                  <div className="">
                    <div className="gap-2 mt-3  h-[30px] overflow-auto">
                    <button
                          onClick={educationAll}
                          className={
                            "border border-[1px] m-1.5 text-[13px] hover:bg-[#0077B5] hover:text-white rouunded rounded-[30px] px-2"
                          }
                        >
                          All
                        </button>
                      {educationlavel.map((edu) => (
                        <button
                          key={edu._id}
                          onClick={() => handleEducationClick(edu?.name)}
                          className={
                            isActiveEducation == edu?.name
                              ? "border border-[1px] m-1.5 text-[13px] bg-[#0077B5] text-white rouunded rounded-[30px] px-2"
                              : "border border-[1px] m-1.5 text-[13px] hover:bg-[#0077B5] hover:text-white rouunded rounded-[30px] px-2"
                          }
                        >
                          {edu?.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <p className="text-[13px] w-[60px] font-medium bg-[#0077B5] text-white py-1 px-[12px] rounded rounded-[20px]">
                    Salary
                  </p>

                  <div className="">
                    <div className="gap-2 mt-3  h-[100px] overflow-auto">
                    <button
                          onClick={salaryAll}
                          className={
                            "border border-[1px] m-1.5 text-[13px] hover:bg-[#0077B5] hover:text-white rouunded rounded-[30px] px-2"
                          }
                        >
                          All
                        </button>
                      {salaries.map((sa) => (
                        <button
                          key={sa._id}
                          onClick={() => handleSalaryClick(sa?.salary)}
                          className={
                            isActivesalary == sa?.salary
                              ? "border border-[1px] m-1.5 text-[13px] bg-[#0077B5] text-white rouunded rounded-[30px] px-2"
                              : "border border-[1px] m-1.5 text-[13px] hover:bg-[#0077B5] hover:text-white rouunded rounded-[30px] px-2"
                          }
                        >
                          {sa?.salary}
                          {sa?.salary == "Negotiable" ? "" : "-"}
                          {sa?.salary == "Negotiable" ? "" : sa?.salary + 5}
                          {sa?.salary == "Negotiable" ? "" : "K BDT"}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <p className="text-[13px] w-[110px] font-medium bg-[#0077B5] text-white py-1 px-[12px] rounded rounded-[20px]">
                    Job Industry
                  </p>

                  <div className="gap-2 mt-3 h-[100px] overflow-auto">
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
                            ? "border border-[1px] m-1.5 text-[14px] bg-[#0077B5] text-white rouunded rounded-[30px] px-2"
                            : "border border-[1px] m-1.5 text-[14px] hover:bg-[#0077B5] hover:text-white rouunded rounded-[30px] px-2"
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

export default FilterCandidate;
