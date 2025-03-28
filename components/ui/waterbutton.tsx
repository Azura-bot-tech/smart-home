'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface WaterButtonProps {
  disabled?: boolean;
  onClick?: () => void;
}

function WaterButton({ disabled = false, onClick }: WaterButtonProps) {
  const [isWatering, setIsWatering] = useState(false);

  const handleWatering = () => {
    if (disabled || isWatering) return;

    setIsWatering(true);
    onClick?.();

    setTimeout(() => {
      setIsWatering(false);
    }, 1500);
  };

  return (
    <Button
      onClick={handleWatering}
      disabled={disabled || isWatering}
      className="w-36 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded active:scale-95 transition-all flex items-center justify-center"
    >
      {isWatering ? (
        <img src="/water.gif" alt="Watering..." className="w-6 h-6" />
      ) : (
        <>Water Now 💧</>
      )}
    </Button>
  );
}

export default WaterButton;
