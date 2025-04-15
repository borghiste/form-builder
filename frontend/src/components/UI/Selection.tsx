import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { useState } from "react";
import { FormControl } from "@mui/material";

export default function Slection({ label, id, items, onChange }) {
  const [selected, setSelected] = useState("");



  return (
    <FormControl className="w-full">
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        value={selected}
        label={label}
        onChange={onChange}
       
      >
        {items?.map((option) => (
          <MenuItem value={option} key={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
