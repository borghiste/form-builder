import * as React from 'react';
// MUI



import {  TextField, Typography, MenuItem, Select, InputLabel, FormControl, ListItem, ListItemText, List } from '@mui/material';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import AddBoxIcon from '@mui/icons-material/AddBox';

import { useState } from 'react';

import SimpleButton from '../../UI/SimpleButton';

import { DateField } from '@mui/x-date-pickers/DateField';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function AddFieldsPanel(){

  const types = ['text', 'number'];

  const [ selectedType ,setSelectedType] = useState('');
  return(
    <div className="w-full h-full text-gray">
<Typography component={'h4'} sx={{fontSize:30}}>Form Fields</Typography>

<FormControl fullWidth>
  <InputLabel>
    select field type 
  </InputLabel>
  <Select
    label="select type field"
    value={selectedType}
     
    sx={{maxwidth:100}}

    onChange={(e)=> {
      setSelectedType(e.target.value as string)}} fullWidth>
      {
        types.map((type) => ((<MenuItem value={type} key={type}>{type}</MenuItem>)))
      }
  </Select>

  <List>
    <ListItem  
      sx={{display:'flex',           
        justifyContent:'center',
        alignItems:'center', 
        overflow:'clip',
        padding:0}}>
        <ListItemText primary="Label name:" sx={{maxWidth:'6rem', textAlign:'center'}}/>

          <TextField size='small'/>
    </ListItem>
    {/* renders menu items based on type */}
    { 

      selectedType ==='text' && (
        <>

    <ListItem>
      <ListItemText primary="max length:" sx={{maxWidth:'6rem', textAlign:'center'}}/>
      <TextField type='number' size='small'sx={{width:'5rem'}}/>
    </ListItem>
        </>
    )
  }

  {
    selectedType === 'number' && (
      'number'
    )
  }

{
    selectedType === 'number' && (
      'number'
    )
  }

  <ListItem>
    <ListItemText primary="is required?" sx={{maxWidth:'6rem', textAlign:'center'}}/>
    no<Switch/>yes
  </ListItem>
  </List>
  <SimpleButton 
      color={'gray.main'}
      text={'add field'}
      textColor={'text.primary'} 
      startIcon={<AddBoxIcon sx={{bgcolor:'black'}}/>}
     />

</FormControl>
    </div>
  )
}

// export default function AddFieldsPanel() {

//   const types = ['text','number'];

//   const [selectedType, setSelectedType] = useState('')

//   return (
//     <div className="w-full h-full text-gray">
//       <Typography component={'h4'} sx={{fontSize:20}}>Form Fields</Typography>

//      <FormControl fullWidth>
//       <InputLabel>
//       select field type 
//       </InputLabel>
//       <Select
//       label="select type field" 
//       sx={{width:200}}
//       onChange={(e)=> {setSelectedType(e.target.value as string)}}>

//         {
//           types.map((type)=> ( <MenuItem sx={{minWidth:200}}>{type}</MenuItem>))
//         }
//         </Select>
//         </FormControl>


//       <TableContainer>
//         <Table sx={{ minWidth: 260 }} aria-label="field type and properties table">
          
//           <TableHead>
              
//             <TableRow >
//               <TableCell   colSpan={2}>Set the properties for the field</TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
 
//             <TableRow sx={{display:'flex', justifyContent:'center', alignContent:'center', alignItems:'center', }}>

           
             
//               <TableCell size="medium"  sx={{fontSize:14, minWidth:200, display:'flex', 
//               overflow:'hidden',
//                 justifyContent:'center'}}>Label Name:</TableCell>
//               <TableCell >
//                 <TextField label={'insert label name'} size="small" fullWidth sx={{height:5}}/>
//               </TableCell>
//             </TableRow>

//             <TableRow sx={{display:'flex'}}>
//                 <TableCell sx={{display:'flex', justifyContent:'center', alignItems:'center', fontSize:14}}>

//                 max Length:
//                 </TableCell>

//                 <TableCell sx={{minWidth:90, minHeight:20,  display:'flex'}}>
//                     <TextField type='number' sx={{width:90}}  />
//                 </TableCell>
//             </TableRow>

//             <TableRow>
//             <TableCell sx={{ fontSize:14}} >
//                 is Required:
//             </TableCell>
           
//             <TableCell>
//                 no<Switch/>yes
//             </TableCell>
//             </TableRow>
        
//         <TableRow>
//             <TableCell>min Value:</TableCell>
//             <TableCell>
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
      
//       <DateField label="date field" required={true}  format='YYYY-MM-DD'/>
  
//       </LocalizationProvider> 
//             </TableCell>

//         </TableRow>

//           </TableBody>
//         </Table>
//       </TableContainer>

//       <SimpleButton
      
//         text={' Add field'}
//         color={'gray.main'}
//         textColor={'text.primary'}
//         startIcon={<AddBoxIcon sx={{bgcolor:'black'}} />}
//       />
//     </div>
//   );
// }
