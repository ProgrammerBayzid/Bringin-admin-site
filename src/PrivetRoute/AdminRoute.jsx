import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../useRole/useAdmin";
import { AuthContext } from "../Components/Context/Context";
import Spinner from "../Components/Spinner/Spinner";
const AdminRouter = ({ children }) => {
  const { user, loding } = useContext(AuthContext);
  const [isAdmin, isloading] = useAdmin(user?.email);
  const location = useLocation();

  if (loding || isloading) {
    return <Spinner></Spinner>;
  } else if (user && isAdmin) {
    return children;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }
};

export default AdminRouter;
