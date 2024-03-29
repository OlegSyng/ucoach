import { maxLength, minLength, object, string } from "valibot";

const registerCoachSchema = object({
    username: string([
        minLength(1, 'Username is required'),
        maxLength(20, 'Username is too long'),
    ]),
    password: string([
        minLength(1, 'Password is required'),
        minLength(8, 'Password must be at least 8 characters long'),
        maxLength(20, 'Password is too long'),
        cus
    ]),
    email: string(),
    firstName: string(),
    lastName: string(),
});