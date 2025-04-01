import React from "react";
import { TextField } from "@mui/material";
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete'


export default function DeleteButton({onClick}){

    
    
    return(
    <div className="">

        
  <Chip label='delete'
        size='small' 
        className='w-15' 
        color="warning"
        variant="outlined"
        onClick={onClick}/>
        <DeleteIcon color="error"/>
    </div>
)
}