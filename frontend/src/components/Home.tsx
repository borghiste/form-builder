import { colors, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import SimpleButton from "./UI/SimpleButton";
export default function Home(){

    return(
        <Box className="h-max flex flex-col justify-center items-center w-full"
        sx={{minHeight:'100vh'}}>
           <br />
      <Typography variant="h1" sx={{color:'text.primary'}}>
        home
      </Typography>
      <Typography sx={{color:'text.primary'}} >
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto est reprehenderit repellendus odit dolorem, nobis culpa exercitationem eveniet, voluptate inventore sed voluptates ex mollitia. Expedita iusto asperiores enim inventore provident.
      </Typography>

      <Box component={'div'} sx={{display:'flex'}}>
        <SimpleButton text={'get started'} variant={'contained'} color={'cyan.main'} href={'/admin'}/>
      </Box>
        
       
        </Box>
    )
}