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
import { InputLabel, MenuItem } from "@mui/material";
import { nanoid } from "@reduxjs/toolkit";






import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
export default function BuildingSection(){

    const dispatch = useDispatch();

    // TEXT FIELD STATES AND REFS
        const InputLabelRef = useRef();

        const maxLengthRef = useRef();

        const[ isRequired, setisRequired] = useState(false);

           //  SET FORM TITLE STATES
      const titleRef = useRef('');


   

       
        
        
        return(
             <div>

<Box sx={{ minWidth: 120, bgcolor:'white' }} >
      <FormControl fullWidth >
        <InputLabel id="demo-simple-select-label">Select Field type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
         
          label="Age"
       
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>

      </FormControl>

      <FormControl className="pt-5" >

        <InputLabel>test</InputLabel>
        <TextField/>
      </FormControl>
    </Box>
    {/* <TextInputBox/> */}
      


 


  


</div>
        )

//             <div className=' w-1/2
//             overflow-hidden  text-5xl flex flex-col border-1'>

//    <div className="flex items-center ">

//    <label  className="text-[1.5rem] font-bold" >Form title:

//    </label>
//    <input type="text" className="h-5 w-20 border-1" />
//    <SimpleButton text={'add title'} color={'grey'}/>
//    </div>



// <br />


//   <TextInputBox/> 
    

// <DateinputBox/>

// <SelectionBox/>


//     {/* <SimpleButton text={'date'} startIcon={<DateRangeIcon/>} />
//     <SimpleButton text={'select'} startIcon={<ArrowDropDownIcon />} />
//     <SimpleButton text={'options'} startIcon={<ListIcon/>}/> */}


    


  


   
//    </div> 
    
 
}