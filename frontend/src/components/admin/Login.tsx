import * as React from 'react';
import { FormControl, Typography, FormLabel, Input, Button, Link, Card, Box  } from '@mui/material';

import TextInput from '../UI/TextInput';
import SimpleButton from '../UI/SimpleButton';


export default function Login(){

    return(

        <Box sx={{height:'100vh', bgcolor:'background.default', display:'flex', flexDirection:'column', justifyContent:'center', justifyItems:'center', alignItems:'center'}}>

                <Typography component={'h3'} variant='h3' sx={{paddingBottom:'5rem', color:'text.primary'}}>
                    Login
                </Typography>
        <Card className='flex flex-col  justify-between items-center '  sx={{bgcolor:'gray.main', padding:'0.6rem'}} >

            <Typography component={'p'} sx={{textJustify:'auto', textAlign:'center', paddingBottom:9, fontStyle:'bold', fontSize:18}}>
                Login to your account to view the list of forms aviable

            </Typography>
            <TextInput label={'email'} placeholder={'insert email'}/>

           
            <TextInput label={'password'} placeholder={'password'}/>

            <SimpleButton text={'login'} color={'cyan.main'} textColor={'white'} size={'medium'} width={'14rem'}/>
        </Card>
        </Box>
    )
}



// export default function Login(props) {
//   return (
//     <Card>
      
     
      
//           <FormControl>
//             <FormLabel>Email</FormLabel>
//             <Input
//               // html input attribute
//               name="email"
//               type="email"
//               placeholder="johndoe@email.com"
//             />
//           </FormControl>
//           <FormControl>
//             <FormLabel>Password</FormLabel>
//             <Input
//               // html input attribute
//               name="password"
//               type="password"
//               placeholder="password"
//             />
//           </FormControl>
//           <Button sx={{ mt: 1 /* margin top */ }}>Log in</Button>
      
     
//     </Card>
//   );

