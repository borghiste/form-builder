import React, { useRef, useState } from "react";
import  Button  from "@mui/material/Button";

// customized components

import SimpleButton from "./UI/SimpleButton";
import TextInputBox from "./buildingComponents/TextInputBox";
import DateinputBox from "./buildingComponents/DateInputBox";
import SelectionBox from "./buildingComponents/SelectionBox";
import { useDispatch, useSelector } from "react-redux";
import { addTextInput } from "../features/form/formTextInputSlice";

import EditNoteIcon from '@mui/icons-material/EditNote';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ListIcon from '@mui/icons-material/List';
import  Box  from "@mui/material/Box";

import  TextField  from "@mui/material/TextField";

import Switch from '@mui/material/Switch';
import { InputLabel } from "@mui/material";
import { nanoid } from "@reduxjs/toolkit";

export default function BuildingSection(){

    const dispatch = useDispatch();

    // TEXT FIELD STATES AND REFS
        const InputLabelRef = useRef();

        const maxLengthRef = useRef();

        const[ isRequired, setisRequired] = useState(false);

        // DATE FIELDS STATES AND REFS

       
        
        
        return(
            <div className=' w-1/2
            overflow-hidden  text-5xl flex flex-col'>
   <h1>building</h1>



  <TextInputBox/> 
    

<DateinputBox/>

<SelectionBox/>


    {/* <SimpleButton text={'date'} startIcon={<DateRangeIcon/>} />
    <SimpleButton text={'select'} startIcon={<ArrowDropDownIcon />} />
    <SimpleButton text={'options'} startIcon={<ListIcon/>}/> */}


    


  


   
   </div> 
    )
    
}