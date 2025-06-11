import React from "react";
import { InputLabel, TextField } from "@mui/material";

export default function LabeledTextField({labelName, 
                                        variant,
                                        placeholder, 
                                        onchange}){

    return(
        <>
        <InputLabel>{labelName}</InputLabel>
        <TextField variant={variant}
                    size="small"
                    placeholder={placeholder} onChange={onchange}/>
        </>
    )
}