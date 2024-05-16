import { enum_ } from "valibot";

enum MessageCode {
    Success = 1,
    Failure = 0
}

const messageCode = enum_(MessageCode, 'Invalid Message Code');

type QueryParams<TSort extends string> = Partial<{
    page: number,
    count: number,
    sort: `${TSort}:asc` | `${TSort}:desc`
}>

export { MessageCode, messageCode, type QueryParams }