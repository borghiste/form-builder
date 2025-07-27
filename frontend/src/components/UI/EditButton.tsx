import React from "react";
import { Chip } from "@mui/material";
export default function EditButton({variant,
                                    size,
                                    color,
                                    textColor,
                                    onClick
}){
    return(

        <>
        
        <Chip label={'edit'}
            variant={variant}
            size={size}
            onClick={onClick}
            sx={{bgcolor:color, color: textColor}}/>
        </>
    )
}