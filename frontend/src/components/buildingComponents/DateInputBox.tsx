// MUI components

import { Button, InputLabel, Switch, Box } from "@mui/material";
import DateRangeIcon from '@mui/icons-material/DateRange';


//custom components

import SimpleButton from "../UI/SimpleButton";

import { addDateInput } from '../../features/form/formDateInputSlice';
import { useDispatch } from "react-redux";


// contain the component that allows user to add date input fields to the form and its logic
export default function DateinputBox(){
    const dispatch = useDispatch();
    return(

<Box className={'border-1'}>
    <div className="flex text-xl">

<InputLabel sx={{color:'black'}}>label name:</InputLabel>
<input type="text" className="h-5"/>
    </div>

    <div className="flex text-xl">

<InputLabel sx={{color:'black'}}>value:</InputLabel>
<input type="text"/>
    </div>
    <div className="flex text-xl">

<InputLabel sx={{color:'black'}}>min:</InputLabel>
<input type="date" className="text-sm"/>
    </div><div className="flex text-xl">

<InputLabel sx={{color:'black'}}>max:</InputLabel>
<input type="date" className="text-sm" />
    </div>

    <div className="flex items-center">

<InputLabel sx={{color:'black'}}>REQUIRED FIELD
</InputLabel>
<Switch/>
</div>

<SimpleButton text={'ADD DATE FIELD'} color={'grey'} startIcon={<DateRangeIcon/>} onClick={()=>{dispatch(addDateInput())}} />
   



</Box>



    //     <p>
    //     date costructor:
    //     label
    //     value
    //     min
    //     max 

   
    //         </p>
    // 
    )
}