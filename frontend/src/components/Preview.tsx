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
import {removeTextInput, selectTextInputFields} from '../features/form/formTextInputSlice';

import {useSelector, useDispatch} from 'react-redux';
import { selectDateInputFields } from '../features/form/formDateInputSlice';
export default function Preview(){

       const TextInputFields = useSelector(selectTextInputFields);
       const DateinputFields = useSelector(selectDateInputFields);

     
      const dispatch = useDispatch();
     
    return(
        <>
       <Box>
        <h1 className='text-5xl'>Preview</h1>

     <form className='flex flex-col justify-between' onSubmit={(e)=>{e.preventDefault()}} >
    



 
  
<fieldset className=' bg-white border-2 flex flex-col'>
   <InputLabel>Form title</InputLabel>
  <TextField></TextField>
        <h2 className='text-3xl'>form title</h2> 
       {TextInputFields.map((el)=>(
            <Box key={el}>

      <TextInput  label={el.label} length={el.length}  required={el.required} />
      <DeleteButton onClick={()=>{dispatch(removeTextInput(el))}}/>
            </Box>
      ))
      } 

      {
            DateinputFields.map((el)=>(
                  <Box key={el}>
                        
                        <Dateinput label={el.label} />
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
<Button type='submit' size='large'>Save</Button>
      </form>
     


      </Box>



        </>
    )
}