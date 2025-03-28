'use client';
import { useMQTT } from "app/(dashboard)/mqtt";

  export default function Page() {
    const data = useMQTT();

    return (
      <div>
        <h1>Adafruit IO</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  }