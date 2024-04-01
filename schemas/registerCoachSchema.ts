import { maxLength, minLength, object, string, regex, excludes, email } from "valibot";

const uppercaseRegex = /[A-Z]/;
const lowercaseRegex = /[a-z]/;
const numberRegex = /[0-9]/;
const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

export const passwordSchemaMessage = {
    minLength: 'At least 8 characters',
    lowercase: 'At least 1 lowercase letter',
    uppercase: 'At least 1 uppercase letter',
    number: 'At least 1 number',
    specialChar: 'At least 1 special character',
    excludes: 'Password cannot contain spaces',
    maxLength: 'Password is too long',
};

export const registerUserCoachSchema = object({
    firstName: string([
        minLength(1, 'First name is required'),
        maxLength(50, 'First name is too long'),
    ]),
    lastName: string([
        minLength(1, 'Last name is required'),
        maxLength(50, 'Last name is too long'),
    ]),
    email: string([
        minLength(1, 'Email is required'),
        email('Email is not valid'),
        maxLength(50, 'Email is too long'),
    ]),
    username: string([
        minLength(1, 'Username is required'),
        maxLength(20, 'Username is too long'),
    ]),
    password: string([
        minLength(8, passwordSchemaMessage.minLength),
        regex(lowercaseRegex, passwordSchemaMessage.lowercase),
        regex(uppercaseRegex, passwordSchemaMessage.uppercase),
        regex(numberRegex, passwordSchemaMessage.number),
        regex(specialCharRegex, passwordSchemaMessage.specialChar),
        excludes(' ', passwordSchemaMessage.excludes),
        maxLength(20, passwordSchemaMessage.maxLength),
    ]),
});