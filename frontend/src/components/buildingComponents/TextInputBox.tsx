// MUI components
import Switch from '@mui/material/Switch';
import  Box  from "@mui/material/Box";
import { InputLabel } from "@mui/material";
import EditNoteIcon from '@mui/icons-material/EditNote';

// customized components

import SimpleButton from "../UI/SimpleButton";

//hooks
import { useDispatch } from "react-redux";


// reducers
import { addTextInput } from "../../features/form/formTextInputSlice";

import { nanoid } from '@reduxjs/toolkit';

// contain the component that allows user to add text input fields to the form and its logic

export default function TextInputBox({isRequired, setisRequired, InputLabelRef, maxLengthRef}){

    const dispatch = useDispatch();

    return(
        <>
        <h3>text section</h3>
        <Box className={'border-1 '}>

    <div className="flex text-xl ">
        <InputLabel sx={{color:'black'}} >LABEL NAME:</InputLabel>
        <input type="text" ref={InputLabelRef} className="h-5"  />
    </div>
    <div className="flex  ">

        <InputLabel className='min-w-20' sx={{color:'black'}}>MAX LENGTH ( NUMBER OF CHARACTERS):
        </InputLabel>
            <input type="number" className="min-w-10 flex h-5 text-sm w-5 border-1" ref={maxLengthRef} />
    </div>
    <div className="flex items-center">

        <InputLabel sx={{color:'black'}}>REQUIRED FIELD
</InputLabel>
        <Switch  onChange={()=>{setisRequired(!isRequired)}}/>
    </div>

    <SimpleButton text={' add text input'} color={'grey'} onClick={()=>{dispatch(addTextInput({id: nanoid(),
    label: InputLabelRef.current.value,
    length: maxLengthRef.current.value,
    required: isRequired
}))}}  startIcon={<EditNoteIcon/>}/>
</Box>
</>
    )

}