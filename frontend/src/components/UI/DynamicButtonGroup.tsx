import * as React from 'react';
import Button from '@mui/material/Button';
import {ButtonGroup} from '@mui/material';


export default function DynamicButtonGroup({buttonNames}){


    
      return (
        <ButtonGroup variant="contained" aria-label="Basic button group">
      
         {
          buttonNames.map((name) =>(<Button>{name}</Button>))
         }
        </ButtonGroup>
      );
    }
    
