import { NextResponse } from "next/server";
import countries from "@/assets/counties.json"

export function GET() {
    return NextResponse.json(countries);
}