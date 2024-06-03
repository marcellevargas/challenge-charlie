import { useState, useEffect } from 'react';
import "./App.css";
import { useGeoLocation } from "./hooks/GeoLocationHook";
import { useWeather } from "./hooks/WeatherHook";
import BackgroundImage from "./components/BackgroundImage/BackgroundImage";
import InputLocation from "./components/InputLocation/InputLocation";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import FutureWeather from "./components/FutureWeather/FutureWeather";
import Loading from "./components/Loading/Loading";
import Error from './components/Error/Error';

function App() {
    const [loadingTimeout, setLoadingTimeout] = useState(false);
    const location = useGeoLocation();
    const { futureWeatherData, currentWeather, setWeatherByCityName, currentIndex } = useWeather();
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoadingTimeout(true);
        }, 60000);

        return () => clearTimeout(timer);
    }, []);

    if (loadingTimeout) {
        return <Error/>;
    }

    if (!location.loaded || !futureWeatherData || !currentWeather) {
        return <Loading/>;
    }

    if (location.error) {
        return <Error/>;
    }

    const handleLocationSubmit = (newState) => {
        console.log('New state submitted:', newState);
        setWeatherByCityName(newState);
    };
    console.log(currentWeather)
    return (
        <div className="app-container">
            <InputLocation
                city={location.state}
                onSubmit={handleLocationSubmit}
            />
            <BackgroundImage />
            <CurrentWeather 
                data={currentWeather[currentIndex]}
            />

            {futureWeatherData.map((weather, index) => (
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