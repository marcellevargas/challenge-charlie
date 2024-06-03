import { createContext, useState, useContext, useEffect } from "react";
import {
    weatherRequests,
    weatherByCityRequests,
} from "../services/https/weatherRequests";
import { useGeoLocation } from "./GeoLocationHook";

const WeatherHook = createContext();

export const WeatherProvider = ({ children }) => {
    const initialWeatherData = {
        futureWeatherData: [],
        currentIndex: 0,
        currentWeather: null,
        erroType: ""
    };

    const [weather, setWeather] = useState(initialWeatherData);
    const { coordinates } = useGeoLocation();

    useEffect(() => {
        if (!coordinates.latitude || !coordinates.longitude) {
            setTimeout(() => {
                setWeather((prevState) => ({
                    ...prevState,
                    erroType: "gps",
                }));
            }, 60000);
            return;
        }

        const dateFormatter = new Intl.DateTimeFormat("en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });

        const fetchInitialWeatherData = async () => {
            try {
                const { latitude, longitude } = coordinates;
                const weatherData = await weatherRequests(latitude, longitude);

                const today = new Date();

                const tomorrow = new Date(today);
                tomorrow.setDate(tomorrow.getDate() + 1);
                const dayAfterTomorrow = new Date(today);
                dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

                const formattedTomorrow = dateFormatter.format(tomorrow);
                const formattedDayAfterTomorrow =
                    dateFormatter.format(dayAfterTomorrow);

                const tomorrowWeather = weatherData.find(
                    (weather) =>
                        dateFormatter.format(new Date(weather.dateTime)) ===
                        formattedTomorrow
                );
                const dayAfterTomorrowWeather = weatherData.find(
                    (weather) =>
                        dateFormatter.format(new Date(weather.dateTime)) ===
                        formattedDayAfterTomorrow
                );

                setWeather((prevState) => ({
                    ...prevState,
                    futureWeatherData: [
                        tomorrowWeather,
                        dayAfterTomorrowWeather,
                    ].filter(Boolean),
                    currentWeather:
                        weatherData.filter(
                            (weather) =>
                                dateFormatter.format(
                                    new Date(weather.dateTime)
                                ) === dateFormatter.format(today)
                        ) || null,
                    currentIndex: 0,
                }));
            } catch (error) {
                setWeather((prevState) => ({
                    ...prevState,
                    erroType: "fetch",
                }));
            }
        };

        fetchInitialWeatherData();

        const updateWeatherDisplay = () => {
            setWeather((prevState) => {
                const newIndex = prevState.currentIndex + 1;
                return {
                    ...prevState,
                    currentIndex: prevState.currentWeather[newIndex]
                        ? newIndex
                        : prevState.currentIndex,
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
            const todayWeather = weatherByCity.find(
                (w) => new Date(w.date).toDateString() === today
            );

            setWeather((prevState) => ({
                ...prevState,
                futureWeatherData: weatherByCity,
                currentWeather: todayWeather || null,
                currentIndex: 0,
            }));
        } catch (error) {
            console.error("Failed to load weather data by city:", error);
            setWeather((prevState) => ({
                ...prevState,
                erroType: "gps",
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
