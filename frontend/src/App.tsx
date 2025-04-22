import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import { ThemeProvider } from '@emotion/react';
import { LightTheme, DarkTheme} from '../src/theme/theme';
import { selectMode } from './features/themeSlice';
import {useSelector } from 'react-redux';


// COMPONENTS
import Home from '../src/routes/Home';
import FormsList from './routes/FormList';

export default function App(){

    const themeState = useSelector(selectMode); 
    return(
        
        <ThemeProvider theme={ themeState ? DarkTheme : LightTheme }>

        
         <BrowserRouter>
             <Layout>

         <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login/forms' element={<FormsList/>}>

            </Route>
         </Routes>
             </Layout>
         </BrowserRouter>
        </ThemeProvider>
    )
}