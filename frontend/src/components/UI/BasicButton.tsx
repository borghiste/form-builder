import React from "react";
import  Button  from "@mui/material/Button";
export default function BasicButton({text, onClick, startIcon, color, size, variant, textColor, href, width, type, fullWidth}){

    return(
        
        <Button variant={variant} 
                size={size} 
                onClick={onClick} 
                startIcon={startIcon}
                type={type} 
                sx={{ margin:'0.25rem', 
                    backgroundColor:color, 
                    color:textColor, 
                    width:width, 
                    textAlign:'center', 
                    textWrap:'nowrap'}}
                    fullWidth={fullWidth}
                    
       
        href={href}
        >
     {text}
    </Button>
    )
}