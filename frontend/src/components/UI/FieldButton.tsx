import React from "react";
import BasicButton from "./BasicButton";
export default function FieldButton({ label, icon, onClick}){

    return(
  <BasicButton
    variant="outlined"
    startIcon={icon}
    size="small"
    fullWidth
    text={label}
    onClick={onClick}/>
  
)
}