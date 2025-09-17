import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createContext } from "react";
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
import {getForm} from "../features/formSlice";
import { selectForm } from "../features/formSlice";

import { RootState } from "../app/store";
import Modal from '../components/Modal';
import { useState, useContext } from "react";
import { modalContext } from "../App";


export default  function FormsList(){

     const location = useLocation();
     const navigate = useNavigate();
     const dispatch = useDispatch<AppDispatch>();

    const  {forms, error, status, } = useSelector(selectList)
    const User = useSelector(selectUser)
    const {newFormClick,setNewFormClick} = useContext(modalContext); 
    const newFormContext = createContext<any>(null);
   



useEffect(() => {dispatch(fetchformsList())

  

}, [forms])

const [modalOpen, setModalOpen] = useState(false);
const handleModalOpen = () => {setModalOpen(true);}
const handleModalClose = () => { setModalOpen(false);
    setNewFormClick(false)
    
 }


 const handleNewFormisClicked = () => {
    setNewFormClick(true);
    setModalOpen(true);
    
    
  }
  

const handleViewForm = (formId) => {dispatch(getForm(formId));
   
                                    setModalOpen(true);
                                    setNewFormClick (false)
                                    

}




    return(
       

        <>
     


        <Modal modalIsOpen={modalOpen} handleModalClose={handleModalClose} />
        
        
      

<Container disableGutters={true} component={'div'} sx={{minHeight:'100vh'}}>

<List className=' w-full ' sx={{zIndex:0, display:'flex', flexDirection: 'column'}}>

    <ListItem>
        <ListItemText  sx={{font:'bold'}} primary='Form Name'/>
            


        <ListItemText primary='Created time' />
         
        


        <ListItemText className='font-bold ' sx={{font:'bold'}} primary='updated time'/>
       

        { 
         User.role === 'admin' ? <BasicButton text={'+ NEW FORM'} 
         variant={'contained'} 
         color={'gray.light'} 
         textColor={'black'}
         width={200}
         onClick={()=>{handleNewFormisClicked()}}
         /> : null }
                    
    </ListItem>
    <Divider/>

    {forms.map((form)=> {
        
        
        const createdDate = new Date(form.created_at).toISOString().slice(0, 10);
        const updatedDate = new Date(form.updated_at).toISOString().slice(0, 10);
        return(
            <div key={form.id}>
        <ListItem >
<ListItemText>{form.name}</ListItemText>

<ListItemText primary={createdDate}/>
          
     

        <ListItemText primary={updatedDate}/>
        
      
        <Box sx={{display:'flex'}}>
        
        <BasicButton text={'view'} color={'cyan.dark'} textColor={'white'}
                        onClick={()=>{handleViewForm(form.id)}}/>

        { User.role == 'admin' ? (
            <>
         <BasicButton text={'edit'}/>
        <BasicButton text={'delete'} color={'magenta.dark'} textColor={'black'} />
            </>
        ) : null
    }
        </Box>
       
       

 
</ListItem>
    </div>

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

    
