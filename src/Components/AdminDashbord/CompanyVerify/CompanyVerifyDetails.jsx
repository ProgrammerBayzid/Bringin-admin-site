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
      fetch(`https://rsapp.bringin.io/verifyRecruterCompny?_id=${userid}`)
        .then((res) => res.json())
        .then((data) => {
        //   setIsLoding(true);
          setPremium(data);
        //   console.log(data);                                                                        
        });
    }, [refresh]);
   
    // console.log(premium); 

  
    // if (isLoding === false) {
    //     return <div className="">
    //       <Spinner></Spinner>
    //     </div>;
    //   }



    return (
        <div>
          
        </div>
    );
};

export default CompanyVerifyDetails;