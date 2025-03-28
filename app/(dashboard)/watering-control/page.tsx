'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import LogTable from '@/components/ui/logTable';
import { Switch } from '@/components/ui/switch';
import WaterButton from '@/components/ui/waterbutton';
import { Droplets, Settings2 } from 'lucide-react';

export default function Monitor() {
    const plants = [
        { id: 1, image: "/plant1.jpg", water: "320 ml", lastWater: "14:27, 14/03/2025" },
        { id: 2, image: "/plant2.jpg", water: "290 ml", lastWater: "12:15, 14/03/2025" },
        { id: 3, image: "/plant3.jpg", water: "350 ml", lastWater: "15:00, 14/03/2025" },
        { id: 4, image: "/plant4.jpg", water: "300 ml", lastWater: "13:05, 14/03/2025" }
    ];

    const [selectedPlant, setSelectedPlant] = useState(plants[0]);
    const [isAuto, setIsAuto] = useState(true);
    const [isWatering, setIsWatering] = useState(false);

    const handleWaterNow = async () => {
        setIsWatering(true);
        try {
            await fetch('/api/water', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'on' }),
            });
        } catch (err) {
            console.error("Error watering:", err);
        } finally {
            setTimeout(() => setIsWatering(false), 1500);
        }
    };

    const handleStopWatering = async () => {
        try {
            await fetch('/api/water', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'off' }),
            });
        } catch (err) {
            console.error("Error stopping water:", err);
        }
    };

    return (
        <div className='w-full'>
            <h1 className="text-4xl font-bold ml-10 pb-5">Smart Home</h1>
            <div className="border-b w-full"></div>
            <div className="p-5 max-w-6xl mx-auto">

                <h2 className="text-2xl font-semibold text-black-800">Real-time Environment Monitoring</h2>

                <Card className="mt-4">
                    <CardContent className="p-6 pb-10">
                        <div className="flex gap-6 mt-4">
                            {/* Danh sách cây */}
                            <div className="grid grid-cols-2 gap-4">
                                {plants.map((plant) => (
                                    <div
                                        key={plant.id}
                                        onClick={() => { setSelectedPlant(plant); }}
                                        className={`border-2 ${selectedPlant.id === plant.id ? 'border-green-500' : 'border-gray-300'} 
                                                    rounded-lg overflow-hidden flex items-center justify-center 
                                                    w-32 h-32 cursor-pointer transition-all active:scale-95`}
                                    >
                                        <img src={plant.image} alt={`Plant ${plant.id}`} className="w-32 h-32 object-contain" />
                                    </div>
                                ))}
                            </div>

                            {/* Chi tiết và điều khiển */}
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="mt-6 text-lg font-semibold">Watering Status</h3>
                                    <div className="flex justify-between items-center mt-4">
                                        <p>💦 Total Water Used Today: <b>{selectedPlant.water}</b></p>
                                        <p>⏰ Last Watering Time: <i>{selectedPlant.lastWater}</i></p>
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end">
                                    <div className="flex items-center gap-4">
                                        {/* Toggle Auto/Manual */}
                                        <div className="flex items-center space-x-3">
                                        <Settings2 className={`w-5 h-5 ${isAuto ? "text-green-600" : "text-gray-400"}`} />
                                        <Switch
                                            checked={!isAuto}
                                            onCheckedChange={(val: boolean) => setIsAuto(!val)}
                                        />
                                        <Droplets className={`w-5 h-5 ${!isAuto ? "text-blue-600" : "text-gray-400"}`} />
                                        <span className="text-sm">{isAuto ? "Auto Mode" : "Manual Mode"}</span>
                                        </div>

                                        {/* Điều khiển Manual */}
                                        <div
                                        className={`flex items-center gap-4 transition-all duration-300 ${
                                            isAuto ? "opacity-0 invisible" : "opacity-100 visible"
                                        }`}
                                        >
                                        <WaterButton disabled={isWatering} onClick={handleWaterNow} />

                                        <Button
                                            onClick={handleStopWatering}
                                            className="bg-red-500 hover:bg-red-600 text-white px-4"
                                        >
                                            Stop Water 🛑
                                        </Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-end">
                                    <LogTable />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
