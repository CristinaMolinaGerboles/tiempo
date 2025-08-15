import config from '../config/config.json';
const API_KEY = config.OPENWEATHER_API_KEY;

export const fetchWeatherByCity = async (city: string) => {
  console.log(city)
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
  if (!res.ok) throw new Error("Error fetching weather");
  return res.json();
};
export const fetchWeatherByHour = async (lat: string, lon: string) => {
  const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${API_KEY}`);
  if (!res.ok) throw new Error("Error fetching weather by hour");
  return res.json();
};