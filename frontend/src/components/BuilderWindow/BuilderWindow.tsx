import React, { useState } from "react";

// MUI
import { Box, ButtonGroup, Divider, Typography } from "@mui/material";

// COMPONENTS
import BasicButton from "../UI/BasicButton";
import FieldOptions from "./FieldTypesDrawer";
import FormPreview from "../FormPreview";
import BuilderSection from "./BuilderSection";


export default function BuilderWindow({ handleModalClose }) {
  // state to switch from builder to preview
  const [preview, switchToPreview] = useState(false);

  return(
  <Box sx={{display:'flex', flexDirection:'column'}}>
      {/* window header */}
     <Box component={'header'} sx={{display:'flex', justifyContent:'space-between'}}>
      <Typography variant={'h5'}>Form Builder</Typography>
      <BasicButton
           text={"X"}
           textColor={"magenta.main"}
           onClick={() => {
             handleModalClose(false);
           }}/>


     </Box>
     <ButtonGroup>
     <BasicButton
               text={"builder"}
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


{/* columns container */}
     <Box>

               {/* switch from builder to preview */}
          {preview ? <FormPreview /> : <BuilderSection />}
     </Box>


  </Box>
  )

  // return (
  //   <Box sx={{ display: "flex", 
  //     flexDirection: "column",
 
  //     position:'relative'
  //    }}>
  //     {/*  window header  */}
  //     <Box
  //     component={'header'}
  //       sx={{
          
  //         display:'flex',
  //         alignItems: "center",
         

  //         justifyContent:'space-between',
          
          
          

          
  //       }}
  //     >
  //       <Typography variant="h5" >Form Builder</Typography>

     

  //        <BasicButton
  //         text={"X"}
  //         textColor={"magenta.main"}
  //         onClick={() => {
  //           handleModalClose(false);
  //         }}
  //       /> 
  //     </Box>

  //     <Box
  //       sx={{
  //         bgcolor:'blue',
  //         display: "flex",
  //         justifyContent: "center",
  //         flexDirection: { xs: "column", sm: "row" },
  //         overflowY: "hidden",
  //         position: "relative",
  //       }}
  //     >
  //       <Box sx={{bgcolor:'red'}}>
  //         <ButtonGroup>
  //           <BasicButton
  //             text={"builder"}
  //             onClick={() => {
  //               switchToPreview(false);
  //             }}
  //             textColor={"black"}
  //             variant={preview ? "" : "contained"}
  //             onclick={() => {
  //               handleModalClose();
  //             }}
  //           />
  //           <BasicButton
  //             text={"preview"}
  //             onClick={() => {
  //               switchToPreview(true);
  //             }}
  //             variant={!preview ? "text" : "contained"}
  //             textColor={!preview ? "text.primary" : "black"}
  //             size={"small"}
  //           />
  //         </ButtonGroup>

  //         <Divider />

  //         {/* switch from builder to preview */}
  //         {preview ? <FormPreview /> : <BuilderSection />}
  //       </Box>
  //     </Box>
  //   </Box>
  // );
}
