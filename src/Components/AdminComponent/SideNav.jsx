import { useState } from "react";
import { NavLink } from "react-router-dom";
import i1 from "../../assets/about/Group 11884.svg";
import {
  MdOutlineDashboardCustomize,
  MdOutlineFeaturedPlayList,
} from "react-icons/md";
import { AuthContext } from "../Context/Context";
import { useContext } from "react";
import useAdmin from "../../useRole/useAdmin";
import useApp from "../../useRole/useApp";
import useWeb from "../../useRole/useWeb";

const SideNav = () => {
  const [open, setOpen] = useState(true);
  const { user } = useContext(AuthContext);

  const [isAdmin] = useAdmin(user?.email);
  const [isApp] = useApp(user?.email);
  const [isWeb] = useWeb(user?.email);

  const Menus = (
    <>
      <li className="my-5">
        <NavLink
          to="/dashboard/blog_post"
          className="border hover:bg-[#0077B5] hover:text-white my-4  rounded-md p-[7px] cursor-pointer hover:text-[#0077B5]  text-[13px]  font-medium items-center gap-x-2 "
        >
          <span className={`${!open && "hidden"} origin-left duration-200`}>
            Add Blogs
          </span>
        </NavLink>
      </li>

      <li className="my-5">
        <NavLink
          to="/dashboard/all_blog"
          className="border hover:bg-[#0077B5] hover:text-white my-4  rounded-md p-[7px] cursor-pointer hover:text-[#0077B5]  text-[13px]  font-medium items-center gap-x-2 "
        >
          <span className={`${!open && "hidden"} origin-left duration-200`}>
            All Blogs
          </span>
        </NavLink>
      </li>

      <li className="my-5">
        <NavLink
          to="/dashboard/bringin_featured"
          className="border hover:bg-[#0077B5] hover:text-white my-4  rounded-md p-[7px] cursor-pointer hover:text-[#0077B5]  text-[13px]  font-medium items-center gap-x-2 "
        >
          <span className={`${!open && "hidden"} origin-left duration-200`}>
            Add Bringin Featured
          </span>
        </NavLink>
      </li>

      <li className="my-5">
        <NavLink
          to="/dashboard/allbringin_featured"
          className="border hover:bg-[#0077B5] hover:text-white my-4  rounded-md p-[7px] cursor-pointer hover:text-[#0077B5]  text-[13px]  font-medium items-center gap-x-2 "
        >
          <span className={`${!open && "hidden"} origin-left duration-200`}>
            All Bringin Featureds
          </span>
        </NavLink>
      </li>

      <li className="my-5">
        <NavLink
          to="/dashboard/influencers_opinion"
          className="border hover:bg-[#0077B5] hover:text-white my-4  rounded-md p-[7px] cursor-pointer hover:text-[#0077B5]  text-[13px]  font-medium items-center gap-x-2 "
        >
          <span className={`${!open && "hidden"} origin-left duration-200`}>
            Add Influencers Opinion
          </span>
        </NavLink>
      </li>

      <li className="my-5">
        <NavLink
          to="/dashboard/allinfuencers_opinion"
          className="border hover:bg-[#0077B5] hover:text-white my-4  rounded-md p-[7px] cursor-pointer hover:text-[#0077B5]  text-[13px]  font-medium items-center gap-x-2 "
        >
          <span className={`${!open && "hidden"} origin-left duration-200`}>
            All Influencers Opinions
          </span>
        </NavLink>
      </li>

      <li className="my-5">
        <NavLink
          to="/dashboard/review"
          className="border hover:bg-[#0077B5] hover:text-white my-4  rounded-md p-[7px] cursor-pointer hover:text-[#0077B5]  text-[13px]  font-medium items-center gap-x-2 "
        >
          <span className={`${!open && "hidden"} origin-left duration-200`}>
            Add Review
          </span>
        </NavLink>
      </li>

      <li className="my-5">
        <NavLink
          to="/dashboard/allreview"
          className="border hover:bg-[#0077B5] hover:text-white my-4  rounded-md p-[7px] cursor-pointer hover:text-[#0077B5]  text-[13px]  font-medium items-center gap-x-2 "
        >
          <span className={`${!open && "hidden"} origin-left duration-200`}>
            All Reviews
          </span>
        </NavLink>
      </li>

      <li className="my-5">
        <NavLink
          to="/dashboard/cities"
          className="border hover:bg-[#0077B5] hover:text-white my-4  rounded-md p-[7px] cursor-pointer hover:text-[#0077B5]  text-[13px]  font-medium items-center gap-x-2 "
        >
          <span className={`${!open && "hidden"} origin-left duration-200`}>
            Add Cities
          </span>
        </NavLink>
      </li>

      <li className="my-5">
        <NavLink
          to="/dashboard/comment"
          className="border hover:bg-[#0077B5] hover:text-white my-4  rounded-md p-[7px] cursor-pointer hover:text-[#0077B5]  text-[13px]  font-medium items-center gap-x-2 "
        >
          <span className={`${!open && "hidden"} origin-left duration-200`}>
            All Comment
          </span>
        </NavLink>
      </li>

      <li className="my-5">
        <NavLink
          to="/dashboard/add_category"
          className="border hover:bg-[#0077B5] hover:text-white my-4  rounded-md p-[7px] cursor-pointer hover:text-[#0077B5]  text-[13px]  font-medium items-center gap-x-2 "
        >
          <span className={`${!open && "hidden"} origin-left duration-200`}>
            Add Category
          </span>
        </NavLink>
      </li>

      <li className="my-5">
        <NavLink
          to="/dashboard/all_category"
          className="border hover:bg-[#0077B5] hover:text-white my-4  rounded-md p-[7px] cursor-pointer hover:text-[#0077B5]  text-[13px]  font-medium items-center gap-x-2 "
        >
          <span className={`${!open && "hidden"} origin-left duration-200`}>
            All Category
          </span>
        </NavLink>
      </li>

      <li className="my-5">
        <NavLink
          to="/dashboard/image"
          className="border hover:bg-[#0077B5] hover:text-white my-4  rounded-md p-[7px] cursor-pointer hover:text-[#0077B5]  text-[13px]  font-medium items-center gap-x-2 "
        >
          <span className={`${!open && "hidden"} origin-left duration-200`}>
            All imag
          </span>
        </NavLink>
      </li>
    </>
  );

  return (
    <div className=" ">
      <div
        className={` ${
          open ? "w-44 ml-4" : "w-7 "
        } bg-dark-purple  shadow-sm relative duration-300  `}
      >
        <img
          src={i1}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border hover:bg-[#0077B5] hover:text-white-dark-purple
             border hover:bg-[#0077B5] hover:text-white-2 rounded-full  ${
               !open && "rotate-180"
             }`}
          onClick={() => setOpen(!open)}
        />

        <ul className="App">
          {isApp && (
            <>
              <h1
                className={`${
                  !open && "hidden"
                } origin-left duration-200 ml-2 text-[16px]  font-medium`}
              >
                App Dashbord
              </h1>
              {/* <li className="border hover:bg-[#0077B5] hover:text-white my-4  rounded-md p-[7px] cursor-pointer hover:text-[#0077B5]  text-[13px]  font-medium items-center gap-x-2 ">
                <div>
                  {" "}
                 {" "}
                </div>
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </span>
              </li> */}
              {/* <li className="my-5">
                <NavLink
                  to="/dashboard/verification"
                  className="border hover:bg-[#0077B5] hover:text-white my-4  rounded-md p-[7px] cursor-pointer hover:text-[#0077B5]  text-[13px]  font-medium items-center gap-x-2 "
                >
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    Recuiters
                  </span>
                </NavLink>
              </li> */}

              <li className="my-5">
                <NavLink
                  to="/dashboard/premium_user"
                  className="border hover:bg-[#0077B5] hover:text-white my-4  rounded-md p-[7px] cursor-pointer hover:text-[#0077B5]  text-[13px]  font-medium items-center gap-x-2 "
                >
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    Premium User{" "}
                  </span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/not_premium_user"
                  className="border hover:bg-[#0077B5] hover:text-white my-4  rounded-md p-[7px] cursor-pointer hover:text-[#0077B5]  text-[13px]  font-medium items-center gap-x-2 "
                >
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    Free User{" "}
                  </span>
                </NavLink>
              </li>
              <li className="my-5">
                <NavLink
                  to="/dashboard/industryadd"
                  className="border hover:bg-[#0077B5] hover:text-white my-4  rounded-md p-[7px] cursor-pointer hover:text-[#0077B5]  text-[13px]  font-medium items-center gap-x-2 "
                >
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    Industry
                  </span>
                </NavLink>
              </li>

              <li className="my-5">
                <NavLink
                  to="/dashboard/categoryadd"
                  className="border hover:bg-[#0077B5] hover:text-white my-4  rounded-md p-[7px] cursor-pointer hover:text-[#0077B5]  text-[13px]  font-medium items-center gap-x-2 "
                >
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    Categories
                  </span>
                </NavLink>
              </li>

              <li className="my-5">
                <NavLink
                  to="/dashboard/category"
                  className="border hover:bg-[#0077B5] hover:text-white my-4  rounded-md p-[7px] cursor-pointer hover:text-[#0077B5]  text-[13px]  font-medium items-center gap-x-2 "
                >
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    New Category
                  </span>
                </NavLink>
              </li>

              <li className="my-5"></li>
              <NavLink
                to="/dashboard/sub_category "
                className="border hover:bg-[#0077B5] hover:text-white my-4  rounded-md p-[7px] cursor-pointer hover:text-[#0077B5]  text-[13px]  font-medium items-center gap-x-2 "
              >
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  New Sub-Category{" "}
                </span>
              </NavLink>

              <li className="my-5">
                <NavLink
                  to="/dashboard/functionalareaadd"
                  className="border hover:bg-[#0077B5] hover:text-white my-4  rounded-md p-[7px] cursor-pointer hover:text-[#0077B5]  text-[13px]  font-medium items-center gap-x-2 "
                >
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    Expertise Area{" "}
                  </span>
                </NavLink>
              </li>

              <li className="my-5">
                <NavLink
                  to="/dashboard/educationlavel"
                  className="border hover:bg-[#0077B5] hover:text-white my-4  rounded-md p-[7px] cursor-pointer hover:text-[#0077B5]  text-[13px]  font-medium items-center gap-x-2 "
                >
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    Educational Level{" "}
                  </span>
                </NavLink>
              </li>

              <li className="my-5">
                <NavLink
                  to="/dashboard/digree"
                  className="border hover:bg-[#0077B5] hover:text-white my-4  rounded-md p-[7px] cursor-pointer hover:text-[#0077B5]  text-[13px]  font-medium items-center gap-x-2 "
                >
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    Degree
                  </span>
                </NavLink>
              </li>

              <li className="my-5">
                <NavLink
                  to="/dashboard/subject"
                  className="border hover:bg-[#0077B5] hover:text-white my-4  rounded-md p-[7px] cursor-pointer hover:text-[#0077B5]  text-[13px]  font-medium items-center gap-x-2 "
                >
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    Subject
                  </span>
                </NavLink>
              </li>

              <li className="my-5">
                <NavLink
                  to="/dashboard/skill"
                  className="border hover:bg-[#0077B5] hover:text-white my-4  rounded-md p-[7px] cursor-pointer hover:text-[#0077B5]  text-[13px]  font-medium items-center gap-x-2 "
                >
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    Skill
                  </span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/salaries"
                  className="border hover:bg-[#0077B5] hover:text-white my-4  rounded-md p-[7px] cursor-pointer hover:text-[#0077B5]  text-[13px]  font-medium items-center gap-x-2 "
                >
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    Salary
                  </span>
                </NavLink>
              </li>
              <li className="my-5">
                <NavLink
                  to="/dashboard/companyname"
                  className="border hover:bg-[#0077B5] hover:text-white my-4  rounded-md p-[7px] cursor-pointer hover:text-[#0077B5]  text-[13px]  font-medium items-center gap-x-2 "
                >
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    Company Name
                  </span>
                </NavLink>
              </li>

              <li className="my-5">
                <NavLink
                  to="/dashboard/companysize"
                  className="border hover:bg-[#0077B5] hover:text-white my-4  rounded-md p-[7px] cursor-pointer hover:text-[#0077B5]  text-[13px]  font-medium items-center gap-x-2 "
                >
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    Company Size
                  </span>
                </NavLink>
              </li>

              <li className="my-5">
                <NavLink
                  to="/dashboard/department"
                  className="border hover:bg-[#0077B5] hover:text-white my-4  rounded-md p-[7px] cursor-pointer hover:text-[#0077B5]  text-[13px]  font-medium items-center gap-x-2 "
                >
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    Department
                  </span>
                </NavLink>
              </li>

              <li className="my-5">
                <NavLink
                  to="/dashboard/jobtitle"
                  className="border hover:bg-[#0077B5] hover:text-white my-4  rounded-md p-[7px] cursor-pointer hover:text-[#0077B5]  text-[13px]  font-medium items-center gap-x-2 "
                >
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    Job Title
                  </span>
                </NavLink>
              </li>

              <li className="my-5">
                <NavLink
                  to="/dashboard/experince"
                  className="border hover:bg-[#0077B5] hover:text-white my-4  rounded-md p-[7px] cursor-pointer hover:text-[#0077B5]  text-[13px]  font-medium items-center gap-x-2 "
                >
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    Experince
                  </span>
                </NavLink>
              </li>

              <li className="my-5">
                <NavLink
                  to="/dashboard/locationadd"
                  className="border hover:bg-[#0077B5] hover:text-white my-4  rounded-md p-[7px] cursor-pointer hover:text-[#0077B5]  text-[13px]  font-medium items-center gap-x-2 "
                >
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    Location
                  </span>
                </NavLink>
              </li>

              <li className="my-5">
                <NavLink
                  to="/dashboard/city"
                  className="border hover:bg-[#0077B5] hover:text-white my-4  rounded-md p-[7px] cursor-pointer hover:text-[#0077B5]  text-[13px]  font-medium items-center gap-x-2 "
                >
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    City
                  </span>
                </NavLink>
              </li>

              <li className="my-5">
                <NavLink
                  to="/dashboard/jobetype"
                  className="border hover:bg-[#0077B5] hover:text-white my-4  rounded-md p-[7px] cursor-pointer hover:text-[#0077B5]  text-[13px]  font-medium items-center gap-x-2 "
                >
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    Job Type
                  </span>
                </NavLink>
              </li>
            </>
          )}

          {isWeb && (
            <>
              <h1
                className={`${
                  !open && "hidden"
                } origin-left duration-200 ml-2 text-[16px]  font-medium`}
              >
                Web Dashbord
              </h1>
              {Menus}
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SideNav;
