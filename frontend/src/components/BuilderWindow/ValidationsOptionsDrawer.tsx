import React, { useState } from "react";
import ValidationOptions from "../ValidationsOptions";
//redux
import { useSelector, useDispatch } from "react-redux";

import { selectvalidationDrawer } from "../../features/validationDrawerSlice";
import { addField } from "../../features/formSlice";
//COMPONENTS
import BasicButton from "../UI/BasicButton";
//MUI
import { Box, Drawer, useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';




export default function ValidationsOptionsDrawer({openDrawer, 
setOpenDrawer}) {

const dispatch = useDispatch();
const theme = useTheme();
  const fieldType = useSelector(selectvalidationDrawer);


  const [validations, setValidations] = useState<Record<string, any>>({});
  const isMobile =useMediaQuery(theme.breakpoints.down('sm'))

  const handleaddField = () => {
    dispatch(addField({ type: fieldType, validations }));
  }

  const handleValidationChange = (name: string, value: any) => {
    setValidations((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Drawer
    sx={{position:'relative'}}
            

             variant="persistent"
             hideBackdrop
             ModalProps={{keepMounted: true}}
             PaperProps={{
               sx: {
                 position:'relative',
                 bgcolor:'background.default',
              
               
              
               }
             }}
              // set anchor based on viewport
             anchor={isMobile ? 'bottom' :"right"}
            
             open={openDrawer}
             >
                   <Box sx={{display:'flex', justifyContent:'end', zIndex:1}}>
           <BasicButton text={''} size={'large'} onClick={() => {setOpenDrawer(!openDrawer)}}
           textColor={'magenta.main'}/>
           </Box>
      <h3>Field Type: {fieldType}</h3>
      {/* render options based on field type  */}
      <ValidationOptions
        fieldType={fieldType}
        validations={validations}
        onChange={handleValidationChange}
      />

      <h4>choose validations:</h4>
      <pre>{JSON.stringify(validations, null, 2)}</pre>
      <Box>
        <BasicButton text={'add field'}
        onClick={() =>{handleaddField()}}/>
      </Box>
    </Drawer>
  );
}
