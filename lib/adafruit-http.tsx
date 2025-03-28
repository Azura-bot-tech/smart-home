const AIO_USERNAME = process.env.NEXT_PUBLIC_ADAFRUIT_USERNAME;
const AIO_KEY = process.env.NEXT_PUBLIC_ADAFRUIT_KEY;
const BASE_URL = `https://io.adafruit.com/api/v2/${AIO_USERNAME}`;

async function fetchFromAdafruit(endpoint: string, options?: RequestInit) {
    const url = `${BASE_URL}${endpoint}`;
  
    const res = await fetch(url, {
    headers: {
      "X-AIO-Key": AIO_KEY!,
      "Content-Type": "application/json",
    },
    cache: 'no-store',
    ...options,
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Adafruit error response:", text);
    throw new Error(`Failed: ${res.statusText}`);
  }
  return res.json();
}

export async function getFeedData(feedKey: string) {
  return await fetchFromAdafruit(`/feeds/${feedKey}/data`);
}

export async function sendFeedValue(feedKey: string, value: string) {
  return await fetchFromAdafruit(`/feeds/${feedKey}/data`, {
    method: "POST",
    body: JSON.stringify({ value }),
  });
}