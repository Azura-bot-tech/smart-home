// app/api/manual-control/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sendFeedValue } from "@/lib/adafruit-http";

export async function POST(req: NextRequest) {
  try {
    const { action } = await req.json();

    if (!["on", "off"].includes(action)) {
      return NextResponse.json({ error: "Invalid action. Use 'on' or 'off'" }, { status: 400 });
    }

    const value = action === "on" ? "70" : "0";
    const result = await sendFeedValue("may-bom", value);

    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error("Manual control error:", error);
    return NextResponse.json({ error: "Failed to control pump" }, { status: 500 });
  }
}
