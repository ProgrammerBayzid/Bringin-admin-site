import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Spinner from "../../Spinner/Spinner";
import { GoVerified } from 'react-icons/go'


const CompanyVerifyDetails = () => {


    const companyVarify = useLoaderData();
    // console.log(companyVarify);
    const {userid}=companyVarify
    // console.log(userid);


    const [isLoding, setIsLoding] = useState(false);
    const [refresh, setRefresh] = useState(true);
    const [premium, setPremium] = useState([]);

    useEffect(() => {
      fetch(`http://rsapp.bringin.io/verifyRecruterCompny?_id=${userid}`)
        .then((res) => res.json())
        .then((data) => {
        //   setIsLoding(true);
          setPremium(data);
        //   console.log(data);                                                                        
        });
    }, [refresh]);
   
    // console.log(premium); 

    const handelMakeVerifide = _id => {
        fetch(`http://rsapp.bringin.io/verifyRecruterCompny/${_id}`, {
            method: 'PATCH',
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    alert('Make Verifiy Successful.');
                    setRefresh(!refresh);
                    console.log(data._id);
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
             <td>{premium?.company_verify !== true ?
                                    <button onClick={() => handelMakeVerifide(premium._id)} className='btn btn-xs bg-indigo-500 text-white '>Make Verify</button>
                                    :
                                    <span className='text-blue-500'><GoVerified></GoVerified></span>
                                }</td>
            
              <h1>{premium.firstname}</h1>

            
        </div>
    );
};

export default CompanyVerifyDetails;