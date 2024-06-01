import "./FutureWeather.css";

export default function FutureWeather({ label, temperature }) {
    return (
        <div
            className="future-weather-container"
            style={{ backgroundColor: "#FFE4B580" }}
        >
            <span>{label}</span>
            <p>{temperature}°C</p>
        </div>
    );
}
