import React from "react";
import BasicButton from "../UI/BasicButton";
//MUI
import {
    TextField,
    Checkbox,
    FormControlLabel,
    Card,
    CardContent,
  } from "@mui/material";
  //REDUX
import { useSelector } from "react-redux";
import {selectField} from "../../features/FieldSlice";
import { selectForm } from "../../features/formSlice";


export default function DraggableCard({onDragStart, 
onDrop, 
index, 
handleDragStart, 
handleDrop,
onDragOver}) {

    const field = useSelector(selectForm)?.fields[index];
    
    return(
        <>

<Card
     key={field.id}
     draggable
     onDragStart={onDragStart}
     onDragOver={onDragOver}
     onDrop={onDrop}
     sx={{ mb: 2, cursor: "grab" }}
     >
          <CardContent>
            { ["text", "number", "email", "telephone"].includes(field.type) && (
                <TextField fullWidth type={field.type} label={field.label} size="small"/>
            )}
            {field.type === "button" && (
                <BasicButton variant="contained" size="small" text={field.label}/>
            )}

            {/* {field.type === "email" && (
                <TextField fullWidth type="email" label={field.label} />
            )}
            {field.type === "number" && (
                <TextField fullWidth type="number" label={field.label} /> */}
            {/* )} */}
            {field.type === "checkbox" && (
                <FormControlLabel control={<Checkbox />} label={field.label} />
            )}
          </CardContent>
        </Card>
            </>
    )

}