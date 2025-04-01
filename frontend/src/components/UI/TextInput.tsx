import  InputLabel  from "@mui/material/InputLabel";
import  TextField  from "@mui/material/TextField";
export default function TextInput({label}){
    return(
        <>
        <InputLabel className='text-sm '>{label}</InputLabel>
<TextField size='medium' slotProps={{htmlInput:{maxLength:3}}} label='label placeholder'/>
        </>
    )
}