import React from "react";
import  Button  from "@mui/material/Button";
export default function SimpleButton({text, onClick, startIcon}){

    return(
        <Button variant="contained" size="small" onClick={onClick} color="primary" startIcon={startIcon} >
     {text}
    </Button>
    )
}