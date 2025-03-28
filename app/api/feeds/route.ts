import { NextResponse } from "next/server";
import { getFeedData } from "@/lib/adafruit-http";

export async function GET() {
  try {
    const [temperature, humidity, light, soil] = await Promise.all([
      getFeedData("nhiet-do"),
      getFeedData("do-am"),
      getFeedData("anh-sang"),
      getFeedData("am-dat"),
    ]);

    const limit = 15;
    const data = [];

    for (let i = 0; i < limit; i++) {
      const item = {
        time: new Date(temperature[i]?.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        temperature: parseFloat(temperature[i]?.value ?? "0"),
        humidity: parseFloat(humidity[i]?.value ?? "0"),
        light: parseFloat(light[i]?.value ?? "0"),
        soil: parseFloat(soil[i]?.value ?? "0"),
      };
      data.push(item);
    }
    data.reverse();

    return NextResponse.json(data);
  } catch (err) {
    console.error("🔥 Error fetching data from Adafruit:", err);
    return NextResponse.json({ error: "Failed to fetch feed data" }, { status: 500 });
  }
}
