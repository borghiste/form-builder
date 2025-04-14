import React from "react";
import  Button  from "@mui/material/Button";
export default function SimpleButton({text, onClick, startIcon, color, size, variant, textColor, href, width}){

    return(
        
        <Button variant={variant} size={size} onClick={onClick}  startIcon={startIcon} sx={{ margin:'0.25rem', backgroundColor:color, color:textColor, width:width}} 
       
        href={href}
        >
     {text}
    </Button>
    )
}