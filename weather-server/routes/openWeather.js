const express = require("express");
const axios = require('axios');
require('dotenv').config();

const router = express.Router();
router.use(express.json());

async function fetchForecastData(latitude, longitude, apiKey) {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    try {
        const response = await axios.get(forecastUrl);
        return parseForecastWeather(response.data.list);
    } catch (error) {
        throw new Error('Failed to fetch forecast data');
    }
}

async function fetchWeatherByCityName(cityName, apiKey) {
    const geocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(cityName)}&key=${process.env.OPEN_CAGE_KEY}`;

    try {
        const geocodeResponse = await axios.get(geocodeUrl);
        const geocodeData = geocodeResponse.data;
        
        if (!geocodeData.results || geocodeData.results.length === 0) {
            throw new Error('No location found');
        }

        const { lat, lng } = geocodeData.results[0].geometry;

        const weatherResponse = await fetchForecastData(lat, lng, apiKey)

        return weatherResponse;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error fetching weather data');
    }
}

function parseForecastWeather(list) {
    const dateFormatter = new Intl.DateTimeFormat('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    return list.map(item => ({
        dateTime: dateFormatter.format(new Date(item.dt * 1000)),
        temp: Math.round(item.main.temp),
        feelsLike: Math.round(item.main.feels_like),
        description: item.weather[0].description.charAt(0).toUpperCase() + item.weather[0].description.slice(1),
        windSpeed: Math.round(item.wind.speed),
        pressure: Math.round(item.main.pressure),
        humidity: Math.round(item.main.humidity),
        icon: item.weather[0].icon.split(".")[0].slice(0,2)
    }));
}

router.post("/", async (req, res) => {
    const { latitude, longitude } = req.body;
    if (!latitude || !longitude) {
      return res.status(400).send({ error: 'Latitude and longitude are required' });
    }
    const apiKey = process.env.OPEN_WEATHER_KEY;

    try {
        const futureWeatherData = await fetchForecastData(latitude, longitude, apiKey);
        res.json({ futureWeatherData });
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).send({ error: error.message || 'Error fetching weather data' });
    }
});

router.post("/by-city", async (req, res) => {
    const { cityName } = req.body;
    if (!cityName) {
        return res.status(400).send({ error: 'City name is required' });
    }
    const apiKey = process.env.OPEN_WEATHER_KEY;

    try {
        const futureWeatherData = await fetchWeatherByCityName(cityName, apiKey);
        res.json({ futureWeatherData });
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).send({ error: error.message || 'Error fetching weather data' });
    }
});

module.exports = router;