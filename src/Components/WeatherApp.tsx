import type { WeatherData } from "../Type/Weather"
import { getWeather } from "../Type/getWeather";
import { useState } from "react"


const WeatherApp = () => {
    const [city, setCity] = useState<string>("");
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchWeather = async () => {
        setLoading(true);
        setWeather(null);
        try {
            const data = await getWeather(city)
            setWeather(data);
        } catch (err: any) {
            if (
                err.response?.data?.message &&
                err.response.data.message.toLowerCase().includes("city not found")
            ) {
                alert("Şəhər tapılmadı!")
            }
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="weather-container">
            <h1>
                Hava proqnozu
            </h1>
            <input type="text" placeholder="Şəhər adı..." value={city}
                onChange={e => setCity(e.target.value)} className="weather-input" />
            <button className="weather-btn" onClick={fetchWeather}>
                Yoxla
            </button>
            {loading && <p className="loading-title">Yüklənir...</p>}
            {weather && (
                <div className="weather-result">
                    <h2>
                        {weather.name}
                    </h2>
                    <p className="weather-desc">
                        {weather.weather[0].description}
                    </p>
                    <p className="weather-temp">
                        Temperatur: {weather.main.temp}°C
                    </p>
                    <p className="weather-humidity">
                        Rütubət : {weather.main.humidity}%
                    </p>
                </div>
            )}
        </div>
    )
}

export default WeatherApp