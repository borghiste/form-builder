import React, {useState} from "react";

//MUI
import { Box, ButtonGroup } from "@mui/material";

//COMPONENTS
import RightSideDrawer from './RightSideDrawer';
import LeftSideBar from '../components/LeftSideBar';
import FormView from "./FormView";
import FormFieldsSection from "./FormFieldsSection";
import BasicButton from "./UI/BasicButton";

//REDUX
import { selectForm } from "../features/formSlice";
import { useSelector } from "react-redux";

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

        <LeftSideBar setValidationsDrawer={setValidationsDrawer}/>

       <FormFieldsSection fields={form?.fields}/>
 

        <RightSideDrawer openDrawer={validationsDrawer} setOpenDrawer={setValidationsDrawer}/>

        </Box>
        <ButtonGroup>
            <BasicButton text={'save'} />
            <BasicButton text={'cancel'} />

        </ButtonGroup>
                    </>
    )
}