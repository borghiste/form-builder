import SimpleButton from '../components/UI/SimpleButton';
import { Divider, Switch, Box, Stack } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
export default function Header({mode, setMode}){

    return(
        <>
        <header className="flex justify-end">
    

            <Box component={'div'} display={'flex'} sx={{justifyItems:'center'}} >
            <SimpleButton text={'Log in'} variant={'text'} href={'/admin'}/>
            

            <Box  component={'span'} className='flex'>

            <LightModeIcon sx={{color:`${mode ? 'white': 'cyan.main'}`}}/>

            <Switch onChange={()=>{ setMode(!mode); console.log('log')}} color='primary' />

            <DarkModeIcon color='text.primary' sx={{color: `${mode ? 'white' : ''}`}}/>
            </Box>
        

            </Box>

        </header>
            <Divider/>
        </>
    )
}