import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Spinner from "../../Spinner/Spinner";
import { GoVerified } from 'react-icons/go'


const ProfileVerifyDetails = () => {

    const profileVarify = useLoaderData();
    console.log(profileVarify);
    const {userid}=profileVarify
    console.log(userid);


    const [isLoding, setIsLoding] = useState(false);
    const [refresh, setRefresh] = useState(true);
    const [profileVerify, setProfileVerify] = useState([]);

    useEffect(() => {
      fetch(`http://rsapp.bringin.io/verifyRecruterProfile?_id=${userid}`)
        .then((res) => res.json())
        .then((data) => {
        //   setIsLoding(true);
        setProfileVerify(data);
          console.log(data);                                                                        
        });
    }, [refresh]);
   
    console.log(profileVerify); 

    const makeVerifide = _id => {
        fetch(`http://rsapp.bringin.io/verifyRecruterProfile/${_id}`, {
            method: 'PATCH',
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    alert('Make Verifiy Successful.');
                    setRefresh(!refresh);
                }
            })
    };
    // if (isLoding === false) {
    //     return <div className="">
    //       <Spinner></Spinner>
    //     </div>;
    //   }

    return (
        <div>
        
        <td>{profileVerify?.profile_verify === false ?
                               <button onClick={() => makeVerifide(profileVerify._id)} className='btn btn-xs bg-indigo-500 text-white '>Make Verify</button>
                               :
                               <span className='text-blue-500'><GoVerified></GoVerified></span>
                           }</td>
       
         <h1>{profileVerify.firstname}</h1>

       
   </div>
    );
};

export default ProfileVerifyDetails;