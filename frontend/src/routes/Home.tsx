import React, { useState } from "react";
//MUI
import { Box, ButtonGroup, Typography } from "@mui/material";
// COMPONENTS
import BasicButton from "../components/UI/BasicButton";
import RegisterForm from "../components/UI/RegistrationForm";
export default function Home(){
  const [showRegisterForm, setShowRegisterForm ] = useState(false);


    return(
      
        <Box
        variant='main'
        sx={{minHeight:'100vh', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
          
  <Box component={'div'} sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', gap:2, textAlign:'center'}}>

      <Typography variant="h1" sx={{color:'text.primary', }}>
Formitekt
      </Typography>

      <Typography variant="h2" sx={{color:'text.secondary' }}>
The ultimate form builder for your data management.
      </Typography>
      <Box component={'div'} sx={{display:'flex', flexDirection:{xs:'column', md:'row'}, justifyContent:'center', alignItems:'center', gap:4, mt:4}}>
            <img src="https://placehold.co/600x400"/>
      <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', gap:2}}>
            <Typography variant="'h2" sx={{color:'text.primary', fontSize:40}}>
                  Beneficio 1
            </Typography>
            <Typography variant="body1" sx={{color:'text.secondary', maxWidth:300}}>
- Crea moduli personalizzati con facilità utilizzando la nostra interfaccia intuitiva.
            </Typography>
      </Box>


      </Box>
      <BasicButton
      
       text={'sign up'} color={'cyan.main'}
       size={'large'} textColor={'white'} onClick={() => setShowRegisterForm(true)}/>

       <Box component={'div'} sx={{display:'flex', flexDirection:{xs:'column', md:'row'}, justifyContent:'center', alignItems:'center', gap:4, mt:4}}>
            <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', gap:2}}>
            <Typography variant="'h2" sx={{color:'text.primary', fontSize:40}}>
                  Beneficio 2
            </Typography>
            <Typography variant="body1" sx={{color:'text.secondary', maxWidth:300}}>
- Gestisci e analizza i dati raccolti con strumenti avanzati di gestione.
            </Typography>
            </Box>
<img src="https://placehold.co/600x400"/>
       </Box>

            {/* <Typography variant="h5" sx={{color:'text.primary', mb:2}}>
Why choose Formitekt?
            </Typography>
            <Typography variant="body1" sx={{color:'text.secondary'}}>
- Intuitive Drag-and-Drop Interface: Easily create and customize forms without any coding knowledge.
- Extensive Template Library: Choose from a variety of pre-designed templates to get started quickly.
- Advanced Data Management: Efficiently collect, store, and analyze form submissions with powerful tools.
- Seamless Integrations: Connect with popular apps and services to streamline your workflow.
- Responsive Design: Ensure your forms look great on any device, from desktops to smartphones.
            </Typography> */}
      

      <ButtonGroup>
      <BasicButton
       text={'sign up'} color={'cyan.main'}
       size={'large'} textColor={'white'} onClick={() => setShowRegisterForm(true)}/>


      </ButtonGroup>
  </Box>
  {showRegisterForm && <RegisterForm />}
        
       
  
        </Box>

        
    )
}