'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

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
                <XAxis dataKey="time" />

                {/* Trục Y bên trái cho nhiệt độ, độ ẩm, độ ẩm đất */}
                <YAxis yAxisId="left" />
                {/* Trục Y bên phải cho ánh sáng (lux) */}
                <YAxis yAxisId="right" orientation="right" />

                <Tooltip />
                <Legend />

                <Line yAxisId="left" type="monotone" dataKey="temperature" stroke={colors.temperature} name="Temperature (°C)" strokeWidth={2} />
                <Line yAxisId="left" type="monotone" dataKey="humidity" stroke={colors.humidity} name="Humidity (%)" strokeWidth={2} />
                <Line yAxisId="left" type="monotone" dataKey="soil" stroke={colors.soil} name="Soil Moisture (%)" strokeWidth={2} />
                <Line yAxisId="right" type="monotone" dataKey="light" stroke={colors.light} name="Light (lux)" strokeWidth={2} />
            </LineChart>
        </ResponsiveContainer>
    );
}
