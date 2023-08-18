import { useForm } from "react-hook-form";
// import Spinner from "../Spinner/Spinner";
// import { useState } from "react";
import useTitle from "../../hooks/useTitle";

const Review = () => {
  useTitle('Review - Bringin')

  // const [isLoading, setisLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
     
    const handleAddProduct = (data, e) => {
      const image = data.image[0];
      const formData = new FormData();
      formData.append("image", image);
      const url =
        "https://api.imgbb.com/1/upload?key=c2c551cba75c38c77abfe198c7752c47";
      fetch(url, {
        method: "POST",
        body: formData,
      })
          .then((res) => res.json())
          .then((imgData) => {
            if (imgData.success) {
              console.log(imgData.data.url);
              const blog = {
                name: data.name,
                designation:data.designation,
                about: data.review,
                img: imgData.data.url,
                published_date: new Date().toLocaleString(),
              };
    
              // save blog information to the database
              fetch("https://bringinserver-v1.vercel.app/review", {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify(blog),
              })
                .then((res) => res.json())
                .then((result) => {
                  // setisLoading(false)
                  e.target.reset();
                  console.log(result);
                });
            }
          });
         
      };


    //   if (isLoading) {
    //     return <Spinner></Spinner>
    // }
    return (
        <div className="">
        <div>
          <div className="">
            <h1 className="text-center mt-[25px] lg:text-[42px] md;text-[35px] text-[30px] font-semibold">
           Add An Review
            </h1>
          </div>
          <div className=" p-7">
            <h2 className="text-4xl">Add An Review</h2>
            <form onSubmit={handleSubmit(handleAddProduct)}>
              <div className="form-control w-full ">
                <label className="label">
                  {" "}
                  <span className="label-text"> Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", {
                    required: "  Name is Required",
                  })}
                  className="input input-bordered w-full "
                />
                {errors.phoneName && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div className="form-control w-full ">
                <label className="label">
                  {" "}
                  <span className="label-text"> Designation</span>
                </label>
                <input
                  type="text"
                  {...register("designation", {
                    required: "  Designation is Required",
                  })}
                  className="input input-bordered w-full "
                />
                {errors.phoneName && (
                  <p className="text-red-500">{errors.designation.message}</p>
                )}
              </div>
     
              <div className="form-control w-full ">
                <label className="label">
                  {" "}
                  <span className="label-text">Review</span>
                </label>
                <textarea
                  type="text"
                  {...register("review", {
                    required: "Review is Required",
                  })}
                  className="input input-bordered w-full h-[120px]"
                />
                {errors.phoneName && (
                  <p className="text-red-500">{errors.review.message}</p>
                )}
              </div>
  
              
  
              <div className="form-control w-full ">
              <label className="label">
                {" "}
                <span className="label-text">Photo</span>
              </label>
              <input
                type="file"
                {...register("image", {
                  required: "Photo is Required",
                })}
                className="input input-bordered w-full "
              />
              {errors.img && (
                <p className="text-red-500">{errors.img.message}</p>
              )}
            </div>
  
              
  
              <input
                className="shadow-lg rounded lg:text-[20px] md:text-[18] text-[16px] font-bold text-white px-3  bg-[#0077B5] cursor-pointer lg:py-4 md:py-3 py-[6px] w-full mt-4"
                value="Add "
                type="submit"
                
              />
            </form>
            <div>
            
            </div>
          </div>
        </div>
      </div>
    );
};

export default Review;