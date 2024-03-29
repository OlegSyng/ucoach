"use client";
import { useForm } from "react-hook-form";
import { Heading } from "@/ui/components/Heading";
import { Form } from "@/ui/components/Form";

export default function RegisterRoute() {
    const form = useForm();

    return (
        <>
            <Heading level={4} className="mb-6">
                Create your Account
            </Heading>
            <Form {...form}>
                <form></form>
            </Form>
        </>
    )
}