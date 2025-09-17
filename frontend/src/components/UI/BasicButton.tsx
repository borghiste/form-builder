import React from "react";
import  Button  from "@mui/material/Button";
export default function BasicButton({text, 
                                    onClick,
                                    href, 
                                    startIcon, 
                                    color, 
                                    size, 
                                    variant,  // contained, outlined
                                    textColor,
                                    width, 
                                    type, 
                                    fullWidth,
                                    }){

    return(
        
        <Button variant={variant} 
                size={size} 
                onClick={onClick} 
                startIcon={startIcon}
                type={type}
                
                
               
                 
                
                sx={{ 
                    backgroundColor:color, 
                    color:textColor, 
                    width:width, 
                    textAlign:'center',
                    margin:0.5, 
                    textWrap:'nowrap'}}
                    fullWidth={fullWidth}
                    
                    href={href}
                    
       
        
        >
     {text}
    </Button>
    )
}