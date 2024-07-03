import { Button } from "@/components/ui/button";
import { PersonStandingIcon } from "lucide-react";
import Link from "next/link";

export default function LandingPage(){
    return(
        <>
            <h1 className="flex items-center gap-2"><PersonStandingIcon size={50} className="text-pink-500"/>SupportMe</h1>
            <p>This is a new world</p>
            <div className="flex gap-3 uppercase items-center">
            <Button asChild>
                <Link href="/login">Log in</Link>
            </Button>
            <Button asChild variant="outline">
                <Link href="/signup">sign up</Link>
            </Button>
            </div>
        </>
    )
}