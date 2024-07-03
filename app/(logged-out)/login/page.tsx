'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { PersonStandingIcon } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod"

const formShame = z.object({
    email: z.string().email(),
    password: z.string()
})

export default function LoginPage(){

    const form = useForm<z.infer<typeof formShame>>({
        resolver: zodResolver(formShame),
        defaultValues:{
            email:"",
            password:""
        }
    })

    function handleSubmit() {
        console.log("Log in successful");
    }


    return(
        <>
        <PersonStandingIcon size={50}></PersonStandingIcon>
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Log in</CardTitle>
                <CardDescription>Log in to you SupportMe account</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(handleSubmit)}>
                    <FormField 
                        control={form.control} name="email" render={({field})=>(
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="XXX@outlook.com" type="email" {...field}></Input>
                                </FormControl>
                                <FormDescription>
                                    This is the email address you sighed up to SupportMe with
                                </FormDescription>
                                <FormMessage></FormMessage>
                            </FormItem>
                        )}
                    >
                    </FormField>
                    <FormField 
                        control={form.control} name="password" render={({field})=>(
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Password" type="password" {...field}></Input>
                                </FormControl>
                                <FormMessage></FormMessage>
                            </FormItem>
                        )}
                    >
                    </FormField>
                    <Button type="submit">
                        LogIn
                    </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="justify-between">
                <small>Don't have an account?</small>
                <Button asChild variant="outline" size="sm">
                    <Link href="/signup">Sign up</Link>
                </Button>
            </CardFooter>
        </Card>
        </>

    )
}