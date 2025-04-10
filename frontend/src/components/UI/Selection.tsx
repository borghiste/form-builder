import  Select  from "@mui/material/Select";

import MenuItem from '@mui/material/MenuItem';
import InputLabel from "@mui/material/InputLabel";
export default function Slection(){

    return(
        <>
        <InputLabel>label</InputLabel>
        <Select labelId='select' fullWidth>
        <MenuItem>item1</MenuItem>
        <MenuItem>item2</MenuItem>
        <MenuItem>item3</MenuItem>

      </Select>
        </>
    )
}