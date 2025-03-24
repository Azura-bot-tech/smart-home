"use client";
import * as React from "react";
import { Button } from "./button";

const WaterButton = ({ disabled }: { disabled?: boolean }) => {
  const [isWatering, setIsWatering] = React.useState(false);

  const handleWater = () => {
    setIsWatering(true);
    // Here you would typically make an API call to trigger watering
    setTimeout(() => {
      setIsWatering(false);
    }, 2000);
  };

  return (
    <Button
      onClick={handleWater}
      disabled={isWatering || disabled}
      className="bg-blue-500 hover:bg-blue-600 text-white"
    >
      {isWatering ? "Watering..." : "Water Plant"}
    </Button>
  );
};

export default WaterButton;
