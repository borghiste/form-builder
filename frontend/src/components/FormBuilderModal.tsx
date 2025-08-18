 import React, { useRef, useState } from "react";

 import Box from '@mui/material/Box';
 import Button from '@mui/material/Button';
 import Typography from '@mui/material/Typography';
 import Modal from '@mui/material/Modal';
 //COMPONENTS
 import BasicButton from "./UI/BasicButton";
 import FieldOptions from "./FieldOptions";
 import LabeledTextField from "./UI/LabeledTextField";
 import RightSideDrawer from "./RightSideDrawer";
 ;
 import LeftDrawer from './LeftSideBar';
 import FormPreview from "./FormPreview";
 //REDUX
 import { addNewForm } from "../features/formsListSlice";
 import { useDispatch, UseDispatch } from "react-redux";
// //MUI
 import { colors, Divider, Stack } from "@mui/material";

export default function FormBuilderModal({modalIsOpen, handleModalClose}){



//   // MODAL STYLE

  const boxStyle = {
      
     position: 'absolute',
    display:'flex', 
    flexDirection:{xs:'column',md:'row'},
    justifyContent:'center',
    
     top: '50%',
     left: '50%',
     transform: 'translate(-50%, -50%)',
     maxWidth: '100%',
     mazHeight:'100%',
     bgcolor: 'background.default',
     border: '1px solid #000',
     boxShadow: 24,
     
     p: 0
  }
  return(
    <>
    <Modal
                     open={modalIsOpen}
                     onClose={handleModalClose}
                     // aria-labelledby="modal-modal-title"
                     // aria-describedby="modal-modal-description"
                     sx={{zIndex:1}}>
                      
                      <Box sx={boxStyle}>
                        
                        <Box sx={{display:'flex',
                          position:'static',
                          width:'100%', justifyContent:'space-between'}}>
                        <Typography variant="h5" >Form Builder </Typography>
                        <BasicButton text={'X'} textColor={'magenta.main'}
                        onClick={()=>{handleModalClose()}}/>

                        </Box>
                        <Divider/>
                        <LeftDrawer/>
                        <FormPreview/>
                      
                       
                        
                      </Box>
                     </Modal>
                        <RightSideDrawer/>
                       </>
  )

   

  






{/* //     setOpenAddField(newOpen);
//   };

//   //ADD NEW FORM FUNCTION

//   function insertNewForm(){ */}
{/* //     fetch(`${import.meta.env.VITE_BACKEND_URL}/api/new`, 
//       { method: 'POST', */}
{/* //         headers: 
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//         },
//         body: JSON.stringify({name: formName,
//                               description: description
//         })
//       }
//     )
//     .then(
      
//     res => {
//       if(!res.ok){
//       return res.json().then(err => console.log('err',err))
//     } 
     
//     return res.json();

//   })
//    dispatch(addNewForm())

//   }


    
//     return(
    

//             <>
              
//               <Modal
//                 open={modalIsOpen}
//                 onClose={handleModalClose}
//                 // aria-labelledby="modal-modal-title"
//                 // aria-describedby="modal-modal-description"
//                 sx={{zIndex:1}}
//               >
//                 <Box sx={modalStyle}>
//                   <Box sx={{display:'flex', justifyContent:'space-between',maxHeight:'50%', flexDirection:'column'}}>

                  
//                   <Button sx={{ p:0}}>X</Button>
//                   </Box>
//                 <Divider/>

                  
//                     <Drawer/>
                    
                 
//                     {/* <FormFieldsSection addFieldAction={() => toggleDrawer(true)}/> */}
//                     <Stack direction={'row'}  />
                   


                  


                





                 
                 

//                   <Box sx={{display:'flex', justifyContent:'flex-end'}}>


//                   <BasicButton text={'cancel'}
//                             color={'magenta.main'}
//                             textColor={'black'} onClick={() => {handleModalClose()}}
//                             fullWidth={true}/>
//                   <BasicButton text={'save'} 
//                               color={'cyan.main'} 
//                               textColor={'white'} 
//                               fullWidth={true}
//                               onClick={() => { insertNewForm()}}/>

//                   </Box> 


                  

//                 </Box>

//               </Modal>
//                {/* <FieldOptions open={openAddField}
//                            setOpen={setOpenAddField}/>   */}
//             </>
//           );
//         }
        
}