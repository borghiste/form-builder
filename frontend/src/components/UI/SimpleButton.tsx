import React from "react";
import  Button  from "@mui/material/Button";
export default function SimpleButton({text, onClick, startIcon, color, size}){

    return(
        
        <Button variant="contained" size={size} onClick={onClick} color={color} startIcon={startIcon} sx={ {backgroundColor:`${color}`, margin:'0.25rem'}}  >
     {text}
    </Button>
    )
}