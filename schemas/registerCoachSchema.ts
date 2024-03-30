import { maxLength, minLength, object, string, regex, excludes, email } from "valibot";

const uppercaseRegex = /[A-Z]/;
const lowercaseRegex = /[a-z]/;
const numberRegex = /[0-9]/;
const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

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
        minLength(1, 'No1 - Password is required'),
        minLength(8, 'No1 - Password must be at least 8 characters long'),
        regex(lowercaseRegex, 'No2 - Password must contain at least one lowercase letter'),
        regex(uppercaseRegex, 'No3 - Password must contain at least one uppercase letter'),
        regex(numberRegex, 'No4 - Password must contain at least one number'),
        regex(specialCharRegex, 'No5 - Password must contain at least one special character'),
        excludes(' ', 'Password cannot contain spaces'),
        maxLength(20, 'Password is too long'),
    ]),
});