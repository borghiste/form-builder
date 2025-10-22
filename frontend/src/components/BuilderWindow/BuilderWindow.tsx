import React, { useState } from "react";

// MUI
import { Box, ButtonGroup, Divider, Typography } from "@mui/material";

// COMPONENTS
import BasicButton from "../UI/BasicButton";

import FormPreview from "../BuilderWindow/FormPreview";
import BuilderSection from "./BuilderSection";



export default function BuilderWindow({handleModalClose}: {handleModalClose: () => void}) {
  // state to switch from builder to preview
  const [preview, switchToPreview] = useState(false);

  return(
  <Box sx={{display:'flex', flexDirection:'column'}}>

      {/* window header */}
     <Box component={'header'} sx={{display:'flex', justifyContent:'space-between'}}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Form Builder
                </Typography>
      
      <BasicButton text={'X'} onClick={() => {handleModalClose()}}
      textColor="magenta.dark"/>
     


     </Box>
     <ButtonGroup>
     <BasicButton
               text={"build"}
               onClick={() => {
                 switchToPreview(false);
               }}
               textColor={"black"}
               variant={preview ? "" : "contained"}
               onclick={() => {
                 handleModalClose();
               }}/>
      <BasicButton
               text={"preview"}
               onClick={() => {
                 switchToPreview(true);
               }}
               variant={!preview ? "text" : "contained"}
               textColor={!preview ? "text.primary" : "black"}
               size={"small"}/>

     </ButtonGroup>

     <Divider/>

     <Box>

               {/* switch from builder to preview */}
           {preview ? <FormPreview /> : <BuilderSection />} 
          
     </Box>


  </Box>
  )

}