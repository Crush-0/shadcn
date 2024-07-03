'use client'

import { useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";
import { MoonIcon, SunIcon } from "lucide-react";

export default function LightDarkToggle({className}:{className:string}){
    const [isDarkModel,setDarkModel] = useState(true);
    return(
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger 
                className={className}
                onClick={()=>{
                    setDarkModel(old=>!old);
                    document.body.classList.toggle("dark")
                }}
                >
                    {isDarkModel ? <MoonIcon/> : <SunIcon/>}
                </TooltipTrigger>
                <TooltipContent>
                    {isDarkModel ? "Enable Light Model" : "Enable Dark Model"}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}