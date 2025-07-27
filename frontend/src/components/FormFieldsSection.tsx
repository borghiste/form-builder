import { Typography, Box, Button } from "@mui/material";
import React from "react";
import LabeledTextField from "./UI/LabeledTextField";
import DeleteButton from "./UI/DeleteButton";
import EditButton from "./UI/EditButton";
export default function FormFieldsSection({addFieldAction}) {
    return (
        <>
            <Typography variant="h6">
                Form Fields
            </Typography>

            <Box sx={{display:'flex', justifyContent:'space-between',
            alignItems:'center'
            }}>

        <LabeledTextField labelName={'form name'}             placeholder={'insert form name'}/>
        <EditButton variant={''}
                    size={'small'}
                    color={'background.default'}
                    onClick={() => { console.log('log')}}/>
            </Box>
        
        
            <Box sx={{display:'flex', justifyContent:'space-between',
            alignItems:'center'
            }}>


        <LabeledTextField labelName={'form description'} placeholder={'insert brief description'}/>
        <EditButton variant={''}
                    size={'small'}
                    color={'background.default'}
                    onClick={() => { console.log('log')}}/>

        
        </Box>
        <Button onClick={addFieldAction}> + add field</Button>
        </>
    )
}