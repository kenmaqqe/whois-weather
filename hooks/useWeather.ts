import { useState, useEffect } from "react";
import fetchWeather from "@/utills/fetchWeather";

export type WeatherType = {
  current_weather: {
    temperature: number;
    windspeed: number;
    weathercode: number;
  };
};

export default function useWeather(lat: string, lon: string, isOpen: boolean) {
  const [weather, setWeather] = useState<WeatherType | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !lat || !lon) return;

    const getWeather = async () => {
      setLoading(true);
      try {
        const data = await fetchWeather(lat, lon);
        setWeather(data);
      } catch (err) {
        console.error("Failed to fetch weather:", err);
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };

    getWeather();
  }, [lat, lon, isOpen]);

  return { weather, loading };
}
