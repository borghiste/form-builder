import React from "react";
// REDUX

import { selectForm } from "../features/formSlice";
import { useSelector, UseSelector } from "react-redux";

export default function FormPreview(){
    const form = useSelector(selectForm)
    return(

        <p>preview</p>
    )
}