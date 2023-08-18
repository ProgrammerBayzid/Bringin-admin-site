import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Components/Context/Context";
import Spinner from "../Components/Spinner/Spinner";

const PrivetRoute = ({ children }) => {
  const { user, loding } = useContext(AuthContext);
  const location = useLocation();

  if (loding) {
    return <Spinner></Spinner>;
  } else if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivetRoute;
