import React, { useEffect } from "react";
import { useState } from "react";
//COMPONENTS
import BasicButton from '../components/UI/BasicButton';
//REDUX
import {createNewForm} from '../features/formsListSlice';
import { useDispatch, useSelector } from "react-redux";
import { selectList } from "../features/formsListSlice";
import {selectForm} from '../features/formSlice';

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


export default function FormPreview() {

  const dispatch = useDispatch();

  const {form, error, status} = useSelector(selectForm);

  useEffect(() => {

    console.log(form)
  }, [form])
  
  

   const  handleAddNewForm = async (e) => {
    e.preventDefault()
    await dispatch(createNewForm({name:Form.name}))
  }

  // const [form, setForm] = useState({
  //   name: "",
  //   description: ""
  // });

  // const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  // ) => {
  //   const { name, value } = e.target as HTMLInputElement;
  //   setForm((prev) => ({ ...prev, [name]: value }));
  // };

  // const validate = () => {
  //   let newErrors: { [key: string]: string } = {};
  //   if (!form.name) newErrors.name = "Name is required";
  //   if (!form.email) newErrors.email = "Email is required";
  //   else if (!/\S+@\S+\.\S+/.test(form.email))
  //     newErrors.email = "Invalid email format";
  //   if (!form.role) newErrors.role = "Please select a role";
  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  
    
 

  return (


  <></>

  )
}
