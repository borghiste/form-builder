import React, {useState} from "react";

//MUI
import { Box, ButtonGroup } from "@mui/material";

//COMPONENTS
import ValidationsOptionsDrawer from "./ValidationsOptionsDrawer";
import SideBar from './SideBar';
import FormView from "../FormView";

import BasicButton from "../UI/BasicButton";
import FormPreview from "../FormPreview";



//REDUX
import { selectForm } from "../../features/formSlice";
import { useSelector } from "react-redux";
import FormFieldList from '../BuilderWindow/FormFieldList';
export default function BuilderSection(){

    const [validationsDrawer, setValidationsDrawer] = useState(false)
    const form = useSelector(selectForm);


 
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
       <FormFieldList/>
       
       
 

        <ValidationsOptionsDrawer openDrawer={validationsDrawer} setOpenDrawer={setValidationsDrawer}/>

        </Box>
        <ButtonGroup>
            <BasicButton text={'save'} />
            <BasicButton text={'cancel'} />

        </ButtonGroup>
                    </>
    )
}