import React from "react";
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
            {field.type === "text" && (
                <TextField fullWidth label={field.label} size="small"/>
            )}
            {field.type === "email" && (
                <TextField fullWidth type="email" label={field.label} />
            )}
            {field.type === "checkbox" && (
                <FormControlLabel control={<Checkbox />} label={field.label} />
            )}
          </CardContent>
        </Card>
            </>
    )

}