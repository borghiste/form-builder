import React, {useState} from "react";

//MUI
import { Box, ButtonGroup, TextField } from "@mui/material";

//COMPONENTS
import ValidationsOptionsDrawer from "./ValidationsOptionsDrawer";
import SideBar from './SideBar';
import FormView from "../FormView";

import BasicButton from "../UI/BasicButton";
import FormPreview from "../FormPreview";



//REDUX
import { selectForm } from "../../features/formSlice";
import { useSelector, useDispatch } from "react-redux";
import FormFieldList from '../BuilderWindow/FormFieldList';
import {createForm, setFormName, setFields} from "../../features/formSlice";
import { AppDispatch } from "../../app/store";

export default function BuilderSection(){

    const [validationsDrawer, setValidationsDrawer] = useState(false)
    const form = useSelector(selectForm);
   
    const dispatch = useDispatch<AppDispatch>();
    
    const handleSaveForm = () => {
        dispatch(setFields(form.fields))
        
        if (!form) return;

       
        dispatch(createForm(form));
    }


 
    return(
        <>
        <Box sx={{display:'flex', 
                position:'relative',
                minWidth:'100%',
                justifyContent:'center', alignItems:'start', 
                flexDirection:{xs:'column', sm: 'row'}, 
                overflow:'hidden'}}>


        {/* form fields options */}

        <SideBar setValidationsDrawer={setValidationsDrawer}/>
       

       {/* <FormFieldsSection fields={form?.fields}/> */}
       <TextField onChange={(e) => {dispatch(setFormName(e.target.value)); console.log(form.name)}}/>
       <FormFieldList/>
       
       
 

        <ValidationsOptionsDrawer openDrawer={validationsDrawer} setOpenDrawer={setValidationsDrawer}/>

        </Box>
        <ButtonGroup>
            <BasicButton text={'save'} 
            onClick={() => {handleSaveForm()}}/>
            <BasicButton text={'cancel'} />

        </ButtonGroup>
                    </>
    )
}