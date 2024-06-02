import "./FutureWeather.css";

export default function FutureWeather({ label, temperature }) {
    return (
        <div
            className="future-weather-container"
            style={{ backgroundColor: "#FFE4B580" }}
        >
            <div className="future-weather-gap"></div>
            <div className="future-weather-data">
                <span>{label}</span>
                <p>{temperature}°C</p>
            </div>
        </div>
    );
}
