import { useEffect, useState } from "react";

interface ApiResponse {
  do_am: Array<{
    value: string;
    created_at: string;
  }>;
  nhiet_do: Array<{
    value: string;
    created_at: string;
  }>;
  anh_sang: Array<{
    value: string;
    created_at: string;
  }>;
  am_dat: Array<{
    value: string;
    created_at: string;
  }>;
}

interface PlantData {
  time: string;
  temperature: number;
  humidity: number;
  soil: number;
  light: number;
}

function transformData(apiData: ApiResponse): PlantData[] {
  // Tạo mảng thời gian từ dữ liệu nhiệt độ
  const timestamps = apiData.nhiet_do.map((data) => data.created_at);

  // Tạo mảng dữ liệu cho mỗi loại cảm biến
  const temperatureData = apiData.nhiet_do.map((data) =>
    parseFloat(data.value)
  );
  const humidityData = apiData.do_am.map((data) => parseFloat(data.value));
  const soilData = apiData.am_dat.map((data) => parseFloat(data.value));
  const lightData = apiData.anh_sang.map((data) => parseFloat(data.value));

  // Tìm độ dài tối đa của các mảng dữ liệu
  const maxLength = Math.max(
    timestamps.length,
    temperatureData.length,
    humidityData.length,
    soilData.length,
    lightData.length
  );

  // Tạo mảng kết quả với tất cả dữ liệu
  const result: PlantData[] = [];
  for (let i = 0; i < maxLength; i++) {
    const timestamp = timestamps[i] || new Date().toISOString();
    const date = new Date(timestamp);
    result.push({
      time: date.toLocaleString("en-US", {
        hour12: true,
        timeZone: "Asia/Ho_Chi_Minh",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      temperature: temperatureData[i] || 0,
      humidity: humidityData[i] || 0,
      soil: soilData[i] || 0,
      light: lightData[i] || 0,
    });
  }

  return result.reverse();
}

export function usePlantData() {
  const [data, setData] = useState<PlantData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/sensors/all");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        console.log("Received data from API:", result);
        setData(transformData(result));
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // Set up polling every 10 seconds
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  return { data, loading, error };
}
