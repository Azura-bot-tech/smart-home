"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function LogTable() {
  const [logs] = useState([
    { id: 1, tree: "Tree 1", type: "warning", message: "Watering skipped due to high soil moisture", time: "14:20, 14/03/2025" },
    { id: 2, tree: "Tree 2", type: "warning", message: "High Temperature Alert: 40°C detected! Consider providing shade or watering", time: "14:25, 14/03/2025" },
    { id: 3, tree: "Tree 3", type: "error", message: "Soil moisture sensor disconnected!", time: "14:30, 14/03/2025" },
    { id: 4, tree: "Tree 4", type: "success", message: "Watering successful", time: "14:35, 14/03/2025" },
    { id: 5, tree: "Tree 1", type: "warning", message: "High Temperature Alert: 39°C detected! Consider providing shade or watering", time: "14:40, 14/03/2025" },
    { id: 6, tree: "Tree 3", type: "warning", message: "Watering skipped due to high soil moisture", time: "14:45, 14/03/2025" },
    { id: 7, tree: "Tree 2", type: "success", message: "Watering successful", time: "14:50, 14/03/2025" },
    { id: 8, tree: "Tree 4", type: "warning", message: "Low Humidity Warning: 25% detected. Plants may need extra watering", time: "14:55, 14/03/2025" },
    { id: 9, tree: "Tree 1", type: "error", message: "Pump malfunction detected!", time: "15:00, 14/03/2025" },
    { id: 10, tree: "Tree 3", type: "success", message: "Watering successful", time: "15:05, 14/03/2025" },
  ]);

  const [zoomed, setZoomed] = useState(false);

  return (
    <motion.div
      className={`flex items-center justify-center transition-all duration-300 ${zoomed ? "fixed inset-0 bg-gray-900 bg-opacity-90" : ""}`}
      onClick={() => setZoomed(!zoomed)}
    >
      <motion.div
        className={`max-w-3xl p-4 bg-gray-100 rounded-lg shadow-md cursor-pointer hover:bg-gray-200 transition-all duration-300 ${
          zoomed ? "scale-125 w-[50rem]" : "scale-100"
        }`}
      >
        <h2 className="text-lg font-semibold mb-2 text-gray-700">Log</h2>
        <div
          className={`bg-gray-50 p-1 rounded-lg text-gray-800 font-mono text-xs whitespace-pre overflow-auto border border-gray-300 ${
            zoomed ? "max-h-[30rem]" : "max-h-[10rem]"
          }`}
        >
          {logs.map((log) => (
            <div key={log.id} className="flex items-center space-x-2 p-1">
              <span>{log.type === "success" ? "✅" : log.type === "error" ? "❌" : "⚠️"}</span>
              <span>
                <strong>{log.tree}:</strong> {log.message} - {log.time}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
