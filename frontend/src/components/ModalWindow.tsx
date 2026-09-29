 import React from "react";

//MUI
 import { Box, Modal} from '@mui/material';
 //COMPONENTS

 import BuilderWindow from "./BuilderWindow/BuilderWindow";
 import FormEntry from './FormEntry';
 
 import FormView from "./FormView";
import InvitationPage from '../components/InvitationPage';


// //MUI
 import { Divider } from "@mui/material";
import { useDispatch } from "react-redux";
import { useModalStore } from "../stores/useModalStore";

export default function ModalWindow({message}:{message:string}) {
 
  const {modalMode} = useModalStore();
  const {modalOpen, setModalOpen} = useModalStore();
  
  

 // MODAL STYLE

  const boxStyle = {
     position: 'absolute',
    
    display:'flex',
    justifyContent:'center',
   
     top: '50%',
     left: '50%',
     transform: 'translate(-50%, -50%)',
     maxWidth: '100%',
     maxHeight:'100vh',

     
  }

  function renderStatus (status: string) {
    switch (status) {
    case 'newForm': return <BuilderWindow/>;
    case 'view': return <FormView/>;
    case 'submission': return <FormEntry/>;
    case 'invite' : return <InvitationPage/>
    default: return null
    }
  }

  return(
    <>
    <Modal
                     open={modalOpen}
                     onClose={() => setModalOpen(false)}
                     // aria-labelledby="modal-modal-title"
                     // aria-describedby="modal-modal-description"
                     sx={{ overflow:'scroll'}}
                     >
                      
                      <Box sx={boxStyle}>
                        {message}
                        <Divider/>
                        <Box sx={{display:'flex', flexDirection:{xs:'column',sm:'row'}}}>

                        
                        {
                          renderStatus(modalMode)
                        }
                         {/* {
                          
                          (modalMode === 'newForm' || modalMode === 'editing') && <BuilderWindow/> 
                            
                          } 
                          {modalMode=== 'view' && <FormView disabledFields={false}/>}

                          {/* {context === 'created' && 'created'} */}

                          {/* { modalMode === 'submission' && <FormEntry  />} */} 
                      
                        </Box>
                        
                      
                       
                        
                      </Box>
                     </Modal>
                         
                       </>
  )

   

  







                   


                  


                





                 
                 


        
}