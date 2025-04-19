import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export const ProtectedRoute = ({ children } : { children : any }) => {
    const userIdentity = Cookies.get("userIdentity");
    if (!userIdentity) {
        return <Navigate to="/login" replace />;
    }
    return children;
};
