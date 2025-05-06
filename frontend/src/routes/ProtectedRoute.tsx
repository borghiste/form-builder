import React from "react";
import { selectUser } from "../features/UserSlice";
import { useSelector, UseSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export default function ProtectedRoute({children}){
    const User= useSelector(selectUser);

    return User?.id !== null ?children :  <Navigate to='/login' replace/>
    
}