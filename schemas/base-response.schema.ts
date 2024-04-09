import { enum_ } from "valibot";

export enum MessageCodeEnum {
    Success = 1,
    Failure = 0
}

export const MessageCode = enum_(MessageCodeEnum, 'Invalid Message Code');