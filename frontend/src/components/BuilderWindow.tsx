import React, { useState } from "react";
import { Box, ButtonGroup, Divider, Typography } from "@mui/material";

// COMPONENTS

import BasicButton from "./UI/BasicButton";
import FieldOptions from "./FieldOptions";
import DynamicButtonGroup from "./UI/DynamicButtonGroup";
import LeftSideBar from '../components/LeftSideBar';
import FormPreview from "./FormPreview";
import BuilderSection from "./BuilderSection";
import RightSideDrawer from './RightSideDrawer'

export default function BuilderModal({handleModalClose}){


    const [preview, switchToPreview] = useState(false);
 

  

    return(
        <Box sx={{display:'flex', flexDirection:'column'}}>

        <Box sx={{display:'grid', gridAutoFlow:'column',
            alignItems:'center',
            position:'sticky', gap:2,
            justifyContent:'space-between'}}>
  <Typography variant="h5" >Form Builder</Typography>
  <BasicButton text={'X'} textColor={'magenta.main'}
                onClick={()=> {handleModalClose(false)}}/>


  </Box>

            <Box sx={{display:'flex', 
                    justifyContent:'center', 
                    flexDirection:{ xs:'column',sm:'row'}, overflowY:'hidden',
                    position:'relative'}}>

      
     <Box>
        <ButtonGroup sx={{width:'100%'}}>
            <BasicButton text={'builder'} 
                        onClick={()=>{switchToPreview(false)}}
                        textColor={'black'}
                        variant={preview ? '' : 'contained'}
                        onclick={() => {handleModalClose()}}
                            />
            <BasicButton text={'preview'} onClick={()=>{switchToPreview(true)}}
                                          variant={ !preview ? 'text' : 'contained'}
                                            textColor={ !preview ? 'text.primary' : 'black'}
                                             />


        </ButtonGroup>
        <Divider/>
        {/* switch from builder to preview */}

            { preview ?
    
                <FormPreview/> 
                : 

                <BuilderSection/>
               
               
        
                
             

            }
     </Box>
            </Box>
      

    


    
  </Box>
    )
}