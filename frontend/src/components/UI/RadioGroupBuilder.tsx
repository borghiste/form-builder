import { InputLabel, Box, Button, TextField, ListItem, List, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import React from "react";
export default function RadioGroupBuilder(){
    return(
        <>
        <Typography>insert options</Typography>
     <List>
        <ListItem sx={{display:'flex', alignItems:'center', justifyContent:'center'}}>
            <TextField variant="standard" size="small" sx={{fontSize:20}}/>
            <Button> 
                <AddIcon fontSize="small" sx={{fontSize:20, p:0}}/>
            </Button>
        </ListItem>
     </List>
        
        </>
    )
}