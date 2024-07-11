import { useContext, useEffect } from "react";
import { authContext } from "../../contexts/AuthWrapper";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../../pages/loading";

export default function ClientAuthRoute({ children }) {
    const {
        getEmployee,
        isLoggedIn,
        isFetchingUser,
        setCurrentLocation,  
    } = useContext(authContext);
    const navigate = useNavigate();
    
    useEffect(() => {
        setCurrentLocation(window.location.pathname);
        if (!isLoggedIn && localStorage.getItem('token') != null) {
            getEmployee();
        } else if (!isLoggedIn && !isFetchingUser) {
            navigate('/service/login');
        }
    }, [isLoggedIn,isFetchingUser]);
  
    return ( !isFetchingUser && isLoggedIn ) ? children : <LoadingPage />;
}
