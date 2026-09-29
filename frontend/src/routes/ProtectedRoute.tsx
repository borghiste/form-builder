import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/index";
export default function ProtectedRoute({children}){
    const {user} = useAuthStore();

    return user?.id ? children :  <Navigate to='/login' replace/>
    
}