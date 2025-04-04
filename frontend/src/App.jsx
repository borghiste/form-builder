 import '@fontsource/roboto/300.css';
 import '@fontsource/roboto/400.css';
 import '@fontsource/roboto/500.css';
 import '@fontsource/roboto/700.css';



 import FormsDrawer from './components/FormsDrawer';
 import Preview from './components/Preview';
 import BuildingSection from './components/BuildingSection';
import { useState } from 'react';
import {Provider} from 'react-redux';

export default function App(){

  

    return(


      <>
     


<header className='w-full flex justify-end'>

         <FormsDrawer/> 
</header>
      <main className='flex flex-col sm:flex-row sm:justify-center'>
    

      <BuildingSection/>
      <Preview/>
      </main>

      </>
    
    )    
}