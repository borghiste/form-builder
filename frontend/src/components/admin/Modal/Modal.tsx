

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { useState } from "react";
import Preview from "./Preview";
import AddFieldsPanel from "./AddFieldsPanel";
import SimpleButton from "../../UI/SimpleButton";


export default function Modal(){

  

    return(
        <>

    {/* modal wrapper */}
        <div className="flex flex-col  w-full z-20 h-full inset-0 justify-center  items-center  border-4   bg-light-gray/25   ">
                

         <h3 className='text-3xl'>edit forms</h3>
        
       
        <Divider/>
     
    
    
  
      
  

      <Stack direction="col" spacing={2} alignItems="center" className=' flex flex-col sm:flex-row overflow-clip ' >
  
    <AddFieldsPanel/>
  

  <Divider orientation="vertical" flexItem  />


    
    <Preview/>
  
</Stack>
<div className='flex justify-end'>
<SimpleButton text={'cancel'} variant={'outlined'} textColor={'black'}/>
<SimpleButton text={'save'}  textColor={'white'}/>

</div>

   
  
        </div>
   
  
        
        
        </>
    )
}