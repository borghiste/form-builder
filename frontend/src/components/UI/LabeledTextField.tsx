import React from "react";
import { InputLabel, TextField, Box, FormControlLabel, Typography } from "@mui/material";

export default function LabeledTextField({labelName, 
                                        variant,
                                        placeholder, 
                                        onchange}){

    return(
        <Box sx={{display:'flex', flexDirection:'column'}}>
            <Typography variant="subtitle2">{labelName}</Typography>
        <TextField variant={variant}
                    size="small"
                    placeholder={placeholder} 
                    onChange={onchange}
                    label={placeholder} 
                    fullWidth/>
        </Box>
    )
}