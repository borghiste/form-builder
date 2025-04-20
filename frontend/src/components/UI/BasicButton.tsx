import React from "react";
import  Button  from "@mui/material/Button";
export default function BasicButton({text, onClick, startIcon, color, size, variant, textColor, href, width}){

    return(
        
        <Button variant={variant} 
                size={size} 
                onClick={onClick} 
                startIcon={startIcon} 
                sx={{ margin:'0.25rem', 
                    backgroundColor:color, 
                    color:textColor, 
                    width:width, 
                    textAlign:'center', 
                    textWrap:'nowrap'}}
                    
       
        href={href}
        >
     {text}
    </Button>
    )
}