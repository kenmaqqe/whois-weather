import axios from "axios";

export default async function fetchWeather(lat: string, lon: string) {
  const res = await axios.get(`/api/weather?lat=${lat}&lon=${lon}`);
  if (!res) throw new Error("Failed to fetch weather");
  return res.data;
}
