 
import { useState } from "react";
import { NavLink } from "react-router-dom";
import i1 from '../../assets/about/Group 11884.svg'
import { MdOutlineDashboardCustomize,MdOutlineFeaturedPlayList, } from "react-icons/md";
import App from "../../App.css";

const SideNav = () => {
    const [open, setOpen] = useState(true);
    const Menus = [
      { title: <NavLink to='/'>Dashboard</NavLink>, icon: <MdOutlineDashboardCustomize></MdOutlineDashboardCustomize> },
      {title: <NavLink to='/customer'>Customers</NavLink>, icon: <MdOutlineFeaturedPlayList/>},
      {title: <NavLink to='/jobetype'>Job Type</NavLink>, icon: <MdOutlineFeaturedPlayList/>},
      {title: <NavLink to='/industryadd'>Industry Name</NavLink>, icon: <MdOutlineFeaturedPlayList/>},
      {title: <NavLink to='/categoryadd'>Categories </NavLink>, icon: <MdOutlineFeaturedPlayList/>},
      {title: <NavLink to='/functionalareaadd'>Expertise Area </NavLink>, icon: <MdOutlineFeaturedPlayList/>},
      {title: <NavLink to='/locationadd'>Location </NavLink>, icon: <MdOutlineFeaturedPlayList/>},
      {title: <NavLink to='/salaries'>Salaries </NavLink>, icon: <MdOutlineFeaturedPlayList/>},
      {title: <NavLink to='/educationlavel'>Educational Level </NavLink>, icon: <MdOutlineFeaturedPlayList/>},
      {title: <NavLink to='/digree'>Degree</NavLink>, icon: <MdOutlineFeaturedPlayList/>},
      {title: <NavLink to='/subject'>Subject </NavLink>, icon: <MdOutlineFeaturedPlayList/>},
      {title: <NavLink to='/skill'>Skill </NavLink>, icon: <MdOutlineFeaturedPlayList/>},
      {title: <NavLink to='/companyname'>Company Name </NavLink>, icon: <MdOutlineFeaturedPlayList/>},
      {title: <NavLink to='/companysize'>Company Size </NavLink>, icon: <MdOutlineFeaturedPlayList/>},
      {title: <NavLink to='/department'>Department </NavLink>, icon: <MdOutlineFeaturedPlayList/>},
      {title: <NavLink to='/jobtitle'>Job Title </NavLink>, icon: <MdOutlineFeaturedPlayList/>},
      {title: <NavLink to='/candidatereport'>Repoted Candidate </NavLink>, icon: <MdOutlineFeaturedPlayList/>},
      {title: <NavLink to='/job_report'>Repoted Job </NavLink>, icon: <MdOutlineFeaturedPlayList/>},
      {title: <NavLink to='/premium_user'>Premium User  </NavLink>, icon: <MdOutlineFeaturedPlayList/>},
      {title: <NavLink to='/not_premium_user'>Not Premium User </NavLink>, icon: <MdOutlineFeaturedPlayList/>},
      {title: <NavLink to='/company_varify'>Company Verify</NavLink>, icon: <MdOutlineFeaturedPlayList/>},
      {title: <NavLink to='/profile_varify'>Profile Verify</NavLink>, icon: <MdOutlineFeaturedPlayList/>},
    ];
    return (
        <div className=" ">
        <div
          className={` ${
            open ? "w-72" : "w-20 "
          } bg-dark-purple  shadow-sm relative duration-300  `}
        >
          <img
            src={i1}
            className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
             border-2 rounded-full  ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
          
          
          <ul className="App">
            {Menus.map((Menu, index) => (
              <li
                key={index}
                className={`flex  rounded-md p-[7px] cursor-pointer hover:text-[#0077B5] text-black text-[15px] font-medium items-center gap-x-2 
                ${Menu.gap ? "mt-" : "mt-"} ${
                  index === 0 && "hover:text-[#0077B5]"
                } `}
              >
                <div>{Menu.icon}</div>
                <span className={`${!open && "hidden"} origin-left duration-200`}>
                  {Menu.title}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
};

export default SideNav;