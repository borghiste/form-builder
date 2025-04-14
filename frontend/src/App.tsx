//MUI

import { ThemeProvider } from '@emotion/react';
import { useColorScheme } from '@mui/material';
 // COMPONENTS
 import FormsList from './components/FormsList';
import Login from './components/admin/Login';
 // CSS
 import '@fontsource/roboto/300.css';
 import '@fontsource/roboto/400.css';
 import '@fontsource/roboto/500.css';
 import '@fontsource/roboto/700.css';

/// ROUTES

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import Modal from './components/admin/Modal/Modal'
import Home from './components/Home';
import { useState } from 'react';
import {LightTheme, DarkTheme} from '../src/theme/theme';

export default function App(){

const [ darkMode, setDarkMode] = useState(false);

    return(


      <>

      <ThemeProvider theme={ darkMode ?  DarkTheme : LightTheme}>

     
     <BrowserRouter>
     <Layout mode={darkMode} SetMode={setDarkMode}>

     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='admin' element={<Login/>}/>
      <Route path='admin/forms' element={<FormsList/>}>

      <Route path='new' element={<Modal/>}/>
      </Route>



      
     </Routes>
     </Layout >
     </BrowserRouter>
      </ThemeProvider>
     

 




      </>
    
    )    
}