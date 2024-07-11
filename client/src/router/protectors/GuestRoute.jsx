import { useContext, useEffect } from "react";
import { authContext } from "../../contexts/AuthWrapper";
import { useNavigate } from "react-router-dom";

import LoadingPage from "../../pages/loading";


export default function GuestRoute({ children }) {
    const {
        getEmployee,
        isFetchingUser,
        isLoggedIn,
    } = useContext(authContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn && localStorage.getItem('token') != null) {
            getEmployee()
        } else if(isLoggedIn){
            if(localStorage.getItem('admin')){
                navigate('/admin/dashboard');
            }else{
                navigate('/dashboard');
            } 
        }
    }, [isFetchingUser]);
    
    return (!isFetchingUser) ? children : <LoadingPage />;
}