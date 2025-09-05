import React from "react";
import { Box, Typography } from "@mui/material";
import BasicButton from "./UI/BasicButton";
import FieldOptions from "./FieldOptions";

export default function BuilderModal({handleModalClose}){

    return(

        <Box sx={{display:'grid', gridAutoFlow:'column',
            alignItems:'center',
    position:'sticky', gap:2,
     justifyContent:'space-between'}}>
  <Typography variant="h5" >Form Builder </Typography>
  <BasicButton text={'X'} textColor={'magenta.main'}
  onClick={()=> {handleModalClose}}/>


    <FieldOptions/>
  </Box>
    )
}