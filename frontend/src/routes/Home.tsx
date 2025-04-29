import React from "react";
//MUI
import { Box, Typography } from "@mui/material";
// COMPONENTS
import BasicButton from "../components/UI/BasicButton";
export default function Home(){

    return(
        <Box
        sx={{minHeight:'100vh', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
          
      <Typography variant="h1" sx={{color:'text.primary'}}>
        home
      </Typography>
      <Typography sx={{color:'text.primary', maxWidth:'30rem'}} >
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto est reprehenderit repellendus odit dolorem, nobis culpa exercitationem eveniet, voluptate inventore sed voluptates ex mollitia. Expedita iusto asperiores enim inventore provident.
      </Typography>

      <Box component={'div'} sx={{display:'flex'}}>
        <BasicButton text={'get started'} variant={'contained'} color={'cyan.main'} href={'/login'}/>
      </Box>
        
       
        </Box>
    )
}