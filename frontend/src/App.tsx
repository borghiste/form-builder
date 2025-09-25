import React from 'react';
import { createContext, useState } from 'react';
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
//REDUX
import { selectUser } from './features/UserSlice';

export const modalContext = createContext<any>(null);

export default function App(){

    const themeState = useSelector(selectMode); 
     const User = useSelector(selectUser); 
    const [newFormClick, setNewFormClick] = useState(false);
    

   
    return(
        
        <ThemeProvider theme={ themeState ? DarkTheme : LightTheme }>
            <modalContext.Provider value={{newFormClick, setNewFormClick}}>


        
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
        </modalContext.Provider>
        </ThemeProvider>
    )
}