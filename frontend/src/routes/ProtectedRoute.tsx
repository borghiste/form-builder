import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthentication } from "../stores/useAuthStore";
export default function ProtectedRoute({children}){
    const {user} = useAuthentication();

    return user?.id ? children :  <Navigate to='/login' replace/>
    
}