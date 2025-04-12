"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

// UI ELEM
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import FormField from '@/components/FormField';
import { Label } from '@/components/ui/label';
import { useRouter } from "next/navigation"


const authFormSchema = (type) => {
    return z.object({
        name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
        email: z.string().email(),
        password: z.string().min(3)
    })
}

function Authform({ type }) {
    const router = useRouter()
    const isSignIn = type === "sign-in";
    const formSchema = authFormSchema(type)
    //  Define the schema
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        },
    });

    // Define a submit handler.
    function onSubmit(values) {
        try {
            if (type === "sign-up") {
                toast.success("Account created successfully. please sign in!")
                router.push("/sign-in")
            } else {
                toast.success("Account sign in successful")
                router.push("/")
            }
        } catch (error) {
            console.log(error)
            toast.error("There was an error", error)
        }
    }
    return (
        <div className="card-border lg:min-w-[566px]">
            <div className="flex flex-col gap-6 card py-14 px-10">
                <div className="flex flex-row gap-2 justify-center">
                    <Image src={"/logo.svg"} alt="logo" height={32} width={38} />
                    <h2 className="text-primary-100">Switch</h2>
                </div>
                <h3>Practice job interview with AI</h3>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-4 form space-y-8">
                        {!isSignIn &&
                            <FormField
                                control={form.control}
                                name="name"
                                label={"Name"}
                                placeholder="your Name"
                            />
                        }
                        <FormField
                            control={form.control}
                            name="email"
                            label={"Email"}
                            placeholder="your Email Address"
                            type="email"
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            label={"Password"}
                            type="password"
                        />
                        <Button type="submit" className="btn">{isSignIn ? "Sign in" : "Create an Account"}</Button>
                    </form>
                </Form>
                <p className="text-center">
                    {isSignIn ? "No account yet?" : "Have an account already?"}
                    <Link href={!isSignIn ? "/sign-in" : "/sign-up"} className="font-bold text-user-primary ml-1" >{!isSignIn ? "Sign in" : "Sign up"}</Link>
                </p>
            </div>
        </div>
    )
}

export default Authform
