import { createContext, useState, useContext, useEffect } from "react";
import { weatherRequests, weatherByCityRequests } from "../services/https/weatherRequests";
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
        
        const dateFormatter = new Intl.DateTimeFormat('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });        

        const fetchInitialWeatherData = async () => {
            try {
                const { latitude, longitude } = coordinates;
                const weatherData = await weatherRequests(latitude, longitude);
                console.log("Weather data fetched:", weatherData);
                const today = dateFormatter.format(new Date());
                const todayWeather = weatherData.find(weather => weather.dateTime === today);
                console.log("Today's weather:", today);

                setWeather(prevState => ({
                    ...prevState,
                    futureWeatherData: weatherData,
                    currentWeather: todayWeather || null,
                    currentIndex: 0,
                }));
            } catch (error) {
                console.error("Failed to load initial weather data:", error);
                setWeather(prevState => ({
                    ...prevState,
                    error: error.message,
                }));
            }
        };

        fetchInitialWeatherData();

        const updateWeatherDisplay = () => {
            setWeather(prevState => {
                const today = dateFormatter.format(new Date());
                const newIndex = (prevState.currentIndex + 1) 
                const newWeatherData = prevState.futureWeatherData.slice(newIndex)

                const todaysWeather = newWeatherData.find(weather => weather.dateTime === today);
                console.log("Updated today's weather:", todaysWeather);
                return {
                    ...prevState,
                    currentWeather: todaysWeather || prevState.currentWeather,
                    currentIndex: newIndex,
                };
            });
        };


        const intervalId = setInterval(updateWeatherDisplay, 10 * 1000);

        return () => clearInterval(intervalId);
    }, [coordinates]);

    const setWeatherByCityName = async (cityName) => {
        try {
            const weatherByCity = await weatherByCityRequests(cityName);
            const today = new Date().toDateString();
            const todayWeather = weatherByCity.find(w => new Date(w.date).toDateString() === today);
            console.log("City weather data fetched:", weatherByCity);
            console.log("Today's city weather:", todayWeather);
            
            setWeather(prevState => ({
                ...prevState,
                futureWeatherData: weatherByCity,
                currentWeather: todayWeather || null,
                currentIndex: 0,
            }));
        } catch (error) {
            console.error("Failed to load weather data by city:", error);
            setWeather(prevState => ({
                ...prevState,
                error: error.message,
            }));
        }
    };

    const value = {
        ...weather,
        setWeatherByCityName,
    };

    return (
        <WeatherHook.Provider value={value}>{children}</WeatherHook.Provider>
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