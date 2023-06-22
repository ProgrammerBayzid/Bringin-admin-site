import { Outlet } from "react-router-dom";
import SideNav from "../Components/AdminComponent/SideNav";
// import Header from "../Components/ShereComponent/Header/Footer/Header";

const Layout = () => {
    return (
        <div>
             <div className="flex gap-10">
                <SideNav></SideNav>
                <Outlet></Outlet>
             </div>
        </div>
    );
};

export default Layout;