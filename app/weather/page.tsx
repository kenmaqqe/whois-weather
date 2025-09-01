"use client";
import { useSearchParams } from "next/navigation";
import fetchWeather from "@/utills/fetchWeather";
import { useState, useEffect } from "react";
import WeatherIcon from "@/components/WeatherIcons";

type WeatherType = {
  current_weather: {
    temperature: number;
    windspeed: number;
    weathercode: number;
  };
};

const WeatherPage: React.FC = () => {
  const [weather, setWeather] = useState<WeatherType | null>(null);
  const searchParams = useSearchParams();
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  useEffect(() => {
    if (lat && lon) {
      const getWeather = async () => {
        const data = await fetchWeather(lat, lon);
        setWeather(data);
      };
      getWeather();
    }
  }, [lat, lon]);

  return (
    <div className="h-dvh bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 text-white shadow-xl rounded-2xl p-6 sm:p-10 max-w-sm w-full text-center overflow-auto max-h-[90vh]">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Weather</h1>
        {weather ? (
          <>
            <div className="mb-6 flex justify-center">
              {WeatherIcon(weather.current_weather.weathercode)}
            </div>
            <p className="text-lg sm:text-xl font-medium mb-2">
              Location:{" "}
              <span className="text-blue-400">
                {lat}, {lon}
              </span>
            </p>
            <p className="text-lg sm:text-xl font-medium mb-2">
              Temperature:{" "}
              <span className="text-blue-400">
                {weather.current_weather.temperature}°C
              </span>
            </p>
            <p className="text-lg sm:text-xl font-medium">
              Wind speed:{" "}
              <span className="text-blue-400">
                {weather.current_weather.windspeed} km/h
              </span>
            </p>
          </>
        ) : (
          <p className="text-gray-400 animate-pulse">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default WeatherPage;
