import "./App.css";
import { useGeoLocation } from "./hooks/GeoLocationHook";
import { useWeather } from "./hooks/WeatherHook";
import BackgroundImage from "./components/BackgroundImage/BackgroundImage";
import InputLocation from "./components/InputLocation/InputLocation";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import FutureWeather from "./components/FutureWeather/FutureWeather";

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
    if (!currentWeather) {
        return <div>Loading weather Data</div>;
    }
    const handleLocationSubmit = (newState) => {
        console.log('New state submitted:', newState);
    };

    return (
        <div className="app-container">
            <InputLocation
                state={location.state}
                stateCode={location.stateCode}
                onSubmit={handleLocationSubmit} 
            />
            <BackgroundImage />
            <CurrentWeather data={currentWeather} backgroundColor="#EEE8AA80" />

            {futureWeatherData.slice(1, 3).map((weather, index) => (
                <FutureWeather
                    key={index}
                    label={index === 0 ? "Tomorrow" : "After tomorrow"}
                    temperature={weather.temp}
                />
            ))}
        </div>
    );
}

export default App;
