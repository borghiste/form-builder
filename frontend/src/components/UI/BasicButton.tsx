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
                                    fontSize
                                    
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
                    fontSize={fontSize}
                    
                    href={href}
                    
       
        
        >
     {text}
    </Button>
    )
}