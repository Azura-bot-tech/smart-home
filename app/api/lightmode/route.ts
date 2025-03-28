import { NextResponse } from "next/server";
import { sendFeedValue } from "@/lib/adafruit-http";

export async function POST(req: Request) {
  try {
    const { value } = await req.json();
    await sendFeedValue("modeled", value);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to send light mode" }, { status: 500 });
  }
}
