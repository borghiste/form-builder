import React, { useEffect } from "react";
import { useState } from "react";
//COMPONENTS
import BasicButton from './UI/BasicButton';
//REDUX
import {createNewForm} from '../features/formsListSlice';
import { useDispatch, useSelector } from "react-redux";
import { selectList } from "../features/formsListSlice";
import { selectForm } from '../features/formSlice';
import { selectStatus } from "../features/formSlice";

import {
  TextField,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { RootState } from "../app/store";


export default function FormView() {

  const dispatch = useDispatch();

  const form = useSelector(selectForm);
  const status = useSelector(selectStatus)
  
  
  

  
  

   const  handleAddNewForm = async (e) => {
    e.preventDefault()
    await dispatch(createNewForm({name:Form.name}))
  }



  return (


  <>
  <Box sx={{position:'relative'

  }}>

<p>{form.name}</p>
{console.log('fields',form.fields)}
  </Box>
 



  </>

  )
}
