import { NextResponse } from "next/server";
import { sendFeedValue } from "@/lib/adafruit-http";

export async function POST(req: Request) {
  try {
    const { value } = await req.json();
    await sendFeedValue("led", value);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to send LED value" }, { status: 500 });
  }
}