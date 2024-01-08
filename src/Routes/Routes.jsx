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
import Experince from "../Components/AdminDashbord/Experince/Experince";
import CityName from "../Components/AdminDashbord/CityName/CityName";
import RecruterReportDetails from "../Components/AdminDashbord/RecruterReport/RecruterReportDetails";
import Category from "../Components/AdminDashbord/Category/Category";
import Sub_Catagory from "../Components/AdminDashbord/Sub_Catagory/Sub_Catagory";
import SingUp from "../Components/Login/SingUp";
import Home from "../Components/AdminDashbord/Home/Home";
import Profile from "../Components/AdminDashbord/Profile/Profile";
import AllAdminUser from "../Components/AdminDashbord/AllAdminUser/AllAdminUser";
import PrivetRoute from "../PrivetRoute/PrivetRoute";
import AdminRouter from "../PrivetRoute/AdminRoute";
import AppPrivet from "../PrivetRoute/AppPrivet";
import WebPrivet from "../PrivetRoute/WebPrivet";
import Post from "../Components/WebAdminDashbord/Post";
import AllBlogs from "../Components/WebAdminDashbord/AllBlogs";
import AddCategory from "../Components/WebAdminDashbord/AddCategory";
import AllCategory from "../Components/WebAdminDashbord/AllCategory";
import Bringinfeatured from "../Components/WebAdminDashbord/Bringinfeatured";
import AllBringinfeatured from "../Components/WebAdminDashbord/AllBringinfeatured";
import InfluencersOpinion from "../Components/WebAdminDashbord/InfluencersOpinion";
import Allinfuencers from "../Components/WebAdminDashbord/Allinfuencers";
import Review from "../Components/WebAdminDashbord/Review";
import AllReview from "../Components/WebAdminDashbord/AllReview";
import Cities from "../Components/WebAdminDashbord/Cities";
import Comment from "../Components/WebAdminDashbord/Comment";
import Imgs from "../Components/WebAdminDashbord/imgs";
import ReacruterLayout from "../Dashboard/ReacruterLayout";
import VarifyProfile from "../Components/AdminDashbord/VarifyProfile/VarifyProfile";
import CandidateList from "../Components/AdminDashbord/CandidateList/CandidateList";
import CandidateDetails from "../Components/AdminDashbord/CandidateList/CandidateDetails";
import RejectRecureter from "../Components/AdminDashbord/RejectRecureter/RejectRecureter";
import UserContactus from "../Components/AdminDashbord/UserContactus/UserContactus";
import HelpFeedback from "../Components/AdminDashbord/HelpFeedback/HelpFeedback";
import AllRecruter from "../Components/AdminDashbord/AllRecruter/AllRecruter";
import JobPost from "../Components/AdminDashbord/JobPost/JobPost";
import RejectedJobPost from "../Components/AdminDashbord/JobPost/RejectedJobPost";
import ProfileNotCompliteCandidateList from "../Components/AdminDashbord/CandidateList/ProfileNotCompliteCandidateList";
import RegisterRecruter from "../Components/AdminDashbord/ProfileVerify/RegisterRecruter";
import RecruterJobpost from "../Components/AdminDashbord/VarifyProfile/JobPost/RecruterJobpost";

