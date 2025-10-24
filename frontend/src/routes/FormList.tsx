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
import { fetchFormsList, deleteForm, getForm } from '../features/formsListSlice';
import { selectForms } from "../features/formsListSlice";
import Modal from '../components/Modal';
import { useState, useContext } from "react";
import { modalContext } from "../App";
import { setForm } from "../features/formSlice";


export default  function FormsList(){

    

     const dispatch = useDispatch<AppDispatch>();

    const  forms = useSelector(selectForms) //get the form list state from redux
    const User = useSelector(selectUser) //get the user state from redux
    const {newFormClick,setNewFormClick} = useContext(modalContext);  //context to manage if the modal is for new form or view form
    
   



useEffect(() => {dispatch(fetchFormsList()) //fetch the forms list on component mount
    
}
, [forms])

const [modalOpen, setModalOpen] = useState(false); //state to manage modal open/close

const handleModalClose = () => { setModalOpen(false); //function to close the modal
    setNewFormClick(false) //reset the new form click context
    
 }


 const handleNewFormisClicked = () => {
    // 
    setNewFormClick(true);
    setModalOpen(true);
    
    
  }


  const handleViewForm = async (formId) => {

    const selectedForm = await dispatch(getForm(formId)).unwrap();
    console.log('selected form:', selectedForm);
    dispatch(setForm({...selectedForm})); 

       
      setModalOpen(true);
      setNewFormClick(false);
    
    }
  
  

const handleEditForm = (formId) => {
  dispatch(getForm(formId));
                                    setModalOpen(true);
                                    setNewFormClick(true);
}



    return(
        <>


        <Modal modalIsOpen={modalOpen} handleModalClose={handleModalClose} />
        
        
      

<Container disableGutters={true} component={'div'} sx={{minHeight:'100vh'}}>

<List className=' w-full' sx={{zIndex:0, display:'flex', flexDirection: 'column'}}>

    <ListItem>
        <ListItemText  sx={{font:'bold'}} primary='Form Name'/>
        <ListItemText primary='Created time' />
         

        <ListItemText className='font-bold' sx={{font:'bold'}} primary='updated time'/>
       
        { 
         User.role === 'admin' ? <BasicButton text={'+ NEW FORM'} 
         variant={'contained'} 
         color={'gray.light'} 
         textColor={'black'}
         width={200}
         onClick={()=>{handleNewFormisClicked()}}
        //   set the modal to create a new form
         /> : null }
                    
    </ListItem>
    <Divider/>

    {forms?.map((form)=> {
    
        const createdDate = new Date(form.created_at).toISOString().slice(0, 10);
        const updatedDate = new Date(form.updated_at).toISOString().slice(0, 10);
        return(
            <div key={form.id}>
        <ListItem>
<ListItemText >{form.name}</ListItemText>

<ListItemText  primary={createdDate}/>
          
     

        <ListItemText primary={updatedDate}/>
        
      
        <Box sx={{display:'flex'}}>
        
        <BasicButton text={'view'} color={'cyan.dark'} textColor={'white'}
                        onClick={()=>{handleViewForm(form.id)}}/>

        { User.role == 'admin' ? (
            <>
         <BasicButton text={'edit'}/>
        <BasicButton text={'delete'}
          onclick={() => {dispatch(deleteForm(form.id))} } 
        color={'magenta.dark'} 
            textColor={'black'}
            onClick={() => {dispatch(deleteForm(form.id))}} 
             />
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

    
