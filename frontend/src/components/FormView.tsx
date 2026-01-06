import React, { useState } from "react";
//COMPONENTS
import BasicButton from './UI/BasicButton';
//REDUX
import { useDispatch, useSelector } from "react-redux";
import { submitNewEntry } from '../features/FormEntriesSlice';
import { selectForm } from '../features/formSlice';
import { selectUser } from "../features/UserSlice";
import {
  TextField,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Grid,
  FormControlLabel,
  Checkbox,
  TextareaAutosize
} from "@mui/material";

interface Field {
  id: string;
  name: string;
  type: string;
  label: string;
  required?: boolean;
  options?: string[];
}

const renderedComponent = {
  text: (props) => <TextField type="text" {...props} />,
  textarea: (props) => (
    <TextField
      multiline
      rows={4}
      {...props}
    />
  ),
  email: (props) => <TextField type="email" {...props} />,
  number: (props) => <TextField type="number" {...props} />,
  phone: (props) => <TextField type="tel" {...props} />,
  password: (props) => <TextField type="password" {...props} />,
  date: (props) => <TextField type="date" InputLabelProps={{ shrink: true }} {...props} />,
  time: (props) => <TextField type="time" InputLabelProps={{ shrink: true }} {...props} />,
  selectList: (props) => (
    <FormControl fullWidth>
      <InputLabel id={`${props.name}-label`}>{props.label}</InputLabel>
      <Select
        labelId={`${props.name}-label`}
        id={props.name}
        name={props.name}
        value={props.value || ''}
        label={props.label}
        onChange={props.onChange}
        disabled={props.disabled}
        required={props.required}
      >
        {props.options?.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  ),
  checkbox: (props) => (
    <FormControlLabel
      control={
        <Checkbox
          name={props.name}
          checked={props.value || false}
          onChange={props.onChange}
          disabled={props.disabled}
          required={props.required}
        />
      }
      label={props.label}
    />
  )
};

export default function FormView({ disabledFields, entries }) {
  const dispatch = useDispatch();
  const form = useSelector(selectForm);
  const user = useSelector(selectUser);
  const [entryData, setEntryData] = useState({form_fields: entries || {} });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEntryData(prev => ({
      ...prev,
      
      form_fields: {name: user.name,
        ...prev.form_fields,
        [name]: type === 'checkbox' ? checked : value
      }
    }));
    console.log('user.name', user.name);

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitNewEntry({ entryData, form_id: form.id }));
  };

  const handleReset = () => {
    setFormData({ form_fields: entries || {} });
  };

  return (
    <Paper
      sx={{
        p: 4,
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.default'
      }}
      elevation={3}
    >
      <Box>
        <Typography variant="h5" component="h1" gutterBottom>
          {form?.name}
        </Typography>
        <Typography>
          {form?.description || 'No description provided.'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column' }}>
            {form?.form_fields?.map((field) => {
              const Component = renderedComponent[field.type];
              return (
                <Grid item key={field.id}>
                  <Component
                    label={field.label}
                    name={field.name || field.id}
                    value={entryData.form_fields[field.name || field.id] || ''}
                    onChange={handleChange}
                    disabled={disabledFields}
                    required={field.required}
                    options={field.options}
                    fullWidth
                  />
                </Grid>
              );
            })}
            {/* submit button */}
            <Grid item>
              <BasicButton
                text={'submit'}
                type={'submit'}
                color={'cyan.main'}
                textColor={'white'}
              />
            </Grid>
            {/* reset button */}
            <Grid item>
              <BasicButton
                text={'reset'}
                variant={'outlined'}
                onClick={handleReset}
                type={'button'}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Paper>
  );
}