import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";

import Layout from "../Dashboard/Layout";
import Dashboard from "../Components/AdminDashbord/Dashbaord/Dashbaord";

import Customers from "../Components/AdminDashbord/Customers/Customers";
import JobType from "../Components/AdminDashbord/JobType/JobType";
import Login from "../Components/Login/Login";
// import PrivetRoute from "../PrivetRoute/PrivetRoute";
import JobIndustryAdd from "../Components/AdminDashbord/JobIndustryAdd/JobIndustryAdd";
import CategoryAdd from "../Components/AdminDashbord/CategoryAdd/CategoryAdd";
import FunctionalAreaAdd from "../Components/AdminDashbord/FunctionalAreaAdd/FunctionalAreaAdd";
import AddLocation from "../Components/AdminDashbord/AddLocation/AddLocation";
import AddSalaries from "../Components/AdminDashbord/AddSalaries/AddSalaries";
import Digree from "../Components/AdminDashbord/Digree/Digree";
import Educationlavel from "../Components/AdminDashbord/Educationlavel/Educationlavel";
import Subject from "../Components/AdminDashbord/Subject/Subject";
import Skill from "../Components/AdminDashbord/Skill/Skill";
import Company from "../Components/AdminDashbord/Company/Company";
import CompanySize from "../Components/AdminDashbord/CompanySize/CompanySize";
import Department from "../Components/AdminDashbord/Department/Department";
import JobTitle from "../Components/AdminDashbord/JobTitle/JobTitle";
import CandidateRepore from "../Components/AdminDashbord/CandidateReport/CandidateRepore";
import RepotedDetails from "../Components/AdminDashbord/CandidateReport/RepotedDetails";
import RecruterReport from "../Components/AdminDashbord/RecruterReport/RecruterReport";
import Premium from "../Components/AdminDashbord/PremiumUser/Premium";
import NotPremium from "../Components/AdminDashbord/PremiumUser/NotPremium";
import PremiumUserDetails from "../Components/AdminDashbord/PremiumUser/PremiumUserDetails";
import CompanyVerify from "../Components/AdminDashbord/CompanyVerify/CompanyVerify";
import CompanyVerifyDetails from "../Components/AdminDashbord/CompanyVerify/CompanyVerifyDetails";
import ProfileVerify from "../Components/AdminDashbord/ProfileVerify/ProfileVerify";
import ProfileVerifyDetails from "../Components/AdminDashbord/ProfileVerify/ProfileVerifyDetails";


export const route = createBrowserRouter(
    
    [
        {
            path: '/login',
            element: <Login></Login>

        },
    {
        path: '/',
        element:<Main></Main>,
        // errorElement: <ErropPage></ErropPage>,
        children: [
           
            {
                path: '/',
                element:<Layout></Layout>,
                children: [
                  
                   
                    {
                        path: '/',
                        element:<Dashboard></Dashboard>
        
                    },
                    
                    {
                        path: '/customer',
                        element: <Customers></Customers>
        
                    },
                    {
                        path: '/jobetype',
                        element: <JobType></JobType>
        
                    },
                    {
                        path: '/industryadd',
                        element: <JobIndustryAdd></JobIndustryAdd>
        
                    },
                    {
                        path: '/categoryadd',
                        element: <CategoryAdd></CategoryAdd>
        
                    },
                    {
                        path: '/functionalareaadd',
                        element: <FunctionalAreaAdd></FunctionalAreaAdd>
        
                    },
                    {
                        path: '/locationadd',
                        element: <AddLocation></AddLocation>
        
                    },
                 
                    {
                        path: '/salaries',
                        element: <AddSalaries></AddSalaries>
        
                    },
                    {
                        path: '/educationlavel',
                        element: <Educationlavel></Educationlavel>
        
                    },
                    {
                        path: '/digree',
                        element: <Digree></Digree>
        
                    },
                    {
                        path: '/subject',
                        element: <Subject></Subject>
        
                    },
                    {
                        path: '/skill',
                        element: <Skill></Skill>
        
                    },
                    {
                        path: '/companyname',
                        element: <Company></Company>
        
                    },
                    {
                        path: '/companysize',
                        element: <CompanySize></CompanySize>
        
                    },
                    {
                        path: '/department',
                        element: <Department></Department>
        
                    },
                    {
                        path: '/jobtitle',
                        element: <JobTitle></JobTitle>
        
                    },
                    {
                        path: '/candidatereport',
                        element: <CandidateRepore></CandidateRepore>
        
                    },
                    {
                        path: '/candidate_report_details/:id',
                        element: <RepotedDetails></RepotedDetails>,
                        loader: ({ params }) => fetch(`http://rsapp.bringin.io/candidate_report/${params.id}`)

        
                    },
                    {
                        path: '/job_report',
                        element: <RecruterReport></RecruterReport>
        
                    },




                    {
                        path: '/premium_user',
                        element: <Premium></Premium>
                    },
                    {
                        path: '/not_premium_user',
                        element: <NotPremium></NotPremium>
                    },
                    {
                        path: '/premium_user/:id',
                        element: <PremiumUserDetails></PremiumUserDetails>,
                        loader: ({ params }) => fetch(`http://rsapp.bringin.io/premium_user/${params.id}`)

                    },
                    {
                        path: '/company_varify',
                        element: <CompanyVerify></CompanyVerify>
                    },
                    {
                        path: '/company_varify/:id',
                        element: <CompanyVerifyDetails></CompanyVerifyDetails>,
                        loader: ({ params }) => fetch(`http://rsapp.bringin.io/company_varify/${params.id}`)

                    },
                    {
                        path: '/profile_varify',
                        element: <ProfileVerify></ProfileVerify>
                    },
                    {
                        path: '/profile_varify/:id',
                        element: <ProfileVerifyDetails></ProfileVerifyDetails>,
                        loader: ({ params }) => fetch(`http://rsapp.bringin.io/profile_varify/${params.id}`)

                    },
                ]
            }

        ]
    },
 


])