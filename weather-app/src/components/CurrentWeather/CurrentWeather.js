import "./CurrentWeather.css"

export default function CurrentWeather({ data, backgroundColor }) {
    console.log(data);
    return (
        <div className="current-weather-container" style={{backgroundColor: backgroundColor}} >
            <div className="image">
                <a href="" className="icon" data-icon="("></a>
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
