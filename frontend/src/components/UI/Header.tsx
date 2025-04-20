import { Box, Switch } from "@mui/material";

import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function Header(){

    return(
        <>
          <header className="flex justify-end">
    

    <Box component={'div'} display={'flex'} sx={{justifyItems:'center'}} >
    <Button text={'Log in'} variant={'text'} href={'/admin'}/>
    

    <Box  component={'span'} className='flex'>

    <LightModeIcon />

    <Switch />

    <DarkModeIcon />
    </Box>


    </Box>

</header>
    <Divider/>
        </>
    )
}