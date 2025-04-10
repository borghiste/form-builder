

import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import EditIcon from '@mui/icons-material/Inbox';

import { Container, InputLabel, TableContainer } from '@mui/material';
import SimpleButton from './UI/SimpleButton';


  

export default function formsList(){

    const forms =[ {name: 'form1',
        fields: 5},

         {name: 'form2',
            fields: 5},

            {name: 'form3',
                fields: 5}
            ]

    return(
<Container disableGutters className='absolute '>

<List>
    <ListItem className='font-bold flex'>
        <ListItemText className='font-bold' sx={{font:'bold', color:'black'}}>
           Form Name  
        </ListItemText>
       
        <SimpleButton text={'new form'} color={'white'}/>
    </ListItem>
    <Divider/>

    {forms.map((form)=> (
<ListItem>
<ListItemText>{form.name}</ListItemText>
        
        <SimpleButton text={'edit'} color={'white'}  />
        <SimpleButton text={'delete'} color={'red'} />
</ListItem>


    )
    )
    }
<Divider/>
</List>

</Container>


  )
}

    
