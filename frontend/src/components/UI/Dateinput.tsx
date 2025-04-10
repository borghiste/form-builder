import { DateField } from '@mui/x-date-pickers/DateField';
import InputLabel from '@mui/material/InputLabel';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function Dateinput({label, required, minDate, maxDate}){
    return(
        <>
        <InputLabel> {label}</InputLabel>
     <LocalizationProvider dateAdapter={AdapterDayjs}>
      
      <DateField label="date field" required={required} minDate={minDate} maxDate={maxDate} format='YYYY-MM-DD'/>
  
      </LocalizationProvider> 
        </>
    )
}