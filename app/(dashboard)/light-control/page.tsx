'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function LightControl() {
  const [isOn, setIsOn] = useState(false);
  const [mode, setMode] = useState('default');
  const [loading, setLoading] = useState(true);

  // Load trạng thái ban đầu từ server
  useEffect(() => {
    async function fetchInitialState() {
      try {
        const [resMode, resLed] = await Promise.all([
          fetch("/api/feeds/lightmode"),
          fetch("/api/feeds/led"),
        ]);
        const [modeData, ledData] = await Promise.all([
          resMode.json(),
          resLed.json(),
        ]);

        console.table([
          { feed: 'lightmode', value: modeData.value },
          { feed: 'led', value: ledData.value },
        ]);

        const latestMode = modeData.value === "1" ? "infrared sensor" : "default";
        const latestLed = ledData.value === "1";
        setMode(latestMode);
        setIsOn(latestLed);
      } catch (error) {
        console.error("Lỗi khi fetch trạng thái ban đầu:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchInitialState();
  }, []);

  // Gửi trạng thái LED mới
  async function toggleLight() {
    const newState = !isOn;
    setIsOn(newState);

    const res = await fetch("/api/led", {
      method: "POST",
      body: JSON.stringify({ value: newState ? "1" : "0" }),
    });

    if (!res.ok) {
      console.error("Failed to toggle light");
    }
  }

  // Gửi chế độ sáng
  async function handleModeChange(value: string) {
    setMode(value);

    const newModeValue = value === "infrared sensor" ? "1" : "0";
    const res = await fetch("/api/lightmode", {
      method: "POST",
      body: JSON.stringify({ value: newModeValue }),
    });

    if (!res.ok) {
      console.error("Failed to change mode");
    }
  }

  const isDisabled = mode === 'infrared sensor';

  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold ml-10 pb-5">Smart Home</h1>
      <div className="border-b w-full"></div>

      <div className="p-5 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-black-800">Light Control</h2>

        <Card className="mt-4">
          <CardContent className="p-8 pb-10">

            {/* Light Mode Section */}
            <div className="flex items-center justify-between flex-wrap mb-10">
              <h2 className="text-2xl font-semibold text-gray-700 whitespace-nowrap">🔆 Light Mode</h2>
              <div className="absolute left-1/2 -translate-x-1/2 flex gap-4">
                {[{ value: 'default', label: 'Default' }, { value: 'infrared sensor', label: 'Infrared Sensor' }].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleModeChange(opt.value)}
                    className={`text-l px-6 py-3 rounded-full border-2 font-medium transition-all duration-200 ${
                      mode === opt.value
                        ? 'bg-blue-500 text-white border-blue-600 scale-105 shadow-md'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* LED Toggle (Hiện trong mọi chế độ, chỉ cho chỉnh khi default) */}
            {!loading && (
              <div className="flex flex-col items-center">
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={isOn}
                      onChange={isDisabled ? undefined : toggleLight}
                      disabled={isDisabled}
                    />
                    <div className="block bg-gray-400 w-24 h-14 rounded-full"></div>
                    <div
                      className={`dot absolute left-1 top-1 bg-white w-12 h-12 rounded-full transition ${
                        isOn ? 'translate-x-10 bg-yellow-400' : ''
                      }`}
                    ></div>
                  </div>
                  <div className="ml-6 text-xl font-semibold text-gray-700">
                    {isOn ? 'Turning ON' : 'Turning OFF'}{' '}
                    {isDisabled && <span className="text-sm text-gray-500">(Sensor controlled)</span>}
                  </div>
                </label>
              </div>
            )}

          </CardContent>
        </Card>
      </div>
    </div>
  );
}
