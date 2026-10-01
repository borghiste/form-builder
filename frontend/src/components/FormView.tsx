import React, { useState } from "react";
//COMPONENTS
import BasicButton from './UI/BasicButton';
//REDUX
import { useDispatch, useSelector } from "react-redux";
import {useAuthStore, useFormListStore} from '../stores/index';

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
  ButtonGroup
} from "@mui/material";

interface Field {
  id: string;
  name: string;
  type: string;
  label: string;
  required?: boolean;
  options?: string[];
}

type FormFieldRecord = {
  id: string | number;
  name?: string;
  type: string;
  label: string;
  required?: boolean;
  options?: string[];
  [key: string]: any;
};

type RenderProps = {
  name?: string;
  label?: string;
  value?: any;
  onChange?: (event: any) => void;
  disabled?: boolean;
  required?: boolean;
  options?: string[];
  fullWidth?: boolean;
};

const renderedComponent: Record<string, (props: RenderProps) => React.ReactNode> = {
  text: (props: RenderProps) => <TextField type="text" {...props} />,
  textarea: (props: RenderProps) => (
    <TextField
      multiline
      rows={4}
      {...props}
    />
  ),
  email: (props: RenderProps) => <TextField type="email" {...props} />,
  number: (props: RenderProps) => <TextField type="number" {...props} />,
  phone: (props: RenderProps) => <TextField type="tel" {...props} />,
  password: (props: RenderProps) => <TextField type="password" {...props} />,
  date: (props: RenderProps) => <TextField type="date" InputLabelProps={{ shrink: true }} {...props} />,
  time: (props: RenderProps) => <TextField type="time" InputLabelProps={{ shrink: true }} {...props} />,
  selectList: (props: RenderProps) => (
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
  checkbox: (props: RenderProps) => (
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
  ),
};

export default function FormView({ disabledFields, entries }: { disabledFields?: boolean; entries?: any }) {
  const { selectedForm } = useFormListStore();
  const userName = useAuthStore((state) => state.user as { name?: string } | null)?.name ?? '';
  const [entryData, setEntryData] = useState({ form_fields: entries || {} });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setEntryData((prev) => ({
      ...prev,
      form_fields: {
        name: userName,
        ...prev.form_fields,
        [name]: type === 'checkbox' ? checked : value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('submit entry', { entryData, form_id: selectedForm?.id });
  };

  const handleReset = () => {
    setEntryData({ form_fields: entries || {} });
  };

  return (
    <Paper
      sx={{
        p: 4,
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.default',
        width: { xs: '50vw', sm: '100%', md: '50vw' },
        overflowY: 'auto',
       
      }}
      elevation={3}
    >
      <Box>
        <Typography variant="h5" component="h1" gutterBottom>
          {selectedForm?.name}
        </Typography>
        <Typography>
          {selectedForm?.description || 'No description provided.'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={1} sx={{ display: 'flex', flexDirection: 'column' }}>
            {selectedForm?.form_fields?.map((field: any) => {
              const Component = renderedComponent[field.type] ?? renderedComponent.text;
              return (
                <Grid key={String(field.id)}>
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
            <ButtonGroup sx={{ mt: 2, mb: 2, display: 'flex', justifyContent: 'space-between' }}>

              <BasicButton
                text={'submit'}
                type={'submit'}
                color={'cyan.main'}
                textColor={'white'}
                />
            
            {/* reset button */}
            
              <BasicButton
                text={'reset'}
                variant={'outlined'}
                onClick={handleReset}
                type={'button'}
                />
                </ButtonGroup>
            
          </Grid>
        </Box>
      </Box>
    </Paper>
  );
}