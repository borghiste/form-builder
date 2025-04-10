import React, { useState } from 'react';
import { useRef } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// MUI components
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
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

import DeleteButton from './UI/DeleteButton';
import Selection from '../components/UI/Selection';
import RadioGroupComponent from './UI/RadioGroupComponent';
import TextInput from './UI/TextInput';
import EditIcon from '@mui/icons-material/Edit';
import Dateinput from '../components/UI/Dateinput';


// text reducers
import {removeTextInput, selectTextInputFields} from '../features/form/formTextInputSlice';
import {selectDateInputFields} from '../features/form/formDateInputSlice';

// date reducers

 import {removeDateInput } from '../features/form/formDateInputSlice';

import {useSelector, useDispatch} from 'react-redux';

export default function Preview(){


      //  SET FORM TITLE STATES
      const titleRef = useRef('');


      //SET THE PREVIEW VALUE OF THE FORM TITLE INPUT
      const [titleForm, titleFormisSet] = useState(false);

      const [titleFormValue, setTitleFormValue ] = useState('')



       const TextInputFields = useSelector(selectTextInputFields);
       const DateinputFields = useSelector(selectDateInputFields);

     
      const dispatch = useDispatch();




      const textFields =  TextInputFields.map((el)=>(
            <Box key={el.id}>

<TextInput  label={el.label} length={el.length}  required={el.required} />
<DeleteButton onClick={()=>{dispatch(removeTextInput(el))}}/>
     </Box>
      ))

      const dateFields = DateinputFields.map((el, index)=> (
            <Box key={el.id} className={'my-3'}>
                  <Dateinput label={el.label} required={el.required} minDate={el.minDate}/>
                  <DeleteButton onClick={()=> {dispatch(removeDateInput(el))}}/>
            </Box>
      )
      )


      const fields =  [...(textFields || []), ...(dateFields || [])];


      // handle  form title
            // function handleTitleForm(e){
                
            //       setTitleFormValue(titleRef.current.value)
                  
            // if(e === 'Enter'){
            //       titleFormisSet(!titleForm)
            // }
            // }

     
    return(

        <>
       <Box>
       
       <FormControl className='flex flex-col justify-between' onSubmit={(e)=>{e.preventDefault()}} >
    
      


 
  
<fieldset className=' bg-white border-2 flex flex-col w-full '>

  
  


      {/* {titleForm && titleRef.current.value ? <Box>
      <h3 className='text-3xl'>{titleRef.current.value}</h3>   

                  <Button onClick={()=>{titleFormisSet(!titleForm)}}>

             <EditIcon/> 
                  </Button>
      </Box> :   <TextField inputRef={titleRef} type='text' onKeyDown={(e)=>{handleTitleForm(e.key)}} defaultValue={titleFormValue}/>

  } */}

   
        




      {/* TEXT FIELDS */}

{fields}
       {/* {
             TextInputFields.map((el)=>(
                   <Box key={el.id}>

      <TextInput  label={el.label} length={el.length}  required={el.required} />
      <DeleteButton onClick={()=>{dispatch(removeTextInput(el))}}/>
            </Box>
      ))
      
} */}
      {/* DATE FIELDS */}
      {/* {

      DateinputFields.map((el, index)=> (
            <Box key={el.id} className={'my-3'}>
                  <Dateinput label={el.label} required={el.required} minDate={el.minDate}/>
                  <DeleteButton onClick={()=> {dispatch(removeDateInput(el))}}/>
            </Box>
      )
      )
      } */}









  
  



      
      {/* <Selection/>

      <InputLabel >label</InputLabel>
    





<RadioGroupComponent/>


  <InputLabel>label</InputLabel>
  <FormControlLabel value="other" control={<Radio />} label="radio" />
  <TextareaAutosize

  aria-label="minimum height"
  minRows={3}
  maxRows={5}
  placeholder="Minimum 3 rows"
  style={{ width: 200 }}
/> */}


      </fieldset>
<Button type='submit' size='large'>Save</Button>
      </FormControl>
     


</Box>
        </>
    )
}