import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useApp from "../useRole/useApp";
import { AuthContext } from "../Components/Context/Context";
import Spinner from "../Components/Spinner/Spinner";

const AppPrivet = ({ children }) => {
  const { user, loding } = useContext(AuthContext);
  const [isApp, isloading] = useApp(user?.email);
  const location = useLocation();

  if (loding || isloading) {
    return <Spinner></Spinner>;
  } else if (user && isApp) {
    return children;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }
};

export default AppPrivet;
