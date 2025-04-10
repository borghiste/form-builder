// // MUI components
// import Switch from '@mui/material/Switch';
// import  Box  from "@mui/material/Box";
// import InputLabel from '@mui/material/InputLabel';
// import EditNoteIcon from '@mui/icons-material/EditNote';

// // customized components

// import SimpleButton from "../UI/SimpleButton";

// //hooks
// import { useDispatch } from "react-redux";
// import { useRef, useState } from 'react';


// // reducers
// import { addTextInput } from "../../features/form/formTextInputSlice";

// import { nanoid } from '@reduxjs/toolkit';

// // contains the component that allows user to add text input fields to the form, its logic and states

// export default function TextInputBox(){

//     const InputLabelRef = useRef();

//     const maxLengthRef = useRef();

//     const[ isRequired, setisRequired] = useState(false);

//     const dispatch = useDispatch();

//     return(
//         <>
//         <Box className={'border-1 w-full  bg-white'}>
//         <InputLabel className='text-sm font-bold'>text field options</label>

//     <div className="flex text-xl b">
//         <InputLabel sx={{color:'black'}} >LABEL NAME:</InputLabel>
//         <input type="text" ref={InputLabelRef} className="h-5"  />
//     </div>
//     <div className="flex  ">

//         <InputLabel className=' text-wrap' sx={{color:'black'}}>MAXIMUM NUMBER OF CHARACTERS:
//         </InputLabel>
//             <input type="number" className="min-w-10 flex h-5 text-sm w-5 border-1" ref={maxLengthRef} />
//     </div>
//     <div className="flex items-center">

//         <InputLabel sx={{color:'black'}}>REQUIRED FIELD
// </InputLabel>
//         <Switch  onChange={()=>{setisRequired(!isRequired)}}/>
//     </div>

//     <SimpleButton text={' add text input'} color={'grey'} onClick={()=>{dispatch(addTextInput({id: nanoid(),
//     label: InputLabelRef.current.value,
//     length: maxLengthRef.current.value,
//     required: isRequired
// }))}}  startIcon={<EditNoteIcon/>}/>
// </Box>
// </>
//     )

// }