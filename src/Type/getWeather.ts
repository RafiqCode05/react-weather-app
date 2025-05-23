import axios from "axios";
import type { WeatherData } from "../Type/Weather";

const API_KEY = "68924e52088bd0605ad138baee861b17";

export const getWeather = async (city: string): Promise<WeatherData> => {
    const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
            params: {
                q: city,
                appid: API_KEY,
                units: "metric",
                lang: "az"
            }
        }
    );
    return res.data;
};