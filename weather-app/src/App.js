import "./App.css";
import BackgroundImage from "./components/BackgroundImage/BackgroundImage";
import InputLocation from "./components/InputLocation/InputLocation";
import { useGeoLocation } from "./hooks/GeoLocationHook";
import { useWeather } from "./hooks/WeatherHook";

function App() {
    const location = useGeoLocation();
    const { futureWeatherData, currentWeather } = useWeather();

    if (!location.loaded) {
        return <div>Loading Location...</div>;
    }

    if (location.error) {
        return <div>Error: {location.error}</div>;
    }
    
    if (!futureWeatherData) {
        return <div>Loading weather Data</div>;
    }
    if(!currentWeather) {
        return <div>Loading weather Data</div>;
    }
    console.log(location)
    return (
        <div className="app-container">
            <InputLocation state={location.state} stateCode={location.stateCode}/>
            <BackgroundImage />
            temp: {currentWeather.temp}
            <ul>
                {futureWeatherData.slice(1, 3).map((weather, index) => (
                    <li key={index}>
                        <strong>Tempo às {weather.dateTime}:</strong>
                        <p>Temperatura: {weather.temp}°C</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
