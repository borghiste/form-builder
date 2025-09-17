import { Typography, Box, Button, FormControl } from "@mui/material";
import React from "react";
//UI
import LabeledTextField from "./UI/LabeledTextField";
import DeleteButton from "./UI/DeleteButton";
import EditButton from "./UI/EditButton";
import BlockField from '../components/UI/BlockField';
//REDUX
import { useSelector } from "react-redux";
import { selectForm } from "../features/formSlice";

export default function FormFieldsSection() {

    const form = useSelector(selectForm);
    const fields = form?.fields;
    return (
        <>
       <Box sx={{display:'flex', flexDirection:'column'}}>
      
       

        {fields?.map((field, index) => (
            <BlockField key={index} field={field}/>
        ))}
       
       </Box>
        </>
    )
}