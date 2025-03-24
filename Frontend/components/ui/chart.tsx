"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const colors = {
  temperature: "#FF0000",
  humidity: "#0000FF",
  light: "#FFA500",
  soil: "#008000",
};

interface PlantData {
  time: string;
  temperature: number;
  humidity: number;
  soil: number;
  light: number;
}

export default function PlantDataChart({ data }: { data: PlantData[] }) {
  return (
    <ResponsiveContainer width="100%" height={290}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" tick={{ fontSize: 12 }} />

        {/* Trục Y bên trái cho nhiệt độ, độ ẩm, độ ẩm đất */}
        <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
        {/* Trục Y bên phải cho ánh sáng (lux) */}
        <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />

        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <Legend
          wrapperStyle={{
            paddingTop: "20px",
            fontSize: "12px",
          }}
        />

        <Line
          yAxisId="left"
          type="monotone"
          dataKey="temperature"
          stroke={colors.temperature}
          name="Temperature (°C)"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4 }}
        />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="humidity"
          stroke={colors.humidity}
          name="Humidity (%)"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4 }}
        />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="soil"
          stroke={colors.soil}
          name="Soil Moisture (%)"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4 }}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="light"
          stroke={colors.light}
          name="Light (lux)"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
