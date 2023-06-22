 
import { useState } from "react";
import { Link } from "react-router-dom";
import i1 from '../../assets/about/Group 11884.svg'
import { MdOutlineDashboardCustomize,MdOutlineFeaturedPlayList, } from "react-icons/md";
const SideNav = () => {
    const [open, setOpen] = useState(true);
    const Menus = [
      { title: <Link to='/'>Dashboard</Link>, icon: <MdOutlineDashboardCustomize></MdOutlineDashboardCustomize> },
      {title: <Link to='/customer'>Customers</Link>, icon: <MdOutlineFeaturedPlayList/>},
      {title: <Link to='/jobetype'>Job Type</Link>, icon: <MdOutlineFeaturedPlayList/>},
      {title: <Link to='/industryadd'>Industry Name</Link>, icon: <MdOutlineFeaturedPlayList/>},
      {title: <Link to='/categoryadd'>Categories </Link>, icon: <MdOutlineFeaturedPlayList/>},
      {title: <Link to='/functionalareaadd'>Expertise Area </Link>, icon: <MdOutlineFeaturedPlayList/>},
      {title: <Link to='/locationadd'>Location </Link>, icon: <MdOutlineFeaturedPlayList/>},
      {title: <Link to='/salaries'>Salaries </Link>, icon: <MdOutlineFeaturedPlayList/>},
      {title: <Link to='/educationlavel'>Educational Level </Link>, icon: <MdOutlineFeaturedPlayList/>},
      {title: <Link to='/digree'>Degree</Link>, icon: <MdOutlineFeaturedPlayList/>},
      {title: <Link to='/subject'>Subject </Link>, icon: <MdOutlineFeaturedPlayList/>},
    ];
    return (
        <div className=" App">
        <div
          className={` ${
            open ? "w-72" : "w-20 "
          } bg-dark-purple h-screen p-5  pt-8 relative duration-300 shadow-lg my-10`}
        >
          <img
            src={i1}
            className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
             border-2 rounded-full  ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
          
          <div className="flex gap-x-4 items-center">
{/*             
            <img
            src={b}
           
            className={`w-10 cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
            
            >

            </img> */}
            <h1
              className={`text-[#0077B5] origin-left font-semibold text-[30px] duration-200 ${
                !open && "scale-0"
              }`}
            >
              Bringin
            </h1>
          </div>
          <ul className="pt-6">
            {Menus.map((Menu, index) => (
              <li
                key={index}
                className={`flex  rounded-md p-2 cursor-pointer hover:text-[#0077B5] text-black text-[17px] items-center gap-x-4 
                ${Menu.gap ? "mt-9" : "mt-2"} ${
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