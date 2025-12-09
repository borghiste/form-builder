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
import RecordsList from './routes/FormEntries';
//REDUX
import { selectUser } from './features/UserSlice';
import FormEntriesTable from './routes/FormEntries';

export const modalContext = createContext<any>(null);

export default function App(){

    const themeState = useSelector(selectMode); 
     const User = useSelector(selectUser); 
    const [context, setContext] = useState< 'newForm' | 'editing' | 'view' | null>(null);
    

   
    return(
        
        <ThemeProvider theme={ themeState ? DarkTheme : LightTheme }>
            <modalContext.Provider value={{context, setContext}}>

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
            <Route path='/FormEntries' element={<ProtectedRoute><FormEntriesTable/></ProtectedRoute>}>

            </Route>
            
         
           
         </Routes>
             </Layout>
         </BrowserRouter>
        </modalContext.Provider>
        </ThemeProvider>
    )
}