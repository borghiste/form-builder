import React from "react";
import { Chip } from "@mui/material";
export default function DeleteButton({onClick}){
    return(
        <>
        <Chip label={'delete'} onClick={onClick}/>
        </>
    )
}