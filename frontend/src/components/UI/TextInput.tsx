import  InputLabel  from "@mui/material/InputLabel";
import  TextField  from "@mui/material/TextField";
export default function TextInput({label, length, required}){
    return(
        <>

        <InputLabel className='text-sm '>label
        </InputLabel>
        <TextField size='medium' 
        slotProps={{htmlInput:{maxLength:`${length
}`,
required: required ? true : false}}} 
label='label placeholder' className="w-full" variant="outlined"/>

        </>
    )
}