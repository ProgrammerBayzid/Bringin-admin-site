import {  useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { useEffect } from "react";
const JobDecription = ({
  setjobdecriptionModalOpen,
  setjobdeceription,
  jobdeceription,
  jobdeceriptionHtml,
  setjobdeceriptionHtml,
}) => {
  const handelRemoveJobDecription = () => {
    setjobdeceription();
    setcontentHtml("");
    setjobdeceriptionHtml("");
    setjobdecriptionModalOpen(false);
  };

  const [contentHtml, setcontentHtml] = useState("");

  const handleDescription = (content, delta, sorce, editor) => {
    console.log("content", content);
    console.log("delta", delta.ops);
    setcontentHtml(content);
    setjobdeceription(delta.ops);
    console.log(sorce);
    console.log(editor);
  };

  const [contentLength, setcontentLength] = useState();
  useEffect(() => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = contentHtml;
    const withoutHtmlcontentLength = tempDiv.innerText.length;
    const withoutHtmlcontent = tempDiv.innerText;
    setjobdeceriptionHtml(withoutHtmlcontent);
    setcontentLength(withoutHtmlcontentLength);
  }, [contentHtml]);

  return (
    <div className="fixed inset-0 bg-[#090808] bg-opacity-70 flex justify-center items-center z-40 App">
      <div className="  bg-white  relative  w-[350px] h-[550px] lg:w-[584px] lg:h-[550px]   lg:p-0 md:p-0 p-2 rounded rounded-[10px]">
        <div className="px-3">
          <div className="mt-5 mb-3">
            <div className="flex justify-between">
              <img
                onClick={handelRemoveJobDecription}
                className="cursor-pointer"
                src="/images/tircompany.svg"
              />
              <h1 className="text-[22px] font-bold mx-auto text-[#212427] text-opacity-90 ">
                Job Descriptions
              </h1>
              <button
                onClick={() => setjobdecriptionModalOpen(false)}
                className=" text-white bg-[#0077B5] h-[25px] w-[50px] text-[14px] rounded rounded-[5px] my-1"
              >
                Save
              </button>
            </div>

            <h5 className="text-[14px] font-normal mb-4 text-[#212427] text-opacity-60 text-center">
              Please provide a detail & specific job description to find the
              right candidate.
            </h5>
          </div>

          <div className="">
            <div className="font-inter relative">
              <div>
            
                <ReactQuill
                  theme="snow"
                  value={contentHtml}
                  onChange={handleDescription}
                  className=" w-full h-[390px] lg:w-full lg:h-[390px] "

                  placeholder="1. Company Introduction 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                  2. Job Type, Location
                   
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                  3. Responsibilities
                   
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 
                 




                   4. Candidate Requirements"
                />
              </div>
              <p className="font-inter  text-right text-[14px] mt-[20px] px-2 absolute bottom-1 right-10">
                <span className="font-inter text-[#0077B5] text-opacity-90 font-semibold">
                  {contentLength}
                </span>
                /15000
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDecription;
