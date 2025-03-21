'use client';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import WaterButton from '@/components/ui/waterbutton';
import PlantDataChart from '@/components/ui/chart';
import PlantData from '@/components/plantdata'

export default function Monitor() {
    const plants = [
        { id: 1, image: "/plant1.jpg", data: PlantData[0] },
        { id: 2, image: "/plant2.jpg", data: PlantData[1] },
        { id: 3, image: "/plant3.jpg", data: PlantData[2] },
        { id: 4, image: "/plant4.jpg", data: PlantData[3] }
    ];
      
    const [selectedPlant, setSelectedPlant] = useState(plants[0]);
    
    return (
        <div className='w-full'>
            <h1 className="text-4xl font-bold ml-10 pb-5">Smart Home</h1>
            <div className="border-b w-full"></div>
            <div className="p-5 max-w-6xl mx-auto ">

                <h2 className="text-2xl font-semibold text-black-800">Real-time Environment Monitoring</h2>

                <Card className="mt-4">
                    <CardContent className="p-6">
                        <div className="flex gap-6 mt-4">
                            <div className="grid grid-cols-2 gap-4">
                                {plants.map((plant) => (
                                    <div
                                        key={plant.id}
                                        onClick={() => {setSelectedPlant(plant); }}
                                        className={`border-2 ${selectedPlant.id === plant.id ? 'border-green-500' : 'border-gray-300'} 
                                                    rounded-lg overflow-hidden flex items-center justify-center 
                                                    w-32 h-32 cursor-pointer transition-all active:scale-95`}
                                    >
                                        <img src={plant.image} alt={`Plant ${plant.id}`} className="w-full h-full object-cover" />
                                    </div>

                                ))}
                            </div>

                            <div className="flex-1">
                                <PlantDataChart data={selectedPlant.data} />
                            </div>
                            </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
