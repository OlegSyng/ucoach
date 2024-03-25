import { NextResponse } from "next/server";
import countries from "@/public/assets/counties.json"

export function GET() {
    return NextResponse.json(countries);
}