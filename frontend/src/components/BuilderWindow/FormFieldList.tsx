import React, { useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";


import {
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Card,
  CardContent,
  Grid,
  Paper,
  Button
} from "@mui/material";

//COMPONENTS
import DraggableCard from "../UI/DraggableCard";
import { useSelector } from "react-redux";

//REDUX
import { selectForm } from "../../features/formSlice";

import { useDispatch } from "react-redux";
import {setFields} from "../../features/formSlice";

import React, { useState } from "react";
import {
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Card,
  CardContent,
  Grid,
  Paper,
  Button,
  Typography,
} from "@mui/material";

// COMPONENTS
import DraggableCard from "../UI/DraggableCard";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { selectForm, setFields } from "../../features/formSlice";

export default function FormFieldList() {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const dispatch = useDispatch();
  const form = useSelector(selectForm);
  const fields = form?.fields || [];

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDrop = (index: number) => {
    if (draggedIndex === null) return;

    const newFields = [...fields];
    const [moved] = newFields.splice(draggedIndex, 1);
    newFields.splice(index, 0, moved);

    dispatch(setFields(newFields));
    setDraggedIndex(null);
  };

  return (
    <Box>
      
      
      <Typography fontWeight="bold">Current fields on form</Typography>

      {fields.map((field, index) => (
        <DraggableCard
          key={field.id}
          index={index}
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(index)}
          field={field}
        />
      ))}

      {/* empty space to drop item */}
      <Box
        sx={{
          height: 40,
          border: "2px dashed lightgray",
          borderRadius: 1,
          textAlign: "center",
          lineHeight: "40px",
          color: "gray",
          fontSize: 14,
          mt: 1,
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop(fields.length)}
      >
        Drag and drop field here to change order
      </Box>
    </Box>
  );
}

