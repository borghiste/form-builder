import  RadioGroup  from "@mui/material/RadioGroup";
import  InputLabel  from "@mui/material/InputLabel";
import  Radio  from "@mui/material/Radio";
import  FormControlLabel  from "@mui/material/FormControlLabel";
import DeleteButton from "./DeleteButton";

export default function RadioGroupComponent(){

    return(
        <>
        <InputLabel >label</InputLabel>
        <RadioGroup
      aria-labelledby="demo-radio-buttons-group-label"
      defaultValue="female"
      name="radio-buttons-group"
      >
      <FormControlLabel value="female" control={<Radio />}  label="Female" >
      <DeleteButton/>
      </FormControlLabel> 
      <FormControlLabel value="male" control={<Radio />} label="Male" />
      <FormControlLabel value="other" control={<Radio />} label="Other" />
    </RadioGroup>
        </>
    )
}