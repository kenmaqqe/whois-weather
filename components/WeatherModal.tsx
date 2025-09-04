"use client";
import { IoIosClose } from "react-icons/io";
import WeatherIcon from "./WeatherIcons";
import useWeather, { WeatherType } from "@/hooks/useWeather";

type Props = {
  isModalOpen: boolean;
  lat: string;
  lon: string;
  onClose: () => void;
};

const WeatherModal: React.FC<Props> = ({ isModalOpen, lat, lon, onClose }) => {
  const { weather, loading } = useWeather(lat, lon, isModalOpen);

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        aria-label="Close modal backdrop"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-gray-800 text-white shadow-2xl rounded-2xl p-6 sm:p-10 max-w-sm w-full text-center animate-fadeIn z-10">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition cursor-pointer"
        >
          <IoIosClose size={30} />
        </button>

        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Weather</h1>
        {loading ? (
          <p className="text-gray-400 animate-pulse">Loading...</p>
        ) : weather ? (
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
          <p className="text-red-400">Failed to load weather</p>
        )}
      </div>
    </div>
  );
};

export default WeatherModal;
