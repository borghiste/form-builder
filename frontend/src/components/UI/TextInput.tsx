import  { FormControl, FormLabel }  from "@mui/material";
import  TextField  from "@mui/material/TextField";
export default function TextInput({label, length, required, placeholder}){
    return(
        <>

        <FormControl sx={{bgcolor:'background'}}>


        <FormLabel className='text-sm ' sx={{color:'black'}}>{label}
        </FormLabel >
        <TextField size='medium' 
        slotProps={{htmlInput:{maxLength:`${length
        }`, 
        required: required ? true : false}}} 
        className="w-full" variant="outlined" placeholder={placeholder}/>
        </FormControl>

        </>
    )
}