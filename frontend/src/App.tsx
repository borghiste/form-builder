import React, { createContext, useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import { ThemeProvider } from '@emotion/react';
import { LightTheme, DarkTheme } from '../src/theme/theme';
import { useSelector } from 'react-redux';
import { selectMode } from './features/themeSlice';
import { selectUser } from './features/UserSlice';

// COMPONENTS
import Home from '../src/routes/Home';
import FormsList from './routes/FormList';
import Login from '../src/routes/LoginPage';
import ProtectedRoute from './routes/ProtectedRoute';
import FormEntriesTable from './routes/FormEntriesTable';
import AboutPage from './routes/AboutPage';
import RegisterForm from './routes/RegistrationForm';
import TermsAndPrivacy from './routes/TermsandPrivacy';



// ---------------------- APP ----------------------
export default function App() {
  const themeState = useSelector(selectMode); 
  const User = useSelector(selectUser); 


  return (
    
      <ThemeProvider theme={ themeState ? DarkTheme : LightTheme}>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={User?.id ? <Login/> : <RegisterForm/>} />
              <Route path="/login" element={User?.id ? null : <Login/>} />
              <Route
                path="/forms"
                element={
                  <ProtectedRoute>
                    <FormsList/>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/entries"
                element={
                  <ProtectedRoute>
                    <FormEntriesTable/>
                  </ProtectedRoute>
                }
              />

<Route path='terms-and-privacy' element={<TermsAndPrivacy/>}/>
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    
  );
}

