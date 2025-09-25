import React, { useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";


import {
  TextField,
  Checkbox,
  FormControlLabel,
  Card,
  CardContent,
} from "@mui/material";

//COMPONENTS
import DraggableCard from "../UI/DraggableCard";
import { useSelector } from "react-redux";

//REDUX
import { selectForm } from "../../features/formSlice";

import { useDispatch } from "react-redux";
import {setFields} from "../../features/formSlice";

  
  
  export default function FormFieldList() {
    
    const [draggedIndex, setDraggedIndex] = useState(null);
    const dispatch = useDispatch();
    const form = useSelector(selectForm);
    const fields = useSelector(selectForm)?.fields 
    

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDrop = (index) => {
    if (draggedIndex === null) return;

    const newFields = [...fields];
    const [moved] = newFields.splice(draggedIndex, 1);
    newFields.splice(index, 0, moved);


   dispatch(setFields(newFields));
    setDraggedIndex(null);
  };

  return (
    <>

    <div style={{ width: 400 }}>
      <Typography>
        {/* {form.name} */}
      </Typography>

    <Typography>form field list</Typography>
      {fields.map((field, index) => (
        <DraggableCard
          key={field.id}
          index={index}
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(index)}/>
        //   <Card
        //   key={field.id}
        //   draggable
        //   onDragStart={() => handleDragStart(index)}
        //   onDragOver={(e) => e.preventDefault()}
        //   onDrop={() => handleDrop(index)}
        //   sx={{ mb: 2, cursor: "grab" }}
        //   >
        //   <CardContent>
        //     {field.type === "text" && (
        //         <TextField fullWidth label={field.label} />
        //     )}
        //     {field.type === "email" && (
        //         <TextField fullWidth type="email" label={field.label} />
        //     )}
        //     {field.type === "checkbox" && (
        //         <FormControlLabel control={<Checkbox />} label={field.label} />
        //     )}
        //   </CardContent>
        // </Card>
        
      ))}
    

      {/* Spazio vuoto per droppare in fondo */}
      <div
        style={{
          height: 40,
          border: "2px dashed lightgray",
          borderRadius: 4,
          textAlign: "center",
          lineHeight: "40px",
          color: "gray",
          fontSize: 14,
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop(fields.length)}
      >
        
      </div>
    </div>
      </>
  );
}
