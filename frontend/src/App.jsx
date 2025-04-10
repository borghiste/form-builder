 import '@fontsource/roboto/300.css';
 import '@fontsource/roboto/400.css';
 import '@fontsource/roboto/500.css';
 import '@fontsource/roboto/700.css';


import FormsList from './components/FormsList';
 import FormsDrawer from './components/FormsDrawer';
 import Preview from './components/Preview';
 import BuildingSection from './components/BuildingSection';
import { useState } from 'react';
import {Provider} from 'react-redux';
import Modal from './components/Modal';
import List from '@mui/material/List';




export default function App(){

  

    return(


      <>
     <h1 className='text-4xl font-bold'>Form Builder</h1>

<FormsList/>
 <Modal/> 




      </>
    
    )    
}