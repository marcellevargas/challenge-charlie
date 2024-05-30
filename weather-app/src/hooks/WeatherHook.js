import { createContext, useState, useContext, useEffect } from "react";
import { WeatherRequest } from "../services/api/WeatherRequest";
import { useGeoLocation } from "./GeoLocationHook";

const WeatherHook = createContext();

export const WeatherProvider = ({ children }) => {
    const initialWeatherData = {
        futureWeatherData: [],
        currentIndex: 0,
        currentWeather: null
    };

    const [weather, setWeather] = useState(initialWeatherData);
    const { coordinates } = useGeoLocation();

    useEffect(() => {
        if (!coordinates.latitude || !coordinates.longitude) {
            console.log('Coordinates not available yet.');
            return;
        }
            const fetchInitialWeatherData = async () => {
                try {
                    const { latitude, longitude } = coordinates;

                    const weatherData = await WeatherRequest(
                        latitude,
                        longitude
                    );
                    setWeather(prevState => ({
                        ...prevState,
                        futureWeatherData: weatherData,
                        currentWeather: weatherData[0], 
                        currentIndex: 0,
                    }));
                } catch (error) {
                    console.error(
                        "Failed to load initial weather data:",
                        error
                    );
                    setWeather((prevState) => ({
                        ...prevState,
                        error: error.message,
                    }));
                }
            };

            fetchInitialWeatherData();

            const updateWeatherDisplay = () => {
                setWeather(prevState => {
                    const newIndex = (prevState.currentIndex + 1) % prevState.futureWeatherData.length;
                    const newFutureWeatherData = [...prevState.futureWeatherData];
                    const currentItem = newFutureWeatherData.splice(newIndex, 1)[0];
            
                    return {
                        ...prevState,
                        futureWeatherData: newFutureWeatherData,
                        currentIndex: newIndex - 1 >= 0 ? newIndex - 1 : newFutureWeatherData.length - 1, // Ajustar o índice se necessário
                        currentWeather: currentItem
                    };
                });
            };

            //TODO needs improvement
            // const intervalId = setInterval(
            //     updateWeatherDisplay,
            //     3 * 60 * 60 * 1000
            // );
            const intervalId = setInterval(
                updateWeatherDisplay,
                30 * 1000 
            );

            return () => clearInterval(intervalId);
    }, [coordinates]);

    return (
        <WeatherHook.Provider value={weather}>{children}</WeatherHook.Provider>
    );
};

export const useWeather = () => {
    const context = useContext(WeatherHook);
    if (context === undefined) {
        throw new Error("useWeather must be used within a WeatherProvider");
    }

    return context;
};

export default WeatherHook;