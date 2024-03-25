"use client"
import { Output } from "valibot";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useCountries } from "@/hooks/use-Countries";
import { type SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { InputMask, EmailInputMask } from "@/components/InputMask";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { CircleX, Phone, LoaderCircle } from "lucide-react";
import { checkoutFormSchema } from "@/schemas";

type CheckoutFormValues = Output<typeof checkoutFormSchema>;

export default function CheckoutForm() {
    const form = useForm<CheckoutFormValues>({
        mode: 'onTouched',
        resolver: valibotResolver(checkoutFormSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumbers: [{value: ''}],
            countryCode: '',
            address: '',
            cardNumber: '',
            ccv2: '',
            isTermsAccepted: false,
        }
    });

    const { fields, remove, append } = useFieldArray({
        name: "phoneNumbers",
        control: form.control,
    });

    const { data: countryCodes } = useCountries();

    const handleCheckout: SubmitHandler<CheckoutFormValues> = async (data, event) => {
        event?.preventDefault();
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(data);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCheckout) as () => void}>
                <h3 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl my-3">Checkout Form</h3>
                <p className="mb-8 text-slate-500">Your email adress, phone numbres and other personal information will not be published. Required fields are marked *</p>
                <Separator />
                <section className="relative">
                    <h4 className="sticky top-0 text-lg font-semibold my-4 bg-white">Personal Information</h4>
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem className="mb-4">
                                <FormLabel>First Name *</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="First Name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem className="mb-4">
                                <FormLabel>Last Name *</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Last Name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </section>
                <Separator />
                <section className="relative">
                    <h4 className="sticky top-0 text-lg font-semibold my-4 bg-white">Contract Information</h4>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="mb-4">
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <EmailInputMask
                                        placeholder="Email"
                                        value={field.value}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormLabel className="block mb-2">Phone Numbers *</FormLabel>
                    {fields.map((phoneField, index) => (
                        <div className="flex gap-2 mb-4" key={phoneField.id}>
                            <FormItem className="grow">
                                <FormControl>
                                    <Input
                                        placeholder="Phone Number"
                                        {...form.register(`phoneNumbers.${index}.value`)}
                                    />
                                    </FormControl>
                                    <FormMessage>{form.formState.errors?.phoneNumbers?.[index]?.value?.message}</FormMessage>
                            </FormItem>
                            <Button 
                                size="icon"
                                type="button"
                                variant="outline"
                                onClick={() => remove(index)}
                            >
                                <CircleX className="h-4 w-4"/>
                            </Button>
                        </div>
                    ))}
                    <Button 
                        type="button"
                        variant="secondary"
                        onClick={() => append({value: ''})}
                        disabled={fields.length >= 3}
                        className="mb-4 disabled:hidden"
                    >
                        <span>Add</span>
                        <Phone className="ml-2 h-4 w-4" />
                    </Button>
                    <FormField
                        control={form.control}
                        name="countryCode"
                        render={({ field }) => (
                            <FormItem className="mb-4">
                                <FormLabel>Country *</FormLabel>
                                <FormControl>
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Country"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {countryCodes?.map((country) => (
                                                <SelectItem key={country.code} value={country.code}>
                                                    {country.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem className="mb-4">
                                <FormLabel>Address *</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Address"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </section>
                <Separator />
                <section className="relative">
                    <h4 className="sticky top-0 text-lg font-semibold my-4 bg-white">Payment Details</h4>
                    <div className="flex gap-2 mb-4">
                        <FormField
                            control={form.control}
                            name="cardNumber"
                            render={({ field }) => (
                                <FormItem className="grow">
                                    <FormControl>
                                        <InputMask
                                            placeholder="Card Number *"
                                            value={field.value}
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                            mask={[/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="ccv2"
                            render={({ field }) => (
                                <FormItem className="w-32">
                                    <FormControl>
                                        <InputMask
                                            placeholder="CCV2 *"
                                            value={field.value}
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                            mask={[/\d/, /\d/, /\d/]}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="isTermsAccepted"
                        render={({ field }) => (
                            <FormItem className="mb-4">
                                <FormControl>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="terms"
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                        <label
                                            htmlFor="terms"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Accept terms and conditions *
                                        </label>
                                    </div>          
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </section>
                <Button 
                    type="submit"
                    className="mt-8 w-32 flex ml-auto"
                    disabled={form.formState.isSubmitting}
                >
                    {form.formState.isSubmitting ? <LoaderCircle  className="animate-spin" /> : 'Submit'}
                </Button>
            </form>
        </Form>
    )
}