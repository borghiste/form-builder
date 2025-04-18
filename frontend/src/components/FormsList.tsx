

import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';

import ListItemText from '@mui/material/ListItemText';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SimpleButton from './UI/SimpleButton';

// MUI
import { Container, InputLabel, TableContainer } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';




  

export default function FormsList(){
     
    



    const forms =[ {name: 'form name1',
        fields: 5},

         {name: 'form2',
            fields: 5},

            {name: 'form3',
                fields: 5},
            {name:'form4'}
            ]

    return(
        <>
      

<Container disableGutters={true} component={'div'} className='h-full'>

<List className=' w-full ' sx={{zIndex:10}}>
    <ListItem>
        <ListItemText  sx={{font:'bold', display:'flex', justifyContent:'center'}} primary='Form Name'/>
            


        <ListItemText className='font-bold' sx={{font:'bold', display:'flex', justifyContent:'center'}} primary='Created time'/>
         
        


        <ListItemText className='font-bold text-light-gray' sx={{font:'bold', display:'flex', justifyContent:'center'}} primary='updated time'/>
       
       
        <SimpleButton text={' + NEW FORM'} variant={'contained'} color={'gray.light'} textColor={'black'}/>
    </ListItem>
    <Divider/>

    {forms.map((form)=> (
        <ListItem key={form.name}className='w-full '>
<ListItemText sx={{display:'flex', justifyContent:'center'}}>{form.name}</ListItemText>

<ListItemText className='font-bold' sx={{font:'bold', display:'flex', justifyContent:'center'}} primary='yyyy-mm-dd'/>
          
     

        <ListItemText primary='yyyy-mm-dd' sx={{display:'flex', justifyContent:'center'}}/>
        
        
        <Box sx={{display:'flex', justifyContent:'center'}}>
         <SimpleButton text={'edit'} color={''}  />
        <SimpleButton text={'delete'} color={'magenta.dark'} textColor={'black'} />   
        </Box>
       
 
</ListItem>


)
)
}
<Divider/>
</List>


<Outlet/>

</Container>



</>

  )
}

    
