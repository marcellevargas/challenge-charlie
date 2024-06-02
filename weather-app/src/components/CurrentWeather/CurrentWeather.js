import "./CurrentWeather.css";
import { handleBackgroundColor } from "../../utils/customStyle";

export default function CurrentWeather({ data, icon }) {
    const { currentColor } = handleBackgroundColor(data.temp);

    return (
        <div
            className="current-weather-container"
            style={{ background: currentColor }}
        >
            <div className="image">
                <a href="" className="icon" data-icon={icon}></a>
            </div>
            <div className="weather-data">
                <p>Today</p>
                <span>{data.temp}°C</span>

                <p>{data.description}</p>

                <span>Wind: {data.windSpeed}m/s</span>
                <span>Humidity: {data.humidity}%</span>
                <span>Pressure: {data.pressure}hPA</span>
            </div>
        </div>
    );
}
