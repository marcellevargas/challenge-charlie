import { useState, useEffect } from 'react';
import "./App.css";
import { useGeoLocation } from "./hooks/GeoLocationHook";
import { useWeather } from "./hooks/WeatherHook";
import BackgroundImage from "./components/BackgroundImage/BackgroundImage";
import InputLocation from "./components/InputLocation/InputLocation";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import FutureWeather from "./components/FutureWeather/FutureWeather";
import Loading from "./components/Loading/Loading";

function App() {
    const [loadingTimeout, setLoadingTimeout] = useState(false);
    const location = useGeoLocation();
    const { futureWeatherData, currentWeather, setWeatherByCityName } = useWeather();

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoadingTimeout(true);
        }, 60000);

        return () => clearTimeout(timer);
    }, []);

    if (loadingTimeout) {
        return <div>Error: Loading took too long.</div>;
    }

    if (!location.loaded || !futureWeatherData || !currentWeather) {
        return <Loading />;
    }

    if (location.error) {
        return <div>Error: {location.error}</div>;
    }

    const handleLocationSubmit = (newState) => {
        console.log('New state submitted:', newState);
        setWeatherByCityName(newState);
    };

    return (
        <div className="app-container">
            <InputLocation
                city={location.state}
                onSubmit={handleLocationSubmit}
            />
            <BackgroundImage />
            <CurrentWeather 
                data={currentWeather}
            />

            {futureWeatherData.slice(1, 3).map((weather, index) => (
                <FutureWeather
                    key={index}
                    label={index === 0 ? "Tomorrow" : "After tomorrow"}
                    temperature={weather.temp}
                    color={index === 0 ? 0 : 1}
                />
            ))}
        </div>
    );
}

export default App;