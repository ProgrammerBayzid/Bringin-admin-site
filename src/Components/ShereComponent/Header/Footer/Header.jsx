import { BellFilled, MailOutlined } from "@ant-design/icons";
import { Badge, Drawer, Image, List, Space, Typography } from "antd";
import logo from "../../../../../public/browgerlogo.svg";
import { useState } from "react";

import useAdmin from "../../../../useRole/useAdmin";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Link, NavLink } from "react-router-dom";
import Sidebar from "../../../../assets/logo/Sidebar.svg";
import { useContext } from "react";
import { AuthContext } from "../../../Context/Context";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Header() {
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);

  const menuItems = (
    <>
      
      
          <ul className=" items-center">
            <li className="">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex justify-center w-full ">
                    <img
                      alt="bringin image"
                      src={Sidebar}
                      className="w-[28px] h-[17px] cursor-pointer mx-3"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-[270px] h-[220px] rounded-bl-3xl  shadow-lg bg-white ">
                    <div className="py-1  pl-[40px] my-5">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/"
                            className={classNames(" text-black text-[18px] hover:text-[#0077B5] font-semibold", 
                            "block  mt-[2px]"
                            )}
                          >
                            Home
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/login"
                            className={classNames(" text-black text-[18px] hover:text-[#0077B5] font-semibold",
                            "block  mt-[2px]"
                            )}
                          >
                            Login
                          </Link>
                        )}
                      </Menu.Item>
                      {
                        isAdmin && <>
                        
                        
                        
                        
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/singUp"
                            className={classNames(" text-black text-[18px] hover:text-[#0077B5] font-semibold",
                            "block  mt-[2px]"
                            )}
                          >
                            Sing Up
                          </Link>
                        )}
                      </Menu.Item>
                       <Menu.Item>
                       {({ active }) => (
                         <Link
                           to="/dashboard/all_admin_user"
                           className={classNames(
                             "text-black lg:text-[18px] hover:text-[#0077B5] font-semibold ",
                             "block  mt-[2px]"
                           )}
                         >
                           All Admin User{" "}
                         </Link>
                       )}
                     </Menu.Item>
                        </>

                      }
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/dashboard"
                            className={classNames(" text-black text-[18px] hover:text-[#0077B5] font-semibold",
                            "block  mt-[2px]"
                            )}
                          >
                            Dashboard
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/profile"
                            className={classNames(" text-black text-[18px] hover:text-[#0077B5] font-semibold", 
                            "block  mt-[2px]"
                            )}
                          >
                            Profile
                          </Link>
                        )}
                      </Menu.Item>

                     
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </li>
          </ul>
        
      
    </>
  );

  return (
    <div className="App sticky top-0 z-40 App  bg-white App shadow-sm lg:py-2 md:py-2 py-5  ">
      <div className="flex items-center justify-between mx-10 ">
        <Image width={40} src={logo}></Image>
        <div> {menuItems}</div>
      
      </div>
    </div>
  );
}
export default Header;
