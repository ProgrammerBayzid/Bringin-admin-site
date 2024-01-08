import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/Context";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { setAuthToken } from "../../useRole/useToken";

const SingUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, updateName, setRender, setUser } =
    useContext(AuthContext);
  const [signUpError, setSignUPError] = useState("");

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const show = () => {
    setShowPassword(!showPassword);
  };
  const handleSignUp = (data) => {
    const photoURL = data.photoURL[0];
    const formData = new FormData();
    formData.append("image", photoURL);
    const url =
      "https://api.imgbb.com/1/upload?key=c2c551cba75c38c77abfe198c7752c47";
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        console.log(imageData);
        setSignUPError("");
        createUser(data.email, data.password, data.designation)
          .then((result) => {
            const user = result.user;
            toast.success("User Created Successfully.");
            // navigate('/')
            const userInfo = {
              displayName: data.displayName,
            };
            updateName(userInfo)
              .then(() => {
                saveUser(data.displayName, data.email, imageData.data.url);
                console.log(data.displayName, data.email, imageData.data.url);
              })
              .catch((error) => {
                toast.error(error.massage);
              });
          })
          .catch((error) => {
            console.log(error);
            setSignUPError(error.message);
          });
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const saveUser = (displayName, email, photoURL) => {
    const user = { displayName, email, photoURL };
    fetch("https://rsapp.unbolt.co/email_singup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        setAuthToken(email);
        setUser((pred) => ({ ...pred, ...user }));
        setRender((prev) => !prev);
        navigate("/");
        console.log("data",data);
      });
  };

  return (
    <div className="h-[800px] flex justify-center items-center">
      <div className="w-96 p-7">
        <h2 className="text-xl text-center">Sign Up</h2>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              {...register("displayName", {
                required: "Name is Required",
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              {...register("email", {
                required: true,
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Photo</span>
            </label>
            <input
              type="file"
              {...register("photoURL", {
                required: "Photo is Required",
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.img && <p className="text-red-500">{errors.img.message}</p>}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text">Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
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
              <button
                type="button" // Prevent the button from triggering form submission
                className="label-text absolute inset-y-0 right-2"
                onClick={show}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible></AiOutlineEyeInvisible>
                ) : (
                  <AiOutlineEye></AiOutlineEye>
                )}
              </button>
            </div>
            {/* <label className="label"> <span className="label-text">Please selected a role</span></label>
                        <select
                            type="text" {...register("designation", {
                                required: "Its rwquires",
                            })}
                            className="select select-bordered w-full max-w-xs">
                            <option selected>Buyer</option>
                            <option>Seller</option>
                        </select> */}
          </div>

          <input
            className="btn bg-indigo-500 text-white w-full mt-4"
            value="Sign Up"
            type="submit"
          />
          {signUpError && <p className="text-red-600">{signUpError}</p>}
        </form>
        <p>
          Already have an account{" "}
          <Link className="text-secondary" to="/login">
            Please Login
          </Link>
        </p>
        <div className="divider">OR</div>
      </div>
    </div>
  );
};

export default SingUp;
