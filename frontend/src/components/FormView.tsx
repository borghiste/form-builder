import React, { useEffect } from "react";
import { useState } from "react";
//COMPONENTS
import BasicButton from './UI/BasicButton';
//REDUX

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
  
  

  return (


  <>
  <Box component={'form'}>
    <p>test</p>


<p>{form.name}</p>

  </Box>
 



  </>

  )
}
