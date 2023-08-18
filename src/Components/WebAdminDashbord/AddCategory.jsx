import { useState } from "react";
import { useForm } from "react-hook-form";

const AddCategory = () => {
    const [refresh, setRefresh] = useState(true);

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
      const handleAddProduct = (data, e) => {
        console.log(data);
        const blog = {
          categoryName: data.categoryName,
          published_date: new Date().toLocaleString(),
        };
    
        // save blog information to the database
        fetch("https://bringinserver-v1.vercel.app/caterogye", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(blog),
        })
          .then((res) => res.json())
          .then((result) => {
            setRefresh(!refresh);
            e.target.reset();
            console.log(result);
          });
      };
    
    return (
        <div>
            <div>
          <div className="">
            <h1 className="text-center mt-[25px] lg:text-[42px] md;text-[35px] text-[30px] font-semibold">
           Add An Categorie Name
            </h1>
          </div>
          <div className=" p-7">
            <h2 className="text-4xl">Add An Review</h2>
            <form onSubmit={handleSubmit(handleAddProduct)}>
              <div className="form-control w-full ">
                <label className="label">
                  {" "}
                  <span className="label-text">Categorie Name</span>
                </label>
                <input
                  type="text"
                  {...register("categoryName", {
                    required: "  CategoryeName is Required",
                  })}
                  className="input input-bordered w-full "
                />
                {errors.phoneName && (
                  <p className="text-red-500">{errors.name.message}</p>
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

export default AddCategory;