import { useForm } from "react-hook-form";
// import Spinner from "../Spinner/Spinner";
import { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import useTitle from "../../hooks/useTitle";
import { useEffect } from "react";
const Post = () => {
  useTitle("Blogs Post - Bringin");
  // const [isLoading, setisLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const editor = useRef(null);
  const [content, setContent] = useState("");
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
            authorName: data.authorName,
            blogTitle: data.blogTitle,
            categoryName: data.categoryName,
            published_date: new Date().toLocaleString(),
            description: data.blogDescription,
            details: content,
            img: imgData.data.url,
          };

          // save blog information to the database
          fetch("https://bringinserver-v1.vercel.app/blogs", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(blog),
          })
            .then((res) => res.json())
            .then((result) => {
              // setisLoading(true)
              e.target.reset();

              console.log(result);
            });
        }
      });
  };

  //   if (isLoading) {
  //     return <Spinner></Spinner>
  // }
  const [cetagory, setCetagory] = useState([]);

  useEffect(() => {
    fetch("https://bringinserver-v1.vercel.app/cetagorys")
      .then((res) => res.json())
      .then((data) => {
        setCetagory(data);
      });
  }, []);
  const cetagori = cetagory;

  return (
    <div className="">
      <div>
        <div className="">
          <h1 className="text-center mt-[25px] lg:text-[42px] md;text-[35px] text-[30px] font-semibold">
            Blog Post
          </h1>
        </div>
        <div className=" p-7">
          <h2 className="text-4xl">Add A Blog</h2>
          <form onSubmit={handleSubmit(handleAddProduct)}>
            <div className="form-control w-full ">
              <label className="label">
                {" "}
                <span className="label-text">Author Name</span>
              </label>
              <input
                type="text"
                {...register("authorName", {
                  required: "Author  Name is Required",
                })}
                className="input input-bordered w-full "
              />
              {errors.phoneName && (
                <p className="text-red-500">{errors.authorName.message}</p>
              )}
            </div>
            <div className="form-control w-full ">
              <label className="label">
                {" "}
                <span className="label-text">Blog Title</span>
              </label>
              <input
                type="text"
                {...register("blogTitle", {
                  required: "Blog Title is Required",
                })}
                className="input input-bordered w-full "
              />
              {errors.phoneName && (
                <p className="text-red-500">{errors.blogTitle.message}</p>
              )}
            </div>
            <div className="form-control w-full ">
              <label className="label">
                {" "}
                <span className="label-text">Blog Description</span>
              </label>
              <textarea
                type="text"
                {...register("blogDescription", {
                  required: "Blog Description is Required",
                })}
                className="input input-bordered w-full h-[120px]"
              />
              {errors.phoneName && (
                <p className="text-red-500">{errors.blogDescription.message}</p>
              )}
            </div>

            <div className="form-control w-full ">
              <label className="label">
                {" "}
                <span className="label-text">Select a Blog Category</span>
              </label>
              <select
                {...register("categoryName")}
                className="select input-bordered w-full "
              >
                
                {
                  cetagori.map((ca)=>{
                    return(

                      <option key={ca._id}>{ca.categoryName}</option>
                    )
                  })
                }
              
              </select>
            </div>

            <div className="form-control w-full ">
              <label className="label">
                {" "}
                <span className="label-text">Blog Photo</span>
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

            <div className="form-control w-full mt-3 ">
              <span className="label-text mb-2">Write Blog Content</span>

              <JoditEditor
                ref={editor}
                value={content}
                onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={(newContent) => setContent(newContent)}
              />
            </div>

            <input
              className="shadow-lg rounded lg:text-[20px] md:text-[18] text-[16px] font-bold text-white px-3  bg-[#0077B5] cursor-pointer lg:py-4 md:py-3 py-[6px] w-full mt-4"
              value="Add Blog"
              type="submit"
            />
          </form>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Post;
