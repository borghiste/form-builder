import { DateField } from '@mui/x-date-pickers/DateField';
import InputLabel from '@mui/material/InputLabel';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function Dateinput(){
    return(
        <>
        <InputLabel> datalabel</InputLabel>
     <LocalizationProvider dateAdapter={AdapterDayjs}>
      
      <DateField label="data field"/>
  
      </LocalizationProvider> 
        </>
    )
}