import React from "react"
// MUI
import { Typography, Box} from "@mui/material"
export default function Footer(){

    return(
        <Box component={'footer'} sx={{bgcolor:'background.default', display:'flex', justifyContent:'space-between'}}>
        <Typography component={'p'} sx={{color:'text.primary'}}>
        Author: Stefano Borghi


        </Typography>
        <Typography component={'p'} sx={{color:'text.primary'}}>
       About


        </Typography>
        </Box>
    )
}