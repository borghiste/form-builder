import React from "react";
import BasicButton from "../UI/BasicButton";


export default function SignUpButton(props: { text: string; color: string; size: "small" | "medium" | "large"; textColor: string; onClick?: () => void }) {
    return(
        <BasicButton
          text={'Sign Up'} 
          color={'cyan.main'}
          
          textColor={'white'} 
          onClick={() =>{console.log('ggg')} }
      />
    );
}