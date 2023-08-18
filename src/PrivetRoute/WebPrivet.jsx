import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useWeb from "../useRole/useWeb";
import { AuthContext } from "../Components/Context/Context";
import Spinner from "../Components/Spinner/Spinner";

const WebPrivet = ({ children }) => {
  const { user, loding } = useContext(AuthContext);
  const [isWeb, isloading] = useWeb(user?.email);
  const location = useLocation();

  if (loding || isloading) {
    return <Spinner></Spinner>;
  } else if (user && isWeb) {
    return children;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }
};

export default WebPrivet;
