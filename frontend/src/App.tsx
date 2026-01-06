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

// ---------------------- CONTEXT ----------------------
interface ModalContextType<T = Record<string, any>> {
  mode: 'newForm' | 'editing' | 'view' | 'created' | 'submission' | null;
  EntryObj?: T;
  setMode: (value: ModalContextType['mode']) => void;
  setEntryObj: (value?: T) => void;
  modalOpen: boolean;
  setModalOpen: (value: boolean) => void;
}

export const modalContext = createContext<ModalContextType>({
  mode: null,
  setMode: () => {},
  setEntryObj: () => {},
  modalOpen: false,
  setModalOpen: () => {}
});



// ---------------------- APP ----------------------
export default function App() {
  const themeState = useSelector(selectMode); 
  const User = useSelector(selectUser); 

  // MODAL STATE

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <modalContext.Provider value={{ modalOpen, setModalOpen }}>
      <ThemeProvider theme={ themeState ? DarkTheme : LightTheme}>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={User?.id ? null : <Login />} />
              <Route
                path="/forms"
                element={
                  <ProtectedRoute>
                    <FormsList modalOpen={modalOpen} setModalOpen={setModalOpen} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/FormEntries"
                element={
                  <ProtectedRoute>
                    <FormEntriesTable modalOpen={modalOpen} setModalOpen={setModalOpen} />
                  </ProtectedRoute>
                }
              />

              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </modalContext.Provider>
  );
}

// import React, { createContext, useState } from 'react';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Layout from './components/Layout';
// import { ThemeProvider } from '@emotion/react';
// import { LightTheme, DarkTheme} from '../src/theme/theme';
// import { selectMode } from './features/themeSlice';
// import {useSelector } from 'react-redux';



// // COMPONENTS
// import Home from '../src/routes/Home';
// import FormsList from './routes/FormList';
// import Login from '../src/routes/LoginPage';
// import ProtectedRoute from './routes/ProtectedRoute';

// //REDUX
// import { selectUser } from './features/UserSlice';
// import FormEntriesTable from './routes/FormEntriesTable';


// interface ModalContextType<T = Record<string, any>> {
//     mode: 'newForm' | 'editing' | 'view' | 'created' | 'submission' | null;
//     obj?: T;
//     setMode: (value: ModalContextType['mode']) => void;
//     setObj: (value?: T) => void;
//   }

// export const modalContext = createContext<ModalContextType>({
//     mode: '',
//     setMode: () => {},
//     setObj: () => {}
// });

// export default function App(){

//     const themeState = useSelector(selectMode); 
//      const User = useSelector(selectUser); 
//     const [context, setContext] = useState< 'newForm' | 'editing' | 'view' | 'created' | 'submission' | null>(null);
//       const [modalOpen, setModalOpen] = useState(false);

//     return(
        
//         <ThemeProvider theme={ themeState ? DarkTheme : LightTheme}>
//             <modalContext.Provider value={{ mode, obj, setMode, setObj, modalOpen, setModalOpen }}>

//          <BrowserRouter>
//              <Layout>

//          <Routes>
//             <Route path='/' element={<Home/>}/>


//             <Route path='/login' element={ User.id !== null ? null : <Login/> }>
//             </Route>
//             <Route path='/forms' element={ <ProtectedRoute>
//                 <FormsList modalOpen={modalOpen} setModalOpen={setModalOpen}/>  </ProtectedRoute>
//                 }>
               
//             </Route>
//             <Route path='/FormEntries' element={<ProtectedRoute><FormEntriesTable setModalOpen={setModalOpen}
//             modalOpen={modalOpen}/></ProtectedRoute>}>

//             </Route>
            
         
           
//          </Routes>
//              </Layout>
//          </BrowserRouter>
//         </modalContext.Provider>
//         </ThemeProvider>
//     )
// }