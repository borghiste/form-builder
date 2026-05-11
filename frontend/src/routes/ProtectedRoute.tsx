import { Navigate } from "react-router-dom";
import { useAuthentication } from "../stores/useAuthStore";
export default function ProtectedRoute({children}){
    const {user } = useAuthentication();

    return user?.id !== null ?children :  <Navigate to='/login' replace/>
    
}