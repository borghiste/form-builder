import {Box} from '@mui/material';
export default function Layout({children}){

    return(
        <Box   sx={{bgcolor: 'background.default', height:'100svh'}}>
        <header/>
        {children}
        <footer/>
        </Box>
    )
}