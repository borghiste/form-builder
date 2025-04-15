import * as React from 'react';
// MUI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import AddBoxIcon from '@mui/icons-material/AddBox';

import { useState } from 'react';
import Selection from '../../UI/Selection';
import SimpleButton from '../../UI/SimpleButton';
import { TextField, Typography } from '@mui/material';

import { DateField } from '@mui/x-date-pickers/DateField';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
export default function AddFieldsSection() {
  const types = ['text','number'];

  const [selectedType, setSelectedType] = useState()

  return (
    <div className="w-full h-full text-gray">
      <Typography component={'h4'} sx={{fontSize:20}}>Form Fields</Typography>
      <Selection label={'select field type'} items={types} 
      onChange={(e)=>{setSelectedType(e.target.value as string)}}/>

      <TableContainer>
        <Table sx={{ minWidth: 260 }} aria-label="field type and properties table">
          
          <TableHead>
              
            <TableRow >
              <TableCell   colSpan={2}>Set the properties for the field</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
           
              
            <TableRow>

           
             
              <TableCell size="small">Label Name:</TableCell>
              <TableCell align="center">
                <TextField label={'insert label name'} size="small" fullWidth />
              </TableCell>
            </TableRow>

            <TableRow>
                <TableCell>

                max Length:
                </TableCell>

                <TableCell>
                    <TextField type='number' sx={{width:90}} />
                </TableCell>
            </TableRow>

            <TableRow>
            <TableCell>
                is Required:
            </TableCell>
           
            <TableCell>
                no<Switch/>yes
            </TableCell>
            </TableRow>
        
        <TableRow>
            <TableCell>min Value:</TableCell>
            <TableCell>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
      
      <DateField label="date field" required={true}  format='YYYY-MM-DD'/>
  
      </LocalizationProvider> 
            </TableCell>

        </TableRow>

          </TableBody>
        </Table>
      </TableContainer>

      <SimpleButton
        text={'Add field'}
        color={'#296CF2'}
        startIcon={<AddBoxIcon />}
      />
    </div>
  );
}
