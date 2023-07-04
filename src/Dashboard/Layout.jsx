import { Outlet } from "react-router-dom";
import SideNav from "../Components/AdminComponent/SideNav";

const Layout = () => {
    return (
        <div>
             <div className="flex gap-10">
                <SideNav></SideNav>
                <div className="mt-5">
                <Outlet></Outlet>
                </div>
             </div>
        </div>
    );
};

export default Layout;