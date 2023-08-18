import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/Context";

const Login = () => {
  const { login, forgetPassword } = useContext(AuthContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [loginError, setLoginError] = useState("");
  const [emailError, setemailError] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handelLogin = (data) => {
    console.log(data);
    login(data.email, data.password)
      .then((res) => {
        setemailError("");
        setLoginError("");
        navigate(from, { replace: true });
        alert.success("Login Success");
      })
      .catch((error) => {
        console.log(error);
        setemailError("Invalid Email");
        setLoginError("wrong password");
      });
  };

  const forgetPass = () => {
    forgetPassword(userEmail)
      .then(() => {
        alert.success("Check your email To reset password");
      })
      .catch((error) => alert.error(error.message));
  };

  return (
    <div className="h-[800px] flex justify-center items-center">
      <div className="w-96 p-7">
        <h2 className="text-xl text-center">Login</h2>
        <form onSubmit={handleSubmit(handelLogin)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              onBlur={(event) => setUserEmail(event.target.value)}
              type="text"
              {...register("email", {
                required: "Email Address is required",
              })}
              placeholder="Email"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          {errors.email && (
            <p className="text-red-600">{errors.email?.message}</p>
          )}
          <p className="text-red-500	">{emailError}</p>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be 6 characters or longer",
                },
              })}
              placeholder="Password"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <p className="text-red-500	">{loginError}</p>
          <label className="label">
            {" "}
            <button onClick={forgetPass} className="label-text">
              Forget Password?
            </button>
          </label>
          {errors.password && (
            <p className="text-red-600">{errors.password?.message}</p>
          )}
          <p className="text-red-500	">{loginError}</p>

          <input
            className="btn bg-indigo-500 text-white w-full"
            value="Login"
            type="submit"
          />
        </form>
        <p>
          New to Bringin Admin Panel{" "}
          <Link className="text-secondary" to="/singUp">
            Create new Account
          </Link>
        </p>
        <div className="divider">OR</div>
      </div>
    </div>
  );
};

export default Login;
