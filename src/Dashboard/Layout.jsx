import { Outlet, useLocation } from "react-router-dom";
import SideNav from "../Components/AdminComponent/SideNav";
import Header from "../Components/ShereComponent/Header/Footer/Header";
import { useEffect } from "react";

const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
    return (
        <div>
            
             <div >
             <Header></Header>
               <div className="flex gap-10">
             <div className="">
             <SideNav></SideNav>
             </div>
                <div className="mt-2 w-full">
                <Outlet></Outlet>
                </div>
               </div>
             </div>
        </div>
    );
};

export default Layout;