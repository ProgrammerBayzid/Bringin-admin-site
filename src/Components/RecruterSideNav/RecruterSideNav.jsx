import { NavLink } from "react-router-dom";
import ll from '../../assets/commonlogo/ll.png'
import { AuthContext } from "../Context/Context";
import { useContext } from "react";


const RecruterSideNav = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className=" ">
      <ui className='flex justify-around items-center'>
        <div>
          <img src={ll} />
        </div>
       <div className='flex gap-2 items-center'>
       <p className="my-5">
          <NavLink
            to="/verification/profile_varify"
            className="border hover:bg-[#0077B5] hover:text-white my-4  rounded-md p-[7px] cursor-pointer hover:text-[#0077B5]  text-[13px]  font-medium items-center gap-x-2 "
          >
            <span className="text-[16px]">Recruiter Verifications </span>
          </NavLink>
        </p>
        <p className="my-5">
          <NavLink
            to="/verification/verifyProfile"
            className="border hover:bg-[#0077B5] hover:text-white my-4  rounded-md p-[7px] cursor-pointer hover:text-[#0077B5]  text-[13px]  font-medium items-center gap-x-2 "
          >
            <span className="text-[16px]">Recruiter List</span>
          </NavLink>
        </p>
        <p className="my-5">
          <NavLink
            to="/verification/rejected_recruiters"
            className="border hover:bg-[#0077B5] hover:text-white my-4  rounded-md p-[7px] cursor-pointer hover:text-[#0077B5]  text-[13px]  font-medium items-center gap-x-2 "
          >
            <span className="text-[16px]">Rejected Recuiters </span>
          </NavLink>
        </p>

        <p className="my-5">
          <NavLink
            to="/verification/job_report"
            className="border hover:bg-[#0077B5] hover:text-white my-4  rounded-md p-[7px] cursor-pointer hover:text-[#0077B5]  text-[13px]  font-medium items-center gap-x-2 "
          >
            <span className="text-[16px]">Job Report</span>
          </NavLink>
        </p>
        <p className="my-5">
          <NavLink
            to="/verification/candidate"
            className="border hover:bg-[#0077B5] hover:text-white my-4  rounded-md p-[7px] cursor-pointer hover:text-[#0077B5]  text-[13px]  font-medium items-center gap-x-2 "
          >
            <span className="text-[16px]">Candidate List</span>
          </NavLink>
        </p>
        <p className="my-5">
          <NavLink
            to="/verification/candidatereport"
            className="border hover:bg-[#0077B5] hover:text-white my-4  rounded-md p-[7px] cursor-pointer hover:text-[#0077B5]  text-[13px]  font-medium items-center gap-x-2 "
          >
            <span className="text-[16px]">Candidate Report</span>
          </NavLink>
        </p>
       </div>
      
      <div className="flex gap-2 items-center">
       <img src={user?.photoURL} className="w-[46px] rounded rounded-full" /> 
        <p className="text-[18px] font-medium"> {user?.displayName}</p>
        </div> 
      
      </ui>
    </div>
  );
};

export default RecruterSideNav;










// {
//   "_id": {
//     "$oid": "64c10962e0b15eecc5e06df7"
//   },
//   "number": "01619828781",
//   "firstname": "Maria",
//   "lastname": "Parvin",
//   "companyname": {
//     "$oid": "64c10c2cd7e267b40baa728b"
//   },
//   "designation": "HR Manager",
//   "email": "mariapobon@gmail.com",
//   "image": "uploads/image585489.jpg",
//   "other": {
//     "notification": {
//       "push_notification": true,
//       "whatsapp_notification": false,
//       "sms_notification": false,
//       "job_recommandation": true
//     },
//     "latestjobid": {
//       "$oid": "64c11636e0b15eecc5e07244"
//     },
//     "company_verify": false,
//     "profile_verify": true,
//     "company_docupload": true,
//     "profile_docupload": true,
//     "profile_verify_date": {
//       "$date": "2023-07-25T11:17:40.440Z"
//     },
//     "premium": false,
//     "total_chat": 0,
//     "savecandidate": 0,
//     "interview": 0,
//     "total_step": 6,
//     "incomplete": 0,
//     "complete": 6,
//     "online": false,
//     "pushnotification": "f62a485c-5c23-420d-8bbf-229e892a2ee0"
//   },
//   "createdAt": {
//     "$date": "2023-07-26T11:54:10.489Z"
//   },
//   "updatedAt": {
//     "$date": "2023-07-26T12:48:54.089Z"
//   },
//   "__v": 0
// }