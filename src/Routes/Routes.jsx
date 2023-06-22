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
                ]
            }

        ]
    },
 


])