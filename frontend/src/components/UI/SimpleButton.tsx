import React from "react";
import  Button  from "@mui/material/Button";
export default function SimpleButton({text, onClick, startIcon, color}){

    return(
        
        <Button variant="contained" size="small" onClick={onClick} color={color} startIcon={startIcon} sx={ {backgroundColor:`${color}`}} >
     {text}
    </Button>
    )
}