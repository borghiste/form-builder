import React from 'react';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateField } from '@mui/x-date-pickers/DateField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Button, FormControl, TextField } from '@mui/material';
import Input from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import TextareaAutosize from '@mui/material/TextareaAutosize';
 import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Chip from '@mui/material/Chip';
import DeleteButton from './UI/DeleteButton';
import Selection from '../components/UI/Selection';
import RadioGroupComponent from './UI/RadioGroupComponent';
import TextInput from './UI/TextInput';
import Dateinput from './UI/Dateinput';
import {removeTextInput, selectField} from '../features/form/formSlice';
import {useSelector, useDispatch} from 'react-redux';
export default function Preview(){

      const field = useSelector(selectField);
      const dispatch = useDispatch();
     
    return(
        <>
       <Box>

    <form className='flex flex-col justify-between' onSubmit={(e)=>e.preventDefault()}>




 
  
<fieldset className=' bg-white border-2 flex flex-col'>
  {/* <InputLabel>Form title</InputLabel>
  <TextField></TextField>
        <h2 className='text-3xl'>form title</h2> */}
      {field.map((el)=>(
            <Box key={el}>

      <TextInput  label={el.label}/>
      <DeleteButton onClick={()=>{dispatch(removeTextInput(el))}}/>
            </Box>
      ))
      }
  



      
      <Selection/>

      <InputLabel >label</InputLabel>
    


<Box display={'flex'}>


<RadioGroupComponent/>
<DeleteButton/>
</Box>
  <Dateinput/>  




  <InputLabel>label</InputLabel>
  <FormControlLabel value="other" control={<Radio />} label="radio" />
  <TextareaAutosize

  aria-label="minimum height"
  minRows={3}
  maxRows={5}
  placeholder="Minimum 3 rows"
  style={{ width: 200 }}
/>


      </fieldset>
      </form>
     
<Button type='submit' size='large'>Save</Button>


      </Box>



        </>
    )
}