import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GoVerified } from 'react-icons/go'
import { CiCircleRemove } from 'react-icons/ci'
import { AuthContext } from '../../Context/Context';
const Profile = () => {
    const { user, logOut } = useContext(AuthContext);
    console.log(user);
    const navigate = useNavigate()

    const handelLogOut = () => {
        logOut()
            .then(res => {
                navigate('/')
                toast.success('Successfully Logout')
            })

            .catch(err => { console.log(err); })
    }
    return (

        <div className="hero min-h-screen bg-base-200 rounded">
            <div className="hero-content bg-blue-300 p-10 rounded flex-col lg:flex-col">
                <div className='w-24 items-center '>
                    <span className='rounded-full'>
                        {user?.photoURL ?
                            <img className='rounded-full' src={user.photoURL} />
                            :
                            <p>No Photo</p>}
                    </span>
                </div>
                <div>
                    <h1 className="text-3xl font-bold sm:text-center mb-2 ">Name: {user?.displayName ? user.displayName : 'Name Not Found'}</h1>
                    <p className='text-center mb-2 text-xl'>Designation: {user?.designation}</p>

                    {/* <p className='flex justify-center '>

                        {
                            user?.verified ? <p className='flex gap-2 items-center text-xl'>Sellser Status: <GoVerified className='text-blue-500'></GoVerified></p>
                                :
                                <p className='flex gap-2 items-center text-xl' >Sellser Status: <CiCircleRemove className='text-red-500 font-bold'></CiCircleRemove></p>
                        }
                    </p> */}

                    <p className='text-center mb-2 text-xl'>Email: {user?.email}</p>
                    {/* <p className='text-center mb-2 text-xl'>ID: {user?.uid} </p> */}
                    {/* <p className='text-center text-xl'> Email Status: {user?.emailVerified ? <span className=''>Verified</span> : <span className=''>Not Verified</span>} </p> */}
                    <div className='grid justify-items-center mt-5'>
                        <button onClick={handelLogOut} className="btn btn-small bg-indigo-500 text-white">Log Out</button>

                    </div>

                </div>
            </div>
        </div>

    )
}

export default Profile
