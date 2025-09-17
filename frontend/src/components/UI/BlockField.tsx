import React from "react";
import { Typography, FormControl, Divider } from "@mui/material";

export default function BlockField({field}) {
    return (
        
        <FormControl sx={{border:2, margin:2, width:'100%', position:'relative', padding:1}}>
        <Typography component={'p'} fontSize={10}
                    color="text.primary">Type:{field.type}</Typography>

        <Typography component={'p'} fontSize={10}
            color="text.primary"
        >Label:</Typography>
        <Typography component={'p'} fontSize={12} fontWeight={500} color="text.primary">validations</Typography>
        <Divider/>

       

    </FormControl>
    )
}