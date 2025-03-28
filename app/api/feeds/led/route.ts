import { NextResponse } from "next/server";
import { getFeedData } from "@/lib/adafruit-http";

export async function GET() {
  try {
    const data = await getFeedData("led");
    const latest = data[0];
    return NextResponse.json(latest);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch LED state" }, { status: 500 });
  }
}