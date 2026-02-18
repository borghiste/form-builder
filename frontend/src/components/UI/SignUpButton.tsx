import React from "react";
import BasicButton from "../UI/BasicButton";


export default function SignUpButton() {
    return(
        <BasicButton
          text={'Sign Up'} 
          color={'cyan.main'}
          href={'signup'}
          textColor={'white'} 
          
      />
    );
}