import React, { useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";


import {
  TextField,
  Checkbox,
  FormControlLabel,
  Card,
  CardContent,
} from "@mui/material";

const initialFields = [
  { id: "1", type: "text", label: "Nome" },
  { id: "2", type: "email", label: "Email" },
  { id: "3", type: "checkbox", label: "Accetto i termini" },
];

export default function FormFieldList() {
  const [fields, setFields] = useState(initialFields);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDrop = (index) => {
    if (draggedIndex === null) return;

    const newFields = [...fields];
    const [moved] = newFields.splice(draggedIndex, 1);
    newFields.splice(index, 0, moved);

    setFields(newFields);
    setDraggedIndex(null);
  };

  return (
    <>

    <div style={{ width: 400 }}>
    <Typography>form field list</Typography>
      {fields.map((field, index) => (
          <Card
          key={field.id}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(index)}
          sx={{ mb: 2, cursor: "grab" }}
          >
          <CardContent>
            {field.type === "text" && (
                <TextField fullWidth label={field.label} />
            )}
            {field.type === "email" && (
                <TextField fullWidth type="email" label={field.label} />
            )}
            {field.type === "checkbox" && (
                <FormControlLabel control={<Checkbox />} label={field.label} />
            )}
          </CardContent>
        </Card>
        
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
        Drop qui per ultimo
      </div>
    </div>
      </>
  );
}
