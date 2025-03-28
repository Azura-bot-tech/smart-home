'use client';
import { useEffect, useState } from 'react';
import mqtt from 'mqtt';

const MQTT_BROKER = 'wss://io.adafruit.com:443/mqtt/';
const ADAFRUIT_USERNAME = process.env.NEXT_PUBLIC_ADAFRUIT_USERNAME;
const ADAFRUIT_KEY = process.env.NEXT_PUBLIC_ADAFRUIT_KEY;
const TOPICS = {
  light: 'KhaTran/feeds/anh-sang',
  moisture: 'KhaTran/feeds/am-dat',
  humidity: 'KhaTran/feeds/do-am',
  temperature: 'KhaTran/feeds/nhiet-do'
};

export function useMQTT() {
  const [data, setData] = useState({
    light: 0,
    moisture: 0,
    humidity: 0,
    temperature: 0
  });

  useEffect(() => {
    const client = mqtt.connect(MQTT_BROKER, {
      username: ADAFRUIT_USERNAME,
      password: ADAFRUIT_KEY,
    });

    client.on('connect', () => {
      console.log('Connected to Adafruit IO');
      Object.values(TOPICS).forEach((topic) => client.subscribe(topic));
    });

    client.on('message', (topic, payload) => {
      const message = JSON.parse(payload.toString());

      setData((prevData) => {
        if (topic === TOPICS.moisture)
          return { ...prevData, moisture: message };
        if (topic === TOPICS.humidity)
          return { ...prevData, humidity: message };
        if (topic === TOPICS.temperature)
          return { ...prevData, temperature: message };
        if (topic === TOPICS.light) return { ...prevData, light: message };
        return prevData;
      });
    });

    return () => {
      client.end();
    };
  }, []);

  return data;
}
