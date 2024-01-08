import { NavLink } from "react-router-dom";
import ll from '../../assets/commonlogo/ll.png'
import { AuthContext } from "../Context/Context";
import { useContext } from "react";


const RecruterSideNav = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="sticky top-0 z-40 bg-white ">
      <ui className='flex justify-around items-center'>
        <div className="w-[350px]">
          
        </div>
       <div className='flex gap-2 items-center'>
       
       <p className="my-2">
          <NavLink
            to="/verification/profile_varify"
            className=" hover:bg-[#0077B5] hover:text-white my-4  rounded-md p-[5px] cursor-pointer   text-[13px]   items-center gap-x-2 "
          >
            <span className="text-[12px]">Recruiter Verifications </span>
          </NavLink>
        </p>
        <p className="my-5">
          <NavLink
            to="/verification/verifyProfile"
            className=" hover:bg-[#0077B5] hover:text-white my-4  rounded-md p-[5px] cursor-pointer   text-[13px]   items-center gap-x-2 "
          >
            <span className="text-[12px]"> Recruiters </span>
          </NavLink>
        </p>
        <p className="my-5">
          <NavLink
            to="/verification/rejected_recruiters"
            className=" hover:bg-[#0077B5] hover:text-white my-4  rounded-md p-[5px] cursor-pointer   text-[13px]   items-center gap-x-2 "
          >
            <span className="text-[12px]">Rejected Recuiters </span>
          </NavLink>
        </p>

        <p className="my-5">
          <NavLink
            to="/verification/job_report"
            className=" hover:bg-[#0077B5] hover:text-white my-4  rounded-md p-[5px] cursor-pointer   text-[13px]   items-center gap-x-2 "
          >
            <span className="text-[12px]">Job Report</span>
          </NavLink>
        </p>
        <p className="my-5">
          <NavLink
            to="/verification/candidate"
            className=" hover:bg-[#0077B5] hover:text-white my-4  rounded-md p-[5px] cursor-pointer   text-[13px]   items-center gap-x-2 "
          >
            <span className="text-[12px]">Candidates </span>
          </NavLink>
        </p>
        <p className="my-5">
          <NavLink
            to="/verification/candidate_profile_not_complite"
            className=" hover:bg-[#0077B5] hover:text-white my-4  rounded-md p-[5px] cursor-pointer   text-[13px]   items-center gap-x-2 "
          >
            <span className="text-[12px]">PNC Candidates </span>
          </NavLink>
        </p>
        <p className="my-5">
          <NavLink
            to="/verification/candidatereport"
            className=" hover:bg-[#0077B5] hover:text-white my-4  rounded-md p-[5px] cursor-pointer   text-[13px]   items-center gap-x-2 "
          >
            <span className="text-[12px]">Candidate Report</span>
          </NavLink>
        </p>
        <p className="my-5">
          <NavLink
            to="/verification/job_post"
            className=" hover:bg-[#0077B5] hover:text-white my-4  rounded-md p-[5px] cursor-pointer   text-[13px]   items-center gap-x-2 "
          >
            <span className="text-[12px]">Job Posts</span>
          </NavLink>
        </p>
        <p className="my-5">
          <NavLink
            to="/verification/rejected_job_post"
            className=" hover:bg-[#0077B5] hover:text-white my-4  rounded-md p-[5px] cursor-pointer   text-[13px]   items-center gap-x-2 "
          >
            <span className="text-[12px]">Rejected Job Posts</span>
          </NavLink>
        </p>
       </div>
      
      <div className="flex gap-2 items-center">
       <img src={user?.photoURL} className="w-[30px] h-[30px] rounded rounded-full" /> 
        </div> 
      
      </ui>
    </div>
  );
};

export default RecruterSideNav;







