import {
    createBrowserRouter
} from 'react-router-dom';

// layouts 
import AuthLayout from '../layouts/AuthLayout';
import EmployeLayout from '../layouts/EmployeLayout';
import AdminLayout from '../layouts/AdminLayout';
import HostLayout from '../layouts/HostLayout';


// pages
import SignUp from '../pages/auth/signup';
import SignIn from '../pages/auth/signin';
import ForgetPassword from '../pages/auth/forgetPassword';







// protectors 
import GuestRoute from './protectors/GuestRoute';
import AuthRoute from './protectors/AuthRoute';
import AdminAuthRoute from './protectors/AdminAuthRoute';
import LandingPage from '@/pages/admin/landing-page';
import LandingPage2 from '@/pages/admin/landing-page2';
import LandingPage3 from '@/pages/admin/landing-page3';

// employees
import EmployeeDashboard from '@/pages/employee/dashboard';
import ServiceSignIn from '@/pages/employee/signin';
import EmployeeSettings from '@/pages/employee/settings';


// admin 
import AdminDashboard from '@/pages/admin/dashboard';
import AdminsTable from '@/pages/admin/admins-page';
import AdminSignIn from '@/pages/admin/signin';
import Clients from '@/pages/admin/clients';
import AddClient from '@/pages/admin/add-client';
import Employees from '@/pages/admin/employees';
import AddEmployee from '@/pages/admin/add-employee';
import Settings from '@/pages/admin/settings';
import UpdateClient from '@/pages/admin/update-client';
import Contacts from '@/pages/admin/contacts';










// router
export const router = createBrowserRouter([
    {
        element: <HostLayout />,
        children: [
            {
                path: "/home",
                element: <LandingPage />
            },
            {
                path: "/home2",
                element: <LandingPage2 />
            },
            {
                path: "/home3",
                element: <LandingPage3 />
            },
            {
                path: "/admin/login",
                element: <AdminSignIn />
            },
            {
                path: "/service/login",
                element: <ServiceSignIn />
            },
        ]
    },
    {
        element: <AuthRoute ><EmployeLayout /></AuthRoute> ,
        children: [
            {
                path: "/service/dashboard",
                element: <EmployeeDashboard />
            },
            {
                path: "/service/seetings",
                element: <EmployeeSettings />
            },
        ]
    },
    {
        element: <AdminAuthRoute><AdminLayout /></AdminAuthRoute>,
        children: [
            {
                path: "/admin/dashboard",
                element: <AdminDashboard />
            },
            {
                path: "/admin/admins",
                element: <AdminsTable />
            },
            {
                path: "/admin/clients",
                element: <Clients />
            },
            {
                path: "/admin/clients/add",
                element: <AddClient />
            },
            {
                path: "/admin/employees",
                element: <Employees />
            },
            {
                path: "/admin/employees/add",
                element: <AddEmployee />
            },
            {
                path: "/admin/settings",
                element: <Settings />
            },
            {
                path: "/admin/clients/update/:id",
                element: <UpdateClient />
            },
            {
                path: "/admin/contacts",
                element: <Contacts />
            },
        ]
    },
    // {
    //     path: '*',
    //     element: <NotFound />
    // }
])