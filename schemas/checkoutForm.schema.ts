import { string, stringAsync, length, object, objectAsync, customAsync, minLength, boolean, array, maxLength, custom, regex, Output, SafeParseResult, email } from 'valibot'

function validateCreditCardNumber(cardNumber: string): boolean { // Luhn algorithm
    const cardNumberDigitsOnly = cardNumber.replace(/\D/g, ''); // Remove all non-digit characters
    const digits = cardNumberDigitsOnly.split('').map(Number);  // Convert string to array of digits
    const reversedDigits = digits.reverse(); // Reverse the array

    let sum = 0;
    for (let i = 0; i < reversedDigits.length; i++) {
        let digit = reversedDigits[i];
       
        if (i % 2 === 1) {  // Double every second digit
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        
        sum += digit;
    }
    
    // The number is valid if the sum is a multiple of 10
    return sum % 10 === 0;
}

export const emailSchema = object({
    email: string([email('Email must be valid')])
})

async function validateEmail(email: string): Promise<boolean> {
    const url = process.env.NEXT_PUBLIC_BASE_URL + '/api/data/validation'
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    });
    const data = await response.json() as SafeParseResult<typeof emailSchema>;
    return data.success
}

export const checkoutFormSchema = objectAsync({
    firstName: string('First name is required', [
        minLength(2, 'First name must be at least 2 characters long'),
    ]),
    lastName: string('Last name is required', [
        minLength(2, 'Last name must be at least 2 characters long'),
    ]),
    email: stringAsync([
        customAsync(validateEmail, 'Email must be valid')
        // email('Email must be valid'), // Make backend handle email validation, for a good measure its good to have it here on frontend too
    ]),
    phoneNumbers: array(object({
        value: string('Please enter a valid phone number', [
            minLength(10, 'Phone number must be at least 10 characters long'),
            maxLength(15, 'Phone number must be at most 15 characters long'),
            regex(/^\d+$/, 'Phone number must contain only digits'), // Only digits are allowed
        ])
    }), [
        minLength(1, 'At least one phone number is required'),
        maxLength(3, 'At most 3 phone numbers are allowed'),
    ]),
    countryCode: string('Country code is required'),
    address: string('Address is required'),
    cardNumber: string('Credit card number is required', [
        regex(/^\d+$/, 'Credit card number must contain only digits'), // Only digits are allowed
        length(16, 'Credit card number must be 16 characters long'),
        custom(validateCreditCardNumber, 'Credit card has to be of a valid number'), // Implement Luhn algorithm to validate credit card number
    ]),
    ccv2: string('CCV2 is required', [
        regex(/^\d+$/, 'CCV2 must contain only digits'), // Only digits are allowed
        length(3, 'CCV2 must be 3 characters long'),
    ]),
    isTermsAccepted: boolean('Terms must be accepted', [
        custom((value) => value === true, 'Terms must be accepted'),
    ]),
});

const country = object({
    code: string(),
    name: string(),
})

export type Country = Output<typeof country>