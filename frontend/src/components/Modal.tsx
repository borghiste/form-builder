 import React, { useContext } from "react";
  import  {modalContext }  from '../App';  

//MUI

 import { Box, Modal} from '@mui/material';
 //COMPONENTS

 import BuilderWindow from "../components/BuilderWindow/BuilderWindow";
 
 import FormView from "../components/FormView";

 //REDUX
 

// //MUI
 import { Divider } from "@mui/material";

export default function BuilderModal({modalIsOpen, handleModalClose }){
   const {context} = useContext(modalContext);
  


//   // MODAL STYLE

  const boxStyle = {
     position: 'absolute',
    overflow:'auto',
    display:'flex',
    justifyContent:'center',
     top: '50%',
     left: '50%',
     transform: 'translate(-50%, -50%)',
     maxWidth: '100%',
     mazHeight:'100%',
     
     p: 0,
     
  }

  return(
    <>
    <Modal
                     open={modalIsOpen}
                     onClose={handleModalClose}
                     // aria-labelledby="modal-modal-title"
                     // aria-describedby="modal-modal-description"
                     sx={{zIndex:1, overflow:'scroll'}}>
                      
                      <Box sx={boxStyle}>
                      
                       
                        <Divider/>
                        <Box sx={{display:'flex', flexDirection:{xs:'column',sm:'row',                  }}}>

                        
                        {
                          context === 'newForm' || context === 'editing' ? <BuilderWindow handleModalClose={handleModalClose} /> 
                            : <FormView/>
                          }
                        
                        </Box>
                        
                      
                       
                        
                      </Box>
                     </Modal>
                         
                       </>
  )

   

  







                   


                  


                





                 
                 


        
}