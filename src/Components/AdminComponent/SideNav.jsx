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
      <li className="my-1">
        <NavLink
          to="/dashboard/blog_post"
          className={`${
            open ? "w-[180px] " : "w-0 "
          }   border  text-[13px]  font-medium flex items-center pl-2  hover:bg-[#0077B5] hover:text-white my-2 rounded-md hover:text-[#0077B5] py-[5px]`}
        >
          <span className={`${!open && "hidden"} origin-left duration-200`}>
            Add Blogs
          </span>
        </NavLink>
      </li>

      <li className="my-1">
        <NavLink
          to="/dashboard/all_blog"
          className={`${
            open ? "w-[180px] " : "w-0 "
          }   border  text-[13px]  font-medium flex items-center pl-2  hover:bg-[#0077B5] hover:text-white my-2 rounded-md hover:text-[#0077B5] py-[5px]`}
        >
          <span className={`${!open && "hidden"} origin-left duration-200`}>
            All Blogs
          </span>
        </NavLink>
      </li>

      <li className="my-1">
        <NavLink
          to="/dashboard/bringin_featured"
          className={`${
            open ? "w-[180px] " : "w-0 "
          }   border  text-[13px]  font-medium flex items-center pl-2  hover:bg-[#0077B5] hover:text-white my-2 rounded-md hover:text-[#0077B5] py-[5px]`}
        >
          <span className={`${!open && "hidden"} origin-left duration-200`}>
            Add Bringin Featured
          </span>
        </NavLink>
      </li>

      <li className="my-1">
        <NavLink
          to="/dashboard/allbringin_featured"
          className={`${
            open ? "w-[180px] " : "w-0 "
          }   border  text-[13px]  font-medium flex items-center pl-2  hover:bg-[#0077B5] hover:text-white my-2 rounded-md hover:text-[#0077B5] py-[5px]`}
        >
          <span className={`${!open && "hidden"} origin-left duration-200`}>
            All Bringin Featureds
          </span>
        </NavLink>
      </li>

      <li className="my-1">
        <NavLink
          to="/dashboard/influencers_opinion"
          className={`${
            open ? "w-[180px] " : "w-0 "
          }   border  text-[13px]  font-medium flex items-center pl-2  hover:bg-[#0077B5] hover:text-white my-2 rounded-md hover:text-[#0077B5] py-[5px]`}
        >
          <span className={`${!open && "hidden"} origin-left duration-200`}>
            Add Influencers Opinion
          </span>
        </NavLink>
      </li>

      <li className="my-1">
        <NavLink
          to="/dashboard/allinfuencers_opinion"
          className={`${
            open ? "w-[180px] " : "w-0 "
          }   border  text-[13px]  font-medium flex items-center pl-2  hover:bg-[#0077B5] hover:text-white my-2 rounded-md hover:text-[#0077B5] py-[5px]`}
        >
          <span className={`${!open && "hidden"} origin-left duration-200`}>
            All Influencers Opinions
          </span>
        </NavLink>
      </li>

      <li className="my-1">
        <NavLink
          to="/dashboard/review"
          className={`${
            open ? "w-[180px] " : "w-0 "
          }   border  text-[13px]  font-medium flex items-center pl-2  hover:bg-[#0077B5] hover:text-white my-2 rounded-md hover:text-[#0077B5] py-[5px]`}
        >
          <span className={`${!open && "hidden"} origin-left duration-200`}>
            Add Review
          </span>
        </NavLink>
      </li>

      <li className="my-1">
        <NavLink
          to="/dashboard/allreview"
          className={`${
            open ? "w-[180px] " : "w-0 "
          }   border  text-[13px]  font-medium flex items-center pl-2  hover:bg-[#0077B5] hover:text-white my-2 rounded-md hover:text-[#0077B5] py-[5px]`}
        >
          <span className={`${!open && "hidden"} origin-left duration-200`}>
            All Reviews
          </span>
        </NavLink>
      </li>

      <li className="my-1">
        <NavLink
          to="/dashboard/cities"
          className={`${
            open ? "w-[180px] " : "w-0 "
          }   border  text-[13px]  font-medium flex items-center pl-2  hover:bg-[#0077B5] hover:text-white my-2 rounded-md hover:text-[#0077B5] py-[5px]`}
        >
          <span className={`${!open && "hidden"} origin-left duration-200`}>
            Add Cities
          </span>
        </NavLink>
      </li>

      <li className="my-1">
        <NavLink
          to="/dashboard/comment"
          className={`${
            open ? "w-[180px] " : "w-0 "
          }   border  text-[13px]  font-medium flex items-center pl-2  hover:bg-[#0077B5] hover:text-white my-2 rounded-md hover:text-[#0077B5] py-[5px]`}
        >
          <span className={`${!open && "hidden"} origin-left duration-200`}>
            All Comment
          </span>
        </NavLink>
      </li>

      <li className="my-1">
        <NavLink
          to="/dashboard/add_category"
          className={`${
            open ? "w-[180px] " : "w-0 "
          }   border  text-[13px]  font-medium flex items-center pl-2  hover:bg-[#0077B5] hover:text-white my-2 rounded-md hover:text-[#0077B5] py-[5px]`}
        >
          <span className={`${!open && "hidden"} origin-left duration-200`}>
            Add Category
          </span>
        </NavLink>
      </li>

      <li className="my-1">
        <NavLink
          to="/dashboard/all_category"
          className={`${
            open ? "w-[180px] " : "w-0 "
          }   border  text-[13px]  font-medium flex items-center pl-2  hover:bg-[#0077B5] hover:text-white my-2 rounded-md hover:text-[#0077B5] py-[5px]`}
        >
          <span className={`${!open && "hidden"} origin-left duration-200`}>
            All Category
          </span>
        </NavLink>
      </li>

      <li className="my-1">
        <NavLink
          to="/dashboard/image"
          className={`${
            open ? "w-[180px] " : "w-0 "
          }   border  text-[13px]  font-medium flex items-center pl-2  hover:bg-[#0077B5] hover:text-white my-2 rounded-md hover:text-[#0077B5] py-[5px]`}
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
          open
            ? "w-[220px] ml-4  sticky top-[57px] h-[700px]  overflow-y-auto"
            : "w-7 "
        } bg-dark-purple  shadow-sm relative duration-300  `}
      >
        <img
          src={i1}
          className={`absolute cursor-pointer -right-3 top-9 w-7 mr-4 border hover:bg-[#0077B5] hover:text-white-dark-purple
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
                } origin-left duration-200 pl-2  mt-2 text-[16px]  font-medium`}
              >
                App Dashbord
              </h1>

              <li className="my-1">
                <NavLink
                  to="/dashboard/category"
                  className={`${
                    open ? "w-[180px] " : "w-0 "
                  }   border  text-[13px]  font-medium flex items-center pl-2  hover:bg-[#0077B5] hover:text-white my-2 rounded-md hover:text-[#0077B5] py-[5px]`}
                >
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    Industry
                  </span>
                </NavLink>
              </li>

              <li className="my-1">
                <NavLink
                  to="/dashboard/sub_category "
                  className={`${
                    open ? "w-[180px] " : "w-0 "
                  }   border  text-[13px]  font-medium flex items-center pl-2  hover:bg-[#0077B5] hover:text-white my-2 rounded-md hover:text-[#0077B5] py-[5px]`}
                >
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    Sub-Industry{" "}
                  </span>
                </NavLink>
              </li>
              <li className="my-1">
                <NavLink
                  to="/dashboard/industryadd"
                  className={`${
                    open ? "w-[180px] " : "w-0 "
                  }   border  text-[13px]  font-medium flex items-center pl-2  hover:bg-[#0077B5] hover:text-white my-2 rounded-md hover:text-[#0077B5] py-[5px]`}
                >
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    Categories
                  </span>
                </NavLink>
              </li>

              <li className="my-1">
                <NavLink
                  to="/dashboard/categoryadd"
                  className={`${
                    open ? "w-[180px] " : "w-0 "
                  }   border  text-[13px]  font-medium flex items-center pl-2  hover:bg-[#0077B5] hover:text-white my-2 rounded-md hover:text-[#0077B5] py-[5px]`}
                >
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    Sub-Categories
                  </span>
                </NavLink>
              </li>
              <li className="my-1">
                <NavLink
                  to="/dashboard/functionalareaadd"
                  className={`${
                    open ? "w-[180px] " : "w-0 "
                  }   border  text-[13px]  font-medium flex items-center pl-2  hover:bg-[#0077B5] hover:text-white my-2 rounded-md hover:text-[#0077B5] py-[5px]`}
                >
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    Expertise Area{" "}
                  </span>
                </NavLink>
              </li>

              <li className="my-1 ">
                <NavLink
                  to="/dashboard/premium_user"
                  className={`${
                    open ? "w-[180px] " : "w-0 "
                  }   border  text-[13px]  font-medium flex items-center pl-2  hover:bg-[#0077B5] hover:text-white my-2 rounded-md hover:text-[#0077B5] py-[5px]`}
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
                  className={`${
                    open ? "w-[180px] " : "w-0 "
                  }   border  text-[13px]  font-medium flex items-center pl-2  hover:bg-[#0077B5] hover:text-white my-2 rounded-md hover:text-[#0077B5] py-[5px]`}
                >
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    Free User{" "}
                  </span>
                </NavLink>
              </li>
              <li className="my-1">
                <NavLink
                  to="/dashboard/helpfeedback"
                  className={`${
                    open ? "w-[180px] " : "w-0 "
                  }   border  text-[13px]  font-medium flex items-center pl-2  hover:bg-[#0077B5] hover:text-white my-2 rounded-md hover:text-[#0077B5] py-[5px]`}
                >
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    Help & Feedback
                  </span>
                </NavLink>
              </li>
              <li className="my-1">
                <NavLink
                  to="/dashboard/usercontactus"
                  className={`${
                    open ? "w-[180px] " : "w-0 "
                  }   border  text-[13px]  font-medium flex items-center pl-2  hover:bg-[#0077B5] hover:text-white my-2 rounded-md hover:text-[#0077B5] py-[5px]`}
                >
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    User Feedback
                  </span>
                </NavLink>
              </li>

              <li className="my-1">
                <NavLink
                  to="/dashboard/educationlavel"
                  className={`${
                    open ? "w-[180px] " : "w-0 "
                  }   border  text-[13px]  font-medium flex items-center pl-2  hover:bg-[#0077B5] hover:text-white my-2 rounded-md hover:text-[#0077B5] py-[5px]`}
                >
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    Educational Level{" "}
                  </span>
                </NavLink>
              </li>

              <li className="my-1">
                <NavLink
                  to="/dashboard/digree"
                  className={`${
                    open ? "w-[180px] " : "w-0 "
                  }   border  text-[13px]  font-medium flex items-center pl-2  hover:bg-[#0077B5] hover:text-white my-2 rounded-md hover:text-[#0077B5] py-[5px]`}
                >
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    Degree
                  </span>
                </NavLink>
              </li>

              <li className="my-1">
                <NavLink
                  to="/dashboard/subject"
                  className={`${
                    open ? "w-[180px] " : "w-0 "
                  }   border  text-[13px]  font-medium flex items-center pl-2  hover:bg-[#0077B5] hover:text-white my-2 rounded-md hover:text-[#0077B5] py-[5px]`}
                >
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    Subject
                  </span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/salaries"
                  className={`${
                    open ? "w-[180px] " : "w-0 "
                  }   border  text-[13px]  font-medium flex items-center pl-2  hover:bg-[#0077B5] hover:text-white my-2 rounded-md hover:text-[#0077B5] py-[5px]`}
                >
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    Salary
                  </span>
                </NavLink>
              </li>
              <li className="my-1">
                <NavLink
                  to="/dashboard/companyname"
                  className={`${
                    open ? "w-[180px] " : "w-0 "
                  }   border  text-[13px]  font-medium flex items-center pl-2  hover:bg-[#0077B5] hover:text-white my-2 rounded-md hover:text-[#0077B5] py-[5px]`}
                >
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    Company Name
                  </span>
                </NavLink>
              </li>

              <li className="my-1">
                <NavLink
                  to="/dashboard/companysize"
                  className={`${
                    open ? "w-[180px] " : "w-0 "
                  }   border  text-[13px]  font-medium flex items-center pl-2  hover:bg-[#0077B5] hover:text-white my-2 rounded-md hover:text-[#0077B5] py-[5px]`}
                >
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    Company Size
                  </span>
                </NavLink>
              </li>

              <li className="my-1">
                <NavLink
                  to="/dashboard/department"
                  className={`${
                    open ? "w-[180px] " : "w-0 "
                  }   border  text-[13px]  font-medium flex items-center pl-2  hover:bg-[#0077B5] hover:text-white my-2 rounded-md hover:text-[#0077B5] py-[5px]`}
                >
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    Department
                  </span>
                </NavLink>
              </li>

              <li className="my-1">
                <NavLink
                  to="/dashboard/experince"
                  className={`${
                    open ? "w-[180px] " : "w-0 "
                  }   border  text-[13px]  font-medium flex items-center pl-2  hover:bg-[#0077B5] hover:text-white my-2 rounded-md hover:text-[#0077B5] py-[5px]`}
                >
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    Experince
                  </span>
                </NavLink>
              </li>

              <li className="my-1">
                <NavLink
                  to="/dashboard/locationadd"
                  className={`${
                    open ? "w-[180px] " : "w-0 "
                  }   border  text-[13px]  font-medium flex items-center pl-2  hover:bg-[#0077B5] hover:text-white my-2 rounded-md hover:text-[#0077B5] py-[5px]`}
                >
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    Location
                  </span>
                </NavLink>
              </li>

              <li className="my-1">
                <NavLink
                  to="/dashboard/city"
                  className={`${
                    open ? "w-[180px] " : "w-0 "
                  }   border  text-[13px]  font-medium flex items-center pl-2  hover:bg-[#0077B5] hover:text-white my-2 rounded-md hover:text-[#0077B5] py-[5px]`}
                >
                  <span
                    className={`${!open && "hidden"} origin-left duration-200`}
                  >
                    City
                  </span>
                </NavLink>
              </li>

              <li className="my-1">
                <NavLink
                  to="/dashboard/jobetype"
                  className={`${
                    open ? "w-[180px] " : "w-0 "
                  }   border  text-[13px]  font-medium flex items-center pl-2  hover:bg-[#0077B5] hover:text-white my-2 rounded-md hover:text-[#0077B5] py-[5px]`}
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
                } origin-left duration-200 text-[16px] pl-2 font-medium `}
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
