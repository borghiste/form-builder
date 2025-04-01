import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

export default function FormsDrawer() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const forms =[ {name: 'form1',
                fields: 5},

                 {name: 'form2',
                    fields: 5},

                    {name: 'form3',
                        fields: 5}
                    ]

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(!toggleDrawer)}>
      <List>
        <Button>

      <ListItemIcon className='text-6xl'>

      <ArrowCircleLeftIcon/>
  </ListItemIcon>
        </Button>
      </List>
      <Divider />
      <List>
        {forms.map((form) => (
          <ListItem key={form} disablePadding>
            <ListItemButton>
            
              <ListItemText primary={form.name} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem>
            <ListItemButton>
            <ListItemText primary={'+'} className='border-dashed border-2' 
            sx={{display:'flex', justifyContent:'center'}} />

            </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div className='' >
      <Button variant='outlined' onClick={toggleDrawer(true)} className=''>
        <ListItemIcon className='text-6xl'>

        <ArrowCircleRightIcon/>
        </ListItemIcon>
      

      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
