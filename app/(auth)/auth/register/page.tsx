"use client";
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot"
import { Heading } from "@/ui/components/Heading";
import { Input } from "@/ui/components/inputs"
import { Button } from "@/ui/components/Button";
import { Loading } from "@/ui/components/Loading";
import { PasswordStrength } from "@/ui/partials/PasswordStrength";
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from "@/ui/components/Form";
import { cn } from "@/ui/utils/cn";
import { safeParse } from "valibot";
import { registerUserCoachSchema } from "@/schemas";

const passwordSchema = registerUserCoachSchema.entries.password;

export default function RegisterRoute() {
    const form = useForm({
        mode: "onTouched",
        resolver: valibotResolver(registerUserCoachSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            password: "",
        }
    });

    console.log(form.formState.errors)

    return (
        <>
            <Heading level={4} className="mb-6">Create your Account</Heading>
            <Form {...form}>
                <form>
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Enter your name" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Enter your last name" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" {...field} placeholder="Enter your email" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Create username" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        autoComplete="off"
                                        {...field}
                                        placeholder="Create password"
                                    />
                                </FormControl>
                                <PasswordStrength passwordResult={safeParse(passwordSchema, field.value)} />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-end mt-6">
                        <Button variant={{ intent: "primary" }} type="submit">
                            <span className={cn(false && "opacity-0")}>Sign Up</span>
                            {false && <Loading
                                size={25}
                                wrapperClassName="p-0 inset-0 absolute mix-blend-difference"
                            />}
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    )
}