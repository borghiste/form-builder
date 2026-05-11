import React, { createContext, useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import { ThemeProvider } from '@emotion/react';
import { LightTheme, DarkTheme } from '../src/theme/theme';
import { useSelector } from 'react-redux';
import { selectMode } from './features/themeSlice';

import { useAuthentication } from './stores/useAuthStore';

// COMPONENTS
import Home from '../src/routes/Home';
import FormsList from './routes/FormList';
import Login from '../src/routes/LoginPage';
import ProtectedRoute from './routes/ProtectedRoute';
import FormEntriesTable from './routes/FormEntriesTable';
import AboutPage from './routes/AboutPage';
import RegisterForm from './routes/RegistrationForm';
import TermsAndPrivacy from './routes/TermsandPrivacy';
import NotFound from './routes/NotFound';



// ---------------------- APP ----------------------
export default function App() {
  const themeState = useSelector(selectMode); 
  const { organization, subdomain, user} = useAuthentication();

  


  return (
    
      <ThemeProvider theme={ themeState ? DarkTheme : LightTheme}>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path={`/`} element={<Home />} />
              <Route path="/signup" element={ user == null ? <Login/> : <RegisterForm/>} />
              <Route path="/login" element={user?.id ? null : <Login/>} />
              <Route
                path={`/${subdomain}/forms`}
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
              <Route path="*" element={<NotFound/>} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    
  );
}

