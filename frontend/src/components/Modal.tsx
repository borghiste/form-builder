import Preview from "./Preview";
import BuildingSection from "./BuildingSection";
import { Box } from "@mui/material";
import { useState } from "react";
export default function Modal(){

    const [isOpen, setisOpen] = useState(false)

    return(
        <>
        <div className="flex flex-col sm:flex-row  justify-center  items-center  border-4 h-full z-10   fixed w-full overflow-auto bg-gray-700/50  ">
                
        <BuildingSection /> 
        <Preview/>
       {/* <Preview/> */}
        </div>
        </>
    )
}