import { Outlet, useLocation } from "react-router-dom";

import { useEffect } from "react";
import RecruterSideNav from "../Components/RecruterSideNav/RecruterSideNav";

const ReacruterLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

    return (
        <div>
            
             <div >
               <div className="">
              <div className="relative">
              <RecruterSideNav ></RecruterSideNav>
                <div className="mt-1 w-full px-4 absolute inset-x-0 top-0">
                <Outlet></Outlet>
                </div>
              </div>
               </div>
             </div>
        </div>
    );
};

export default ReacruterLayout;