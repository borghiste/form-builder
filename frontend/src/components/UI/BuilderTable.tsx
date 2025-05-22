import React, { useRef, useState } from "react";
import { Stack, List, ListItem, ListItemIcon, TextField, Radio, InputLabel, Switch, Typography } from "@mui/material";

// COMPONENTS
import LabeledSelection from "./LabeledSelection";
import BasicButton from "./BasicButton";
import RadioGroupBuilder from "./RadioGroupBuilder";
import { nanoid } from "@reduxjs/toolkit";

// ICONS
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import PinIcon from '@mui/icons-material/Pin';
import LabeledTextField from "./LabeledTextField";
import LabeledInputNumber from "./LabeledInputNumber";

// REDUX
import { addField } from "../../features/formFieldSlice";
import { useDispatch, useSelector } from 'react-redux';
import { selectFormFields } from "../../features/formFieldSlice";
export default function BuilderTable(){
    
    const dispatch = useDispatch();
    const fieldTypes = ['text', 'number', 'email', 'date', 'tel', 'radio button', 'switch button', 'selection'];
   
  
  
   



    
    
    return(
    <>
       
       <Stack sx={{minWidth:'auto'}}>


 
      

       </Stack>
        </>
    )
}