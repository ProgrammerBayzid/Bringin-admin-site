import { useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";
import { AiFillDelete , AiTwotoneEdit} from "react-icons/ai";

const Allinfuencers = () => {
    const [blogs, setBlogs] = useState([]);
    const [isLoding, setIsLoding] = useState(false);

    useEffect(() => {
        fetch("https://bringinserver-v1.vercel.app/influencers")
          .then((res) => res.json())
          .then((data) => {
            setIsLoding(true);
            setBlogs(data);
          });
      }, []);
      const handelDeeted = id => {
        const proced = window.confirm('Are You Sure')
        if (proced) {
            fetch(`https://bringinserver-v1.vercel.app/influencers/${id}`, {
                method: "DELETE",
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCount) {
                        alert('deleted successfully');
                        const remaining = blogs?.filter(odr => odr._id !== id);
                        setBlogs(remaining);
                    }
                })

        }
    };

      if (isLoding === false) {
        return <div className="flex mx-auto">
            <Spinner></Spinner>
        </div>;
      }
    return (
        <div className="mt-12">
            
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                 Name
                </th>
                <th scope="col" className="px-6 py-3">
                Designation
                </th>
                <th scope="col" className="px-6 py-3">
                Edit Action
                </th>
                <th scope="col" className="px-6 py-3">
                Delete Action
                </th>
            </tr>
        </thead>
        {
            blogs.map((blog)=>
            
            
        <tbody key={blog._id}>
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {blog.name}
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {blog.role}
                </th>
                <td className="px-6 py-4">
                   <button onClick={() => handelDeeted(blog._id)}><AiFillDelete></AiFillDelete></button>
                </td>
                <td className="px-6 py-4">
                   <button ><AiTwotoneEdit></AiTwotoneEdit></button>
                    
                </td>
            </tr>
          
        </tbody>
            )
        }
    </table>
</div>

        </div>
    );
};

export default Allinfuencers;