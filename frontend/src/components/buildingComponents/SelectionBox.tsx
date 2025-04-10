//MUI COMPONENTS
import { Box, InputLabel, Switch } from "@mui/material";
import ListIcon from '@mui/icons-material/List';

// custom componemts
import SimpleButton from "../UI/SimpleButton";
export default function SelectionBox(){
    return(
            <Box className={'border-1'}>
                <label for="label name" className="text-xl">Label Name:
                    <input type="text" className="h-5"/>
                </label>

            <div className="flex items-center">

                <InputLabel sx={{color:'black'}}>REQUIRED FIELD
                </InputLabel>
                <Switch  onChange={()=>{setisRequired(!isRequired)}}/>
            </div>

            <SimpleButton text={' add selection'} color={'grey'} onClick={()=>{dispatch(addTextInput({id: nanoid(),
                label: InputLabelRef.current.value,
                length: maxLengthRef.current.value,
                required: isRequired
}))}}           startIcon={<ListIcon/>}/>


            label/name
            required
            size
            options
        </Box>
    )
}