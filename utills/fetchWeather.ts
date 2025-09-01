import axios from "axios";

const fetchWeather = async (lat: string, lon: string) => {
  try {
    const response = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m`
    );
    if (!response) throw new Error("Failed to fetch weather");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default fetchWeather;
