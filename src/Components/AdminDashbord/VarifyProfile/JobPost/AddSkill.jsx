import { useEffect, useState } from "react";

const AddSkill = ({
  setskillModalOpen,
  skill,
  setSkill,
  experticeAreaCatagoryID,
  setskilltype,
  skilltype,
}) => {
  const handelSkillRemove = () => {
    setskillModalOpen(false);
    setskilltype([]);
  };

  const [inputValue, setInputValue] = useState("");
  const handleAddSkill = () => {
    if (inputValue.trim() !== "") {
      if (skill.length < 5) {
        setSkill([...skill, inputValue]);
        setskilltype([...skilltype, inputValue]);
      } else {
        alert("You can only add up to 5 skills.");
      }
      setInputValue("");
    }
  };

  const skillCountText = `${skill.length}`;
  const handleRemoveSkill = (index) => {
    // Create a new array without the skill at the specified index
    const updatedSkillt = skilltype.filter((i) => i !== index);
    const updatedSkill = skill.filter((i) => i !== index);
    setskilltype(updatedSkillt);
    setSkill(updatedSkill);
  };

  return (
    <div className="fixed inset-0 bg-[#E6E6E6] bg-opacity-90 flex justify-center items-center z-40 App">
      <div className="  bg-white  relative  w-[350px] h-[550px] lg:w-[584px] lg:h-[350px]   lg:p-0 md:p-0 p-2 rounded rounded-[10px]">
        <div className="px-3">
          <div className="my-5">
            <div className="flex justify-between">
              <img
                onClick={handelSkillRemove}
                className="cursor-pointer"
                src="/images/tircompany.svg"
              />
              <h1 className="text-[18px] font-semibold text-[#212427] text-opacity-90 ">
                Add Skill
              </h1>
              <button
                onClick={() => setskillModalOpen(false)}
                className=" text-white bg-[#0077B5] h-[25px] w-[50px] text-[14px] rounded rounded-[5px]"
              >
                Save
              </button>
            </div>
          </div>

          <div>
            <div>
              <div className="w-full pb-2 flex flex-wrap gap-3">
                {skill.map((s, index) => (
                  <div key={index} className="flex gap-x-1">
                    <div className="flex items-center h-[30px]  text-blue-500 border-blue-500 text-[16px] text-opacity-90 border  border-opacity-40 rounded rounded-[25px] px-2">
                      <div className=" flex gap-x-2  items-center">
                        <p>{s}</p>
                        <img
                          className="w-[13px] h-[13px] cursor-pointer"
                          onClick={() => handleRemoveSkill(s)} // Call handleRemoveSkill with the index
                          src="/images/skillremove.svg"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <div className="flex justify-end my-1">
                  <p className="text-blue-500 text-[16px] font-medium">
                    {skillCountText}
                  </p>
                  <p className="text-[#212427] text-[16px] font-medium">/5</p>
                </div>
              </div>
            </div>

            <div className="">
              <div className="mt-[10px] flex justify-center">
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="focus:outline-none placeholder:text-[18px] text-[18px] placeholder:text-[#212427] text-[#212427] pl-0 placeholder:font-medium font-medium   input pl-3 w-[250px] mb-[5px] h-[30px] border border-[2px] rounded "
                />
              </div>
              <div className="mt-2 flex justify-center">
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="w-[110px] h-[30px]  text-[#212427] text-[16px] text-opacity-90 border border-[#212427] border-opacity-40 rounded rounded-[25px] px-1 "
                >
                  Add Skills +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSkill;
