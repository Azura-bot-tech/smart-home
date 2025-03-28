'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import WaterButton from '@/components/ui/waterbutton';
import { useMQTT } from './mqtt';

interface Plant {
  id: number;
  image: string;
  water: string;
  lastWater: string;
  temp?: number;
  humidity?: number;
  light?: number;
  soil?: number;
}

export default function SmartPlantWatering() {
  const data = useMQTT();

  const initialPlants: Plant[] = [
    {
      id: 1,
      image: '/plant1.jpg',
      water: '320 ml',
      lastWater: '14:27, 14/03/2025'
    },
    {
      id: 2,
      image: '/plant2.jpg',
      water: '290 ml',
      lastWater: '12:15, 14/03/2025'
    },
    {
      id: 3,
      image: '/plant3.jpg',
      water: '350 ml',
      lastWater: '15:00, 14/03/2025'
    },
    {
      id: 4,
      image: '/plant4.jpg',
      water: '300 ml',
      lastWater: '13:05, 14/03/2025'
    }
  ];
  const [plants, setPlants] = useState(initialPlants);
  const [selectedPlant, setSelectedPlant] = useState(initialPlants[0]);

  useEffect(() => {
    const updated = plants.map((p) => ({
      ...p,
      temp: data.temperature,
      humidity: data.humidity,
      light: data.light,
      soil: data.moisture
    }));
    setPlants(updated);
    setSelectedPlant(
      (prev) => updated.find((p) => p.id === prev.id) || updated[0]
    );
  }, [data]); // khi có dữ liệu mới từ MQTT

  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold ml-10 pb-5">Smart Home</h1>
      <div className="border-b w-full"></div>
      <div className="p-5 max-w-6xl mx-auto ">
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
                    className={`border-2 ${selectedPlant.id === plant.id ? 'border-green-500' : 'border-gray-300'} 
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
                      🌡 Temperature: <b>{selectedPlant.temp ?? '--'}</b>
                    </p>
                    <p>
                      💧 Humidity: <b>{selectedPlant.humidity ?? '--'}</b>
                    </p>
                    <p>
                      ☀️ Light: <b>{selectedPlant.light ?? '--'}</b>
                    </p>
                    <p>
                      🌱 Soil Moisture: <b>{selectedPlant.soil ?? '--'}</b>
                    </p>
                  </div>

                  <h3 className="mt-6 text-lg font-semibold">
                    Watering Status
                  </h3>
                  <div className="flex justify-between items-center mt-4">
                    <p>
                      💦 Total Water Used Today: <b>{selectedPlant.water}</b>
                    </p>
                    <p>
                      ⏰ Last Watering Time: <i>{selectedPlant.lastWater}</i>
                    </p>
                  </div>
                </div>

                <div className="mt-auto flex justify-end gap-4">
                  <Button>Auto</Button>
                  <Button>Manual</Button>
                  <WaterButton />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
