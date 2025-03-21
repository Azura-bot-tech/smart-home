'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";

function WaterButton() {
    const [isWatering, setIsWatering] = useState(false);

    const handleWatering = () => {
        setIsWatering(true);

        setTimeout(() => {
            setIsWatering(false);
        }, 1500);
    };

    return (
        <div>
            {isWatering ? (
                <Button
                    className="w-36 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded active:scale-95 transition-all"
                >
                    <img src="/water.gif" alt="Watering..." className="w-6 h-6" />
                </Button>

            ) : (
                <Button
                    className="w-36 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded active:scale-95 transition-all"
                    onClick={handleWatering}
                >
                    Water Now 💧
                </Button>
            )}
        </div>
    );
}

export default WaterButton;
