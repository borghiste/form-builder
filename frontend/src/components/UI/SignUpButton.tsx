import React from "react";
import BasicButton from "../UI/BasicButton";


export default function SignUpButton({size}) {
    return(
        <BasicButton
          text={'Sign Up'} 
          color={'cyan.main'}
          size={size}
          textColor={'white'}
          href={'/signup'} 
          
      />
    );
}