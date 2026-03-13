
import React, { useState } from "react";
//MUI
import { Box, ButtonGroup, Typography, Grid, Card, CardContent } from "@mui/material";
// COMPONENTS
import BasicButton from "../components/UI/BasicButton";

import homeImg1 from '../assets/images/home-1.png';
import SignUpButton from "../components/UI/SignUpButton";


export default function Home(){
  
  console.log('home');

  return(
    <Box
      variant='main'
      sx={{ display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', pb:8}}>
      
      <Box component={'div'} sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', gap:2, textAlign:'center', maxWidth:'1200px', px:2}}>

        {/* Hero Section */}
        <Typography variant="h1" sx={{color:'text.primary', mt:8}}>
          PickForm
        </Typography>

        <Typography variant="h2" sx={{color:'text.secondary' }}>
          The ultimate form builder for your data management.
        </Typography>

        {/* Beneficio 1 */}
       
         <Box component={'div'} sx={{display:'flex', flexDirection:{xs:'column', md:'row'}, justifyContent:'center', alignItems:'center', gap:4, mt:6}}>
         <img src={homeImg1}/>


          <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', gap:2}}>
            <Typography variant="h2" sx={{color:'text.primary', fontSize:40}}>
             Intuitive interface
            </Typography>
            <Typography variant="body1" sx={{color:'text.secondary', maxWidth:300}}>
              create custom forms with ease using our intuitive drag-and-drop interface.
        
            </Typography>
          </Box>
        </Box> 

        <SignUpButton/>

        {/* Beneficio 2 */}
        <Box component={'div'} sx={{display:'flex', flexDirection:{xs:'column', md:'row-reverse'}, justifyContent:'center', alignItems:'center', gap:4, mt:6}}>
          <img src="https://placehold.co/600x400" alt="Beneficio 2"/>
          <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', gap:2}}>
            <Typography variant="h2" sx={{color:'text.primary', fontSize:40}}>
              All your data in one place
            </Typography>
            <Typography variant="body1" sx={{color:'text.secondary', maxWidth:300}}>
              Collect and manage all your form responses in a centralized dashboard.
            </Typography>
          </Box>
        </Box>

        {/* Beneficio 3 */}
        <Box component={'div'} sx={{display:'flex', flexDirection:{xs:'column', md:'row'}, justifyContent:'center', alignItems:'center', gap:4, mt:6}}>
          <img src="https://placehold.co/600x400" alt="Beneficio 3"/>
          <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', gap:2}}>
            <Typography variant="h2" sx={{color:'text.primary', fontSize:40}}>
              Custom validations
            </Typography>
            <Typography variant="body1" sx={{color:'text.secondary', maxWidth:300}}>
              Integra i tuoi moduli con i servizi che usi quotidianamente: email, CRM, database e molto altro.
            </Typography>
          </Box>
        </Box>

        {/* Features Grid Section */}
        <Box sx={{mt:10, width:'100%'}}>
          <Typography variant="h3" sx={{color:'text.primary', mb:6, textAlign:'center'}}>
            Funzionalità Principali
          </Typography>
          
          <Grid container spacing={3} sx={{mb:6}}>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{height:'100%', textAlign:'center', p:2}}>
                <CardContent>
                  <Typography variant="h5" sx={{color:'text.primary', mb:2}}>
                    📱 Responsive Design
                  </Typography>
                  <Typography variant="body2" sx={{color:'text.secondary'}}>
                    I tuoi moduli si adattano perfettamente a qualsiasi dispositivo
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{height:'100%', textAlign:'center', p:2}}>
                <CardContent>
                  <Typography variant="h5" sx={{color:'text.primary', mb:2}}>
                    📊 Analytics Real-time
                  </Typography>
                  <Typography variant="body2" sx={{color:'text.secondary'}}>
                    Monitora le risposte in tempo reale con dashboard interattive
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{height:'100%', textAlign:'center', p:2}}>
                <CardContent>
                  <Typography variant="h5" sx={{color:'text.primary', mb:2}}>
                    🎨 Template Library
                  </Typography>
                  <Typography variant="body2" sx={{color:'text.secondary'}}>
                    Scegli tra centinaia di template professionali pronti all'uso
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{height:'100%', textAlign:'center', p:2}}>
                <CardContent>
                  <Typography variant="h5" sx={{color:'text.primary', mb:2}}>
                    🔒 Sicurezza Enterprise
                  </Typography>
                  <Typography variant="body2" sx={{color:'text.secondary'}}>
                    Crittografia end-to-end e conformità GDPR garantite
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{height:'100%', textAlign:'center', p:2}}>
                <CardContent>
                  <Typography variant="h5" sx={{color:'text.primary', mb:2}}>
                    🤖 Automazioni
                  </Typography>
                  <Typography variant="body2" sx={{color:'text.secondary'}}>
                    Automatizza i flussi di lavoro con trigger e azioni personalizzate
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{height:'100%', textAlign:'center', p:2}}>
                <CardContent>
                  <Typography variant="h5" sx={{color:'text.primary', mb:2}}>
                    👥 Collaborazione
                  </Typography>
                  <Typography variant="body2" sx={{color:'text.secondary'}}>
                    Lavora in team con permessi e ruoli personalizzabili
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Testimonials Section */}
        <Box sx={{mt:8, width:'100%'}}>
          <Typography variant="h3" sx={{color:'text.primary', mb:6, textAlign:'center'}}>
            Cosa dicono i nostri clienti
          </Typography>
          
          <Grid container spacing={3} sx={{mb:6}}>
            <Grid item xs={12} md={4}>
              <Card sx={{height:'100%', p:3}}>
                <CardContent>
                  <Typography variant="body1" sx={{color:'text.secondary', mb:2, fontStyle:'italic'}}>
                    "Formitekt ha rivoluzionato il modo in cui raccogliamo feedback dai clienti. Intuitivo e potente!"
                  </Typography>
                  <Typography variant="subtitle2" sx={{color:'text.primary', fontWeight:'bold'}}>
                    - Marco Rossi, CEO TechStart
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{height:'100%', p:3}}>
                <CardContent>
                  <Typography variant="body1" sx={{color:'text.secondary', mb:2, fontStyle:'italic'}}>
                    "L'integrazione con i nostri sistemi è stata semplicissima. Risparmiamo ore di lavoro ogni settimana."
                  </Typography>
                  <Typography variant="subtitle2" sx={{color:'text.primary', fontWeight:'bold'}}>
                    - Laura Bianchi, Marketing Manager
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{height:'100%', p:3}}>
                <CardContent>
                  <Typography variant="body1" sx={{color:'text.secondary', mb:2, fontStyle:'italic'}}>
                    "Il miglior form builder che abbiamo mai usato. Il supporto clienti è eccezionale!"
                  </Typography>
                  <Typography variant="subtitle2" sx={{color:'text.primary', fontWeight:'bold'}}>
                    - Andrea Verdi, Product Owner
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Final CTA Section */}
        <Box sx={{mt:10, textAlign:'center', width:'100%', bgcolor:'rgba(0,188,212,0.1)', borderRadius:2, p:6}}>
          <Typography variant="h3" sx={{color:'text.primary', mb:2}}>
            Pronto a iniziare?
          </Typography>
          <Typography variant="h6" sx={{color:'text.secondary', mb:4}}>
            Crea il tuo primo modulo in meno di 5 minuti. Nessuna carta di credito richiesta.
          </Typography>
          <ButtonGroup>
            <BasicButton
              text={'Inizia Gratis'} 
              color={'cyan.main'}
              size={'large'} 
              textColor={'white'} 
              onClick={() => setShowRegisterForm(true)}
            />
          </ButtonGroup>
        </Box>

      </Box>

      
      
    </Box>

    
  )
}