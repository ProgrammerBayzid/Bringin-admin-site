import { useContext } from "react";
import { AuthContext } from "../../Context/Context";
import { toast } from "react-toastify";

const Home = () => {


    const { user } = useContext(AuthContext);
    console.log(user);


    const sentAppAdminModaretorRequest = (_id) => {
        try {
          fetch(`https://rsapp.bringin.io/appadmin/${_id}`, {
            method: "POST",
          })
            .then((res) => res.json())
            .then((data) => {
              if (data) {
                toast.success("App Moderator Request Sent");
                console.log(data);

              }
            })
            .catch((error) => console.error(error));
        } catch (error) {
          console.error(error);
        }
      };



      const sentWebAdminModaretorRequest = (_id) => {
        fetch(`https://rsapp.bringin.io/webadmin/${_id}`, {
          method: "POST",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data) {
                toast.success("Web Moderator Request Sent");
              console.log(data);
            }
          });
      };



    return (
        <div>
           <div>

<div className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-24'>
    <div className='flex flex-col items-center justify-between lg:flex-row'>
        <div className='mb-10 lg:max-w-lg  lg:pr-5 lg:mb-0'>
            <div className='max-w-xl mb-6 lg:mt-8'>

                <h2 className='switeh max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none'>
                    We have everything you need<br className='hidden md:block' /> to learn anything {' '}
                    <span className='inline-block text-blue-400'>Best E-Learning  Platform</span>
                </h2>
                <p className='switeh text-base text-gray-700 md:text-lg'>
                    Skiles are a uniquely portable magic. Skiles serve to show a man
                    that those original thoughts of his aren’t very new after all.
                </p>
            </div>
            <div className='flex flex-col items-center md:flex-row'>
                <button
                            onClick={() => sentAppAdminModaretorRequest(user._id)}

                    className='inline-flex items-center justify-center w-full h-12 px-6 mb-3 font-medium tracking-wide text-white transition duration-200 rounded shadow-md md:w-auto md:mr-4 md:mb-0 bg-blue-400 hover:bg-blue-700 focus:shadow-outline focus:outline-none'
                >
                    <span className='mr-3'> App Moderator Request</span>
                    
                </button>
                <button
                            onClick={() => sentWebAdminModaretorRequest(user._id)}
                    className='inline-flex items-center justify-center w-full h-12 px-6 mb-3 font-medium tracking-wide text-white transition duration-200 rounded shadow-md md:w-auto md:mr-4 md:mb-0 bg-blue-400 hover:bg-blue-700 focus:shadow-outline focus:outline-none'
                >
                    <span className='mr-3'>Web Moderator Request</span>
                   
                </button>
             
            </div>
        </div>
        <div className='relative lg:w-1/2 '>
            <div className='w-full lg:w-4/5 lg:ml-auto h-56  sm:h-96'>
<img src="" />

            </div>
        </div>
    </div>
</div>


</div>
        </div>
    );
};

export default Home;