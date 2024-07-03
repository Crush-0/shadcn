import {ReactNode} from "react";
import LightDarkToggle from "@/components/ui/light-dark-toggle";

export default function LoggedOutLayOut({children}:{children:ReactNode}){
    return(
        <>
        <div className="flex flex-col justify-center items-center min-h-screen p-24 gap-2">
            {children}
        </div>
        <LightDarkToggle className="fixed top-[calc(50%-12px)] right-2"></LightDarkToggle>
        </>

    )
}