import React from "react";
import { Outlet } from "react-router-dom";
//MUI
import { Container, List,  ListItem, ListItemText, Divider, Box } from "@mui/material";
//COMPONENTS
import BasicButton from "../components/UI/BasicButton";
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
      

<Container disableGutters={true} component={'div'} sx={{minHeight:'100vh'}}>

<List className=' w-full ' sx={{zIndex:10}}>
    <ListItem>
        <ListItemText  sx={{font:'bold', display:'flex', justifyContent:'center'}} primary='Form Name'/>
            


        <ListItemText className='font-bold' sx={{font:'bold', display:'flex', justifyContent:'center'}} primary='Created time'/>
         
        


        <ListItemText className='font-bold text-light-gray' sx={{font:'bold', display:'flex', justifyContent:'center'}} primary='updated time'/>
       
       
        <BasicButton text={' + NEW FORM'} 
                    variant={'contained'} 
                    color={'gray.light'} 
                    textColor={'black'}
                    />
    </ListItem>
    <Divider/>

    {forms.map((form)=> (
        <ListItem key={form.name}className='w-full '>
<ListItemText sx={{display:'flex', justifyContent:'center'}}>{form.name}</ListItemText>

<ListItemText className='font-bold' sx={{font:'bold', display:'flex', justifyContent:'center'}} primary='yyyy-mm-dd'/>
          
     

        <ListItemText primary='yyyy-mm-dd' sx={{display:'flex', justifyContent:'center'}}/>
        
        
        <Box sx={{display:'flex', justifyContent:'center'}}>
         <BasicButton text={'edit'} color={''}  />
        <BasicButton text={'delete'} color={'magenta.dark'} textColor={'black'} />   
        </Box>
       
 
</ListItem>

)

)
}
<Divider/>
</List>



</Container>
<Outlet/>



</>

  )
}

    