export const route = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element:<PrivetRoute><Home /></PrivetRoute>,
      },
      {
        path: "/home",
        element: <PrivetRoute><Home /></PrivetRoute> ,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      
      {
        path:"/profile",
        element:<PrivetRoute><Profile></Profile></PrivetRoute> 
      }
    ],
  },

  {
    path: "/verification",
    element: <ReacruterLayout></ReacruterLayout>,
    children:[
      {
        path: "/verification/profile_varify",
        element:<AppPrivet><ProfileVerify></ProfileVerify></AppPrivet> ,
      },
      {
        path: "/verification/profile_register/:id",
        element:<AppPrivet><RegisterRecruter></RegisterRecruter></AppPrivet> ,
      },
      {
        path: "/verification/recruter_job_post/:id",
        element:<AppPrivet><RecruterJobpost></RecruterJobpost></AppPrivet> ,
      },
      {
        path: "/verification/All_recruter_profile",
        element:<AppPrivet><AllRecruter></AllRecruter></AppPrivet> ,
      },
      {
        path: "/verification/rejected_recruiters",
        element:<AppPrivet><RejectRecureter></RejectRecureter></AppPrivet> ,
      },
      {
        path: "/verification/profile_varify/:id",
        element:<AppPrivet><ProfileVerifyDetails></ProfileVerifyDetails></AppPrivet> ,
        loader: ({ params }) =>
          fetch(`https://rsapp.unbolt.co/profile_varifys/${params.id}`),
      },

      {
        path: "/verification/candidatereport",
        element:<AppPrivet><CandidateRepore></CandidateRepore></AppPrivet> ,
      },
      {
        path: "/verification/candidate_report_details/:id",
        element:<AppPrivet><RepotedDetails></RepotedDetails></AppPrivet> ,
        loader: ({ params }) =>
          fetch(`https://rsapp.unbolt.co/candidate_report/${params.id}`),
      },
      {
        path: "/verification/job_report",
        element:<AppPrivet><RecruterReport></RecruterReport></AppPrivet> ,
      },
      {
        path: "/verification/recruter_ob_report_details/:id",
        element:<AppPrivet><RecruterReportDetails></RecruterReportDetails></AppPrivet> ,
        loader: ({ params }) =>
          fetch(`https://rsapp.unbolt.co/job_report/${params.id}`),
      },
      {
        path: "/verification/verifyProfile",
        element:<AppPrivet><VarifyProfile></VarifyProfile></AppPrivet> ,
      },
      {
        path: "/verification/verifyProfile/:id",
        element:<AppPrivet><RecruterReportDetails></RecruterReportDetails></AppPrivet> ,
        loader: ({ params }) =>
          fetch(`https://rsapp.unbolt.co/job_report/${params.id}`),
      },



      {
        path: "/verification/candidate",
        element: <AppPrivet>
          <CandidateList></CandidateList>
        </AppPrivet>
      },
      {
        path: "/verification/candidate_profile_not_complite",
        element: <AppPrivet>
          <ProfileNotCompliteCandidateList></ProfileNotCompliteCandidateList>
        </AppPrivet>
      },

      {
        path: "/verification/job_post",
        element: <AppPrivet>
          <JobPost></JobPost>
        </AppPrivet>
      },
      {
        path: "/verification/rejected_job_post",
        element: <AppPrivet>
          <RejectedJobPost></RejectedJobPost>
        </AppPrivet>
      },


      {
        path: "/verification/candidate/:id",
        element:<AppPrivet><CandidateDetails></CandidateDetails></AppPrivet> ,
        loader: ({ params }) =>
          fetch(`https://rsapp.unbolt.co/candidate/${params.id}`),
      },

    ]
  },

  {
    path: "/dashboard",
    element: <PrivetRoute><Layout></Layout></PrivetRoute>,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
      },
      
      
      {
        path: "/dashboard/all_admin_user",
        element: <AdminRouter><AllAdminUser/></AdminRouter> 
      },
      {
        path: "/dashboard/singup",
        element: <AdminRouter>
          <SingUp></SingUp>
          </AdminRouter>,
      },
      
      {
        path: "/dashboard/jobetype",
        element: <AppPrivet> <JobType></JobType></AppPrivet> ,
      },
      {
        path: "/dashboard/usercontactus",
        element: <AppPrivet> <UserContactus></UserContactus></AppPrivet> ,
      },
      {
        path: "/dashboard/helpfeedback",
        element: <AppPrivet> <HelpFeedback></HelpFeedback></AppPrivet> ,
      },
      {
        path: "/dashboard/industryadd",
        element:<AppPrivet><JobIndustryAdd/></AppPrivet> ,
      },
      {
        path: "/dashboard/categoryadd",
        element:<AppPrivet> <CategoryAdd></CategoryAdd></AppPrivet> ,
      },
      {
        path: "/dashboard/functionalareaadd",
        element:<AppPrivet><FunctionalAreaAdd/></AppPrivet> ,
      },
      {
        path: "/dashboard/locationadd",
        element:<AppPrivet><AddLocation/></AppPrivet> ,
      },

      {
        path: "/dashboard/salaries",
        element: <AppPrivet><AddSalaries></AddSalaries></AppPrivet>,
      },
      {
        path: "/dashboard/educationlavel",
        element: <Educationlavel></Educationlavel>,
      },
      {
        path: "/dashboard/digree",
        element:<AppPrivet><Digree></Digree></AppPrivet> ,
      },
      {
        path: "/dashboard/subject",
        element: <AppPrivet><Subject></Subject></AppPrivet> ,
      },
      {
        path: "/dashboard/skill",
        element: <AppPrivet><Skill></Skill></AppPrivet>,
      },
      {
        path: "/dashboard/companyname",
        element: <AppPrivet><Company></Company></AppPrivet>,
      },
      {
        path: "/dashboard/companysize",
        element:<AppPrivet><CompanySize></CompanySize></AppPrivet> ,
      },
      {
        path: "/dashboard/department",
        element:<AppPrivet><Department></Department></AppPrivet> ,
      },
      {
        path: "/dashboard/jobtitle",
        element:<AppPrivet><JobTitle></JobTitle></AppPrivet> ,
      },
      
      {
        path: "/dashboard/experince",
        element:<AppPrivet><Experince></Experince></AppPrivet> ,
      },
      {
        path: "/dashboard/category",
        element:<AppPrivet><Category></Category></AppPrivet> ,
      },
      {
        path: "/dashboard/sub_category",
        element:<AppPrivet><Sub_Catagory></Sub_Catagory></AppPrivet> ,
      },

      {
        path: "/dashboard/premium_user",
        element: <AppPrivet><Premium></Premium></AppPrivet> ,
      },
      {
        path: "/dashboard/not_premium_user",
        element:<AppPrivet><NotPremium></NotPremium></AppPrivet> ,
      },
      {
        path: "/dashboard/city",
        element:<AppPrivet><CityName></CityName></AppPrivet> ,
      },
      {
        path: "/dashboard/premium_user/:id",
        element: <AppPrivet><PremiumUserDetails></PremiumUserDetails></AppPrivet> ,
        loader: ({ params }) =>
          fetch(`https://rsapp.unbolt.co/premium_user/${params.id}`),
      },
      {
        path: "/dashboard/company_varify",
        element:<AppPrivet><CompanyVerify></CompanyVerify></AppPrivet> ,
      },
      {
        path: "/dashboard/company_varify/:id",
        element: <AppPrivet><CompanyVerifyDetails></CompanyVerifyDetails></AppPrivet> ,
        loader: ({ params }) =>
          fetch(`https://rsapp.unbolt.co/company_varify/${params.id}`),
      },
      
    



