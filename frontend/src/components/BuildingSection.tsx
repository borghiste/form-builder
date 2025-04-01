import React from "react";
import  Button  from "@mui/material/Button";
import SimpleButton from "./UI/SimpleButton";
import { useDispatch, useSelector } from "react-redux";
import { addTextInput } from "../features/form/formSlice";
import EditNoteIcon from '@mui/icons-material/EditNote';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ListIcon from '@mui/icons-material/List';
export default function BuildingSection(){
    const dispatch = useDispatch();
    return(
    <div className=' 
    overflow-hidden  text-3xl flex flex-col'>
   <h1>building</h1>





 
    
    <SimpleButton text={'text input'} onClick={()=>{dispatch(addTextInput())}}  startIcon={<EditNoteIcon/>}/>
    <SimpleButton text={'date'} startIcon={<DateRangeIcon/>} />
    <SimpleButton text={'select'} startIcon={<ArrowDropDownIcon />} />
    <SimpleButton text={'options'} startIcon={<ListIcon/>}/>


    


  


   
   </div> 
    )
    
}