'use client'

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, PersonStandingIcon } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod"

const formShame = z.object({
    email: z.string().email(),
    accountType: z.enum(["personal","company"]),
    companyName: z.string().optional(),
    numberOfEmployees: z.coerce.number().optional(),
    birthday: z.date().refine((data)=>{
        const today = new Date()
        const eighteenYearsAge = new Date(
            today.getFullYear()-18,
            today.getMonth(),
            today.getDate()
        )
        return data <= eighteenYearsAge
    },"You must be at least 18 years old")
}).superRefine((data,ctx)=>{
    if(data.accountType === "company" && !data.companyName ){
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["companyName"],
            message: "Company Name is required"
        })
    }
    if(data.accountType === "company" && (!data.numberOfEmployees || data.numberOfEmployees < 1) ){
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["numberOfEmployees"],
            message: "Employees Number is required"
        })
    }
})

export default function SignupPage(){

    const form = useForm<z.infer<typeof formShame>>({
        resolver: zodResolver(formShame),
        defaultValues:{
            email:""
        }
    })

    const accountType = form.watch("accountType");

    const birthdayFromDate = new Date()
    birthdayFromDate.setFullYear(birthdayFromDate.getFullYear() - 120);

    function handleSubmit() {
        console.log("Log in successful");
    }


    return(
        <>
        <PersonStandingIcon size={50}></PersonStandingIcon>
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Sign up</CardTitle>
                <CardDescription>Sign up for a new SupportMe account</CardDescription>
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
                                <FormMessage></FormMessage>
                            </FormItem>
                        )}
                    >
                    </FormField>
                    <FormField
                        control={form.control} name="accountType" render={({field})=>(
                            <FormItem>
                                <FormLabel>Account Type</FormLabel>
                                <Select onValueChange={field.onChange}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select an account type"></SelectValue>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="personal">personal</SelectItem>
                                        <SelectItem value="company">company</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage></FormMessage>
                            </FormItem>
                        )}
                    >
                    </FormField>
                    {accountType === "company" && 
                    <>
                        <FormField 
                        control={form.control} name="companyName" render={({field})=>(
                            <FormItem>
                                <FormLabel>Company Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="CompanyName" {...field}></Input>
                                </FormControl>
                                <FormMessage></FormMessage>
                            </FormItem>
                        )}
                        >
                        </FormField>
                        <FormField 
                        control={form.control} name="numberOfEmployees" render={({field})=>(
                            <FormItem>
                                <FormLabel>Employees</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Employees" {...field}></Input>
                                </FormControl>
                                <FormMessage></FormMessage>
                            </FormItem>
                        )}
                        >
                        </FormField>
                    </>
                    }
                    <FormField 
                    control={form.control} name="birthday" render={({field})=>(
                        <FormItem className="flex flex-col">
                            <FormLabel>Date Of Birthday</FormLabel>
                            <Popover >
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button variant="outline" className="normal-case justify-between pr-1.5">
                                            {!!field.value ? format(field.value,"PPP") : <span>Pick a date</span>}
                                            <CalendarIcon></CalendarIcon>
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent align="start" className="w-full">
                                    <Calendar 
                                    mode="single" 
                                    defaultMonth={field.value} 
                                    selected={field.value} 
                                    onSelect={field.onChange}
                                    fixedWeeks
                                    weekStartsOn={1}
                                    fromDate={birthdayFromDate}
                                    toDate={new Date()}
                                    captionLayout="dropdown-buttons"
                                    >

                                    </Calendar>
                                </PopoverContent>
                            </Popover>
                            <FormMessage></FormMessage>
                        </FormItem>
                    )}
                    >
                    </FormField>
                    <Button type="submit">
                        Sign up
                    </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="justify-between">
                <small>Already have an account?</small>
                <Button asChild variant="outline" size="sm">
                    <Link href="/login">Login</Link>
                </Button>
            </CardFooter>
        </Card>
        </>

    )
}