// Web admin 

      {
        path: "/dashboard/blog_post",
        element: <WebPrivet><Post></Post></WebPrivet> ,
      },
      {
        path: "/dashboard/all_blog",
        element: <WebPrivet><AllBlogs/></WebPrivet> ,
      },
      {
        path: "/dashboard/add_category",
        element: <WebPrivet><AddCategory/></WebPrivet> ,
      },
      {
        path: "/dashboard/all_category",
        element: <WebPrivet><AllCategory/></WebPrivet> ,
      },
     
      {
        path: "/dashboard/bringin_featured",
        element: <WebPrivet><Bringinfeatured/></WebPrivet> ,
      },
      {
        path: "/dashboard/allbringin_featured",
        element: <WebPrivet><AllBringinfeatured/></WebPrivet> ,
      },
      {
        path: "/dashboard/influencers_opinion",
        element: <WebPrivet><InfluencersOpinion/></WebPrivet> ,
      },
      {
        path: "/dashboard/allinfuencers_opinion",
        element: <WebPrivet><Allinfuencers/></WebPrivet> ,
      },
      {
        path: "/dashboard/review",
        element: <WebPrivet><Review/></WebPrivet> ,
      },
      {
        path: "/dashboard/allreview",
        element: <WebPrivet><AllReview/></WebPrivet> ,
      },
      {
        path: "/dashboard/cities",
        element: <WebPrivet><Cities/></WebPrivet> ,
      },
      {
        path: "/dashboard/comment",
        element: <WebPrivet><Comment/></WebPrivet> ,
      },
      {
        path: "/dashboard/image",
        element: <WebPrivet><Imgs/></WebPrivet> ,
      },

    ],
  },
]);
