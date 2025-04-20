import {Box} from '@mui/material';
export default function Layout({children}){

    return(
        <Box   sx={{ height:'100svh'}}>
        <header/>
        {children}
        <footer/>
        </Box>
    )
}