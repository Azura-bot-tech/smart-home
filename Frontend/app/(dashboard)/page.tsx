"use client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import WaterButton from "@/components/ui/waterbutton";

const plants = [
  {
    id: 1,
    image: "/plant1.jpg",
    lastWater: "13:05, 14/03/2025",
    waterAmount: "300 ml",
  },
];

interface SensorData {
  do_am: {
    value: string | number;
    timestamp: string;
  } | null;
  nhiet_do: {
    value: string | number;
    timestamp: string;
  } | null;
  anh_sang: {
    value: string | number;
    timestamp: string;
  } | null;
  am_dat: {
    value: string | number;
    timestamp: string;
  } | null;
}

export default function SmartPlantWatering() {
  const [selectedPlant, setSelectedPlant] = useState(plants[0]);
  const [sensorData, setSensorData] = useState<SensorData>({
    am_dat: null,
    anh_sang: null,
    do_am: null,
    nhiet_do: null,
  });
  const [isAutoMode, setIsAutoMode] = useState(false);

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/sensors/latest"
        );
        const data = await response.json();
        setSensorData(data);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    fetchSensorData();
    const interval = setInterval(fetchSensorData, 5000);
    return () => clearInterval(interval);
  }, []);

  const toggleMode = () => {
    setIsAutoMode(!isAutoMode);
  };

  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold ml-10 pb-5">Smart Home</h1>
      <div className="border-b w-full"></div>
      <div className="p-5 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-black-800">
          Smart Plant Watering System
        </h2>

        <Card className="mt-4">
          <CardContent className="p-6">
            <div className="flex gap-6 mt-4">
              <div className="grid grid-cols-2 gap-4">
                {plants.map((plant) => (
                  <div
                    key={plant.id}
                    onClick={() => setSelectedPlant(plant)}
                    className={`border-2 ${
                      selectedPlant.id === plant.id
                        ? "border-green-500"
                        : "border-gray-300"
                    } 
                    rounded-lg overflow-hidden flex items-center justify-center 
                    w-32 h-32 cursor-pointer transition-all active:scale-95`}
                  >
                    <img
                      src={plant.image}
                      alt={`Plant ${plant.id}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Environment</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 text-sm gap-3 mt-4">
                    <p>
                      🌡 Temperature:{" "}
                      <b>
                        {sensorData.nhiet_do?.value
                          ? Number(sensorData.nhiet_do.value).toFixed(1)
                          : "N/A"}
                        °C
                      </b>
                    </p>
                    <p>
                      💧 Humidity:{" "}
                      <b>
                        {sensorData.do_am?.value
                          ? Number(sensorData.do_am.value).toFixed(1)
                          : "N/A"}
                        %
                      </b>
                    </p>
                    <p>
                      ☀️ Light:{" "}
                      <b>
                        {sensorData.anh_sang?.value
                          ? Number(sensorData.anh_sang.value).toFixed(0)
                          : "N/A"}
                        lux
                      </b>
                    </p>
                    <p>
                      🌱 Soil Moisture:{" "}
                      <b>
                        {sensorData.am_dat?.value
                          ? Number(sensorData.am_dat.value).toFixed(1)
                          : "N/A"}
                        %
                      </b>
                    </p>
                  </div>

                  <h3 className="mt-6 text-lg font-semibold">
                    Watering Status
                  </h3>
                  <div className="flex justify-between items-center mt-4">
                    <p>
                      💦 Total Water Used Today:{" "}
                      <b>{selectedPlant.waterAmount}</b>
                    </p>
                    <p>
                      ⏰ Last Watering Time: <i>{selectedPlant.lastWater}</i>
                    </p>
                  </div>
                </div>

                <div className="mt-auto flex justify-end gap-4">
                  <Button
                    variant={isAutoMode ? "default" : "outline"}
                    onClick={toggleMode}
                  >
                    {isAutoMode ? "Auto Mode" : "Manual Mode"}
                  </Button>
                  <WaterButton disabled={isAutoMode} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
