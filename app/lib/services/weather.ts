import axios from "axios";
export const fetchWeather = async (city: string) => {
  const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_OWM_KEY}&units=metric`
  );
  return res.data;
};
