"use client"
import { Output, email, safeParse, string } from "valibot";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useCountries } from "@/hooks/use-Countries";
import { type SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { InputMask } from "@/components/InputMask";
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
        control: form.control,
        name: "phoneNumbers",
    });

    const { data: countryCodes } = useCountries();

    const handleCheckout: SubmitHandler<CheckoutFormValues> = (data) => {
        console.log(data);

        // form.reset();
    } 

    function maskEmail(userInput: string): (string | RegExp)[] {
        // Regular expression for email validation and formatting
        const emailRegex = /^([a-zA-Z0-9._-]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,6})$/;
        const userInputArray = userInput.split('');

        if (!userInputArray.includes('@')) {
            return userInputArray.map(() => /^([a-zA-Z0-9._-]+)/g);
        }

      
        // Check if the input matches the email regex
        if (emailRegex.test(userInput)) {
          // If the input is a valid email address, return the formatted email
          const parts = userInput.split('@');
          const username = parts[0].replace(/./g, '*'); // Replace all characters in username with *
          const domain = parts[1]; // Keep the domain unchanged
          return [`${username}@${domain}`];
        } else {
          // If the input is not a valid email address, return an empty string or handle the error as needed
          
          return userInput.split('').map(() => /./g);
        }
      }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCheckout) as () => void}>
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Checkout Form</h3>
                <p className="mb-8 text-slate-500">Your email adress will not be published. Required fields are marked *</p>
                <Separator />
                <section>
                    <h4 className="text-lg font-semibold my-4">Personal Information</h4>
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem className="mb-4">
                                <FormLabel>First Name</FormLabel>
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
                                <FormLabel>Last Name</FormLabel>
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
                <section>
                    <h4 className="text-lg font-semibold my-4">Contract Information</h4>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="mb-4">
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <InputMask
                                        placeholder="Email"
                                        value={field.value}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        // mask={[/[a-zA-Z0-9._%+-]+/, '@', /[a-zA-Z0-9.-]+/, '.', /[a-zA-Z]{2,}/]}
                                        mask={maskEmail}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormLabel className="block mb-2">Phone Numbers</FormLabel>
                    {fields.map((phoneField, index) => (   
                        <div className="flex gap-2 mb-4" key={phoneField.id}>
                            <FormItem className="grow">
                                <FormControl>
                                    <Input
                                        placeholder="Phone Number"
                                        {...form.register(`phoneNumbers.${index}.value`)}
                                    />
                                </FormControl>
                                <FormMessage />
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
                                <FormLabel>Country</FormLabel>
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
                                <FormLabel>Address</FormLabel>
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
                <section>
                    <h4 className="text-lg font-semibold my-4">Payment Details</h4>
                    <div className="flex gap-2 mb-4">
                        <FormField
                            control={form.control}
                            name="cardNumber"
                            render={({ field }) => (
                                <FormItem className="grow">
                                    <FormControl>
                                        <InputMask
                                            placeholder="Card Number"
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
                                            placeholder="CCV2"
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
                                        <Checkbox id="terms" checked={field.value} onChange={field.onChange} />
                                        <label
                                            htmlFor="terms"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Accept terms and conditions
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
                    className="mt-8 w-32"
                    disabled={form.formState.isSubmitting}
                >
                    {form.formState.isSubmitting ? <LoaderCircle  className="animate-spin" /> : 'Submit'}
                </Button>
            </form>
        </Form>
    )
}