import { NextRequest, NextResponse } from "next/server";
import { safeParse, ValiError } from "valibot";
import { emailSchema } from "@/schemas/checkoutForm.schema";

export async function POST(req: NextRequest) {
    try {
        const result = safeParse(emailSchema, await req.json());

        return NextResponse.json(result);
    } catch (error) {
        if (error instanceof ValiError) {
            return NextResponse.json(error, { status: 400 });
        }
        return NextResponse.error();
    }
}