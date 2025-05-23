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
import Login from '../src/routes/LoginPage';
import ProtectedRoute from './routes/ProtectedRoute';
import FormBuilder from './routes/FormBuilder';
//REDUX
import { selectUser } from './features/UserSlice';

export default function App(){

    const themeState = useSelector(selectMode); 
     const User = useSelector(selectUser); 
    

   
    return(
        
        <ThemeProvider theme={ themeState ? DarkTheme : LightTheme }>

        
         <BrowserRouter>
             <Layout>

         <Routes>
            <Route path='/' element={<Home/>}/>


            <Route path='/login' element={ User.id !== null ? null : <Login/> }>
            </Route>
            <Route path='/forms' element={ <ProtectedRoute>
                <FormsList/>  </ProtectedRoute>
                }>
               
            </Route>
            
         
           
         </Routes>
             </Layout>
         </BrowserRouter>
        </ThemeProvider>
    )
}