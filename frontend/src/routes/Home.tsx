import React, { useState, useEffect, useRef } from "react";
//MUI
import { Box, ButtonGroup, Typography, Grid, Card, CardContent } from "@mui/material";
// COMPONENTS


import homeImg1 from '../assets/images/home-1.png';
import SignUpButton from "../components/UI/SignUpButton";



// Hook per triggerare l'animazione quando la sezione entra nel viewport
function useIntersectionAnimation(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

// Stili CSS iniettati una volta sola
const ANIMATION_STYLES = `
  .feat-card {
    opacity: 0;
    transition: opacity 0.6s ease, transform 12s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .feat-card.from-left  { transform: translateX(-80px); }
  .feat-card.from-bottom { transform: translateY(60px); }
  .feat-card.from-right { transform: translateX(80px); }
  .feat-card.visible {
    opacity: 1 !important;
    transform: translate(0, 0) !important;
  }
`;

let stylesInjected = false;
function injectStyles() {
  if (stylesInjected) return;
  stylesInjected = true;
  const style = document.createElement('style');
  style.textContent = ANIMATION_STYLES;
  document.head.appendChild(style);
}

export default function Home(){

  
 

  useEffect(() => { injectStyles(); }, []);
  const { ref: featRef, visible: featVisible } = useIntersectionAnimation(0.1);

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
       
         <Box component={'div'} sx={{display:'flex', flexDirection:{xs:'column', md:'row'}, justifyContent:'center', alignItems:'center'}}>
         <img src={homeImg1}/>


          <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center',  flexWrap: 'wrap', gap:2}}>
            <Typography variant="h2" sx={{color:'text.primary', fontSize:{md: 40}, flexWrap:'wrap'}}>
             Intuitive interface
            </Typography>
            <Typography variant="body1" sx={{color:'text.secondary', maxWidth:300}}>
              create custom forms with ease using our intuitive drag-and-drop interface.
        
            </Typography>
          </Box>
        </Box> 

        <SignUpButton size={'large'}/>

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
              Ensure data quality with custom validation rules and error messages.
            </Typography>
          </Box>
        </Box>

        {/* Features Grid Section */}
        <Box ref={featRef} sx={{mt:10, width:'100%'}}>
          <Typography variant="h3" sx={{color:'text.primary', mb:6, textAlign:'center'}}>
            Main features
          </Typography>
          
          <Grid container spacing={3} sx={{mb:6}}>
            <Grid item xs={12} sm={6} md={4} flexDirection={'column'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
              <Card
                className={`feat-card from-left${featVisible ? ' visible' : ''}`}
                style={{ transitionDelay: '0ms' }}
                sx={{height:'100%', textAlign:'center', p:2}}
              >
                <CardContent>
                  <Typography variant="h5" sx={{color:'text.primary'}}>
                    📱 Responsive Design
                  </Typography>
                  <Typography variant="body2" sx={{color:'text.secondary'}}>
                    your forms will look great on any device, from desktop to mobile, ensuring a seamless user experience
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card
                className={`feat-card from-bottom${featVisible ? ' visible' : ''}`}
                style={{ transitionDelay: '150ms' }}
                sx={{height:'100%', textAlign:'center', p:2}}
              >
                <CardContent>
                  <Typography variant="h5" sx={{color:'text.primary', mb:2}}>
                    📊 Analytics Real-time
                  </Typography>
                  <Typography variant="body2" sx={{color:'text.secondary'}}>
                    track form performance with real-time analytics and gain insights into user behavior
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card
                className={`feat-card from-right${featVisible ? ' visible' : ''}`}
                style={{ transitionDelay: '300ms' }}
                sx={{height:'100%', textAlign:'center', p:2}}
              >
                <CardContent>
                  <Typography variant="h5" sx={{color:'text.primary', mb:2}}>
                    🤖 Automations
                  </Typography>
                  <Typography variant="body2" sx={{color:'text.secondary'}}>
                    automate repetitive tasks with powerful workflow automations
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

           
          </Grid>
        </Box>


        {/* Final CTA Section */}
        <Box sx={{mt:10, textAlign:'center', width:'100%', bgcolor:'rgba(0,188,212,0.1)', borderRadius:2, p:6}}>
          <Typography variant="h3" sx={{color:'text.primary', mb:2}}>
            ready to get started?
          </Typography>
          <Typography variant="h6" sx={{color:'text.secondary', mb:4}}>
            Try PickForm for free and experience the power of effortless form building.
          </Typography>
          <ButtonGroup>
            <SignUpButton
              text={'Try for free'} 
              color={'cyan.main'}
              size={'large'} 
              textColor={'white'}
              href={'/signup'} 
              
            />
          </ButtonGroup>
        </Box>

      </Box>

      
      
    </Box>

    
  )
}