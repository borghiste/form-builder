import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//MUI
import { Container, List,  ListItem, ListItemText, Divider, Box } from "@mui/material";
//COMPONENTS
import BasicButton from "../components/UI/BasicButton";
//REDUX
import {selectUser} from '../features/UserSlice';
import { AppDispatch } from "../app/store";
import {useSelector, useDispatch} from 'react-redux';
import { fetchformsList } from '../features/formsListSlice';
import { selectList } from "../features/formsListSlice";

import { RootState } from "../app/store";
import FormBuilderModal from '../components/FormBuilderModal';
import { useState } from "react";


export default  function FormsList(){

     const location = useLocation();
     const navigate = useNavigate();
     const dispatch = useDispatch<AppDispatch>();
    const  {forms, error, status, } = useSelector(selectList)
    const User = useSelector(selectUser)

useEffect(() => {dispatch(fetchformsList())

  

}, [forms])

const [modalOpen, setModalOpen] = useState(true);
const handleOpen = () => {setModalOpen(true);
                       
}
const handleClose = () =>{ setModalOpen(false);
                            
}





    return(
        <>
        <FormBuilderModal modalIsOpen={modalOpen}
                    handleModalClose={handleClose}/>
      

<Container disableGutters={true} component={'div'} sx={{minHeight:'100vh'}}>

<List className=' w-full ' sx={{zIndex:0, display:'flex', flexDirection: 'column'}}>

    <ListItem>
        <ListItemText  sx={{font:'bold'}} primary='Form Name'/>
            


        <ListItemText primary='Created time'/>
         
        


        <ListItemText className='font-bold text-light-gray' sx={{font:'bold'}} primary='updated time'/>
       
       
       
        {  User.role ? <BasicButton text={' + NEW FORM'} 
                    variant={'contained'} 
                    color={'gray.light'} 
                    textColor={'black'}
                    width={200}
                    onClick={setModalOpen}
                    /> : null }
                    
    </ListItem>
    <Divider/>

    {forms.map((form)=> {

        const createdDate = new Date(form.created_at).toISOString().slice(0, 10);
        const updatedDate = new Date(form.updated_at).toISOString().slice(0, 10);
       return(
        <ListItem key={form.id}>
<ListItemText>{form.name}</ListItemText>

<ListItemText primary={createdDate}/>
          
     

        <ListItemText primary={updatedDate}/>
        
      
        <Box sx={{display:'flex'}}>
        
        <BasicButton text={'view'} color={'cyan.dark'} textColor={'white'}/>

        { User.role == 'admin'  ? (
            <>
         <BasicButton text={'edit'}   />
        <BasicButton text={'delete'} color={'magenta.dark'} textColor={'black'} />
            </>
        ) : null
        }
        </Box>
       
       
       
        

 
</ListItem>

)
}

)
}
<Divider/>
</List>



</Container>
<Outlet/>

</>

  )
}

    
