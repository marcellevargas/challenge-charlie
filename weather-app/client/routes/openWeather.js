const express = require("express");
const router = express.Router();
require('dotenv').config();

router.use(express.json());

function fetchForecastData(lat, lon, apiKey) {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    return fetch(forecastUrl)
        .then(response => response.json())
        .then(forecastData => parseForecastWeather(forecastData.list));
}

function parseForecastWeather(list) {
    const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'America/Sao_Paulo'
    });

    return list.map(item => ({
        dateTime: dateFormatter.format(new Date(item.dt * 1000)),
        temp: item.main.temp,
        feelsLike: item.main.feels_like,
        description: item.weather[0].description,
        windSpeed: item.wind.speed
    }));
}

router.post("/", (req, res) => {
    const { lat, lon } = req.body;
    const apiKey = process.env.OPEN_WEATHER_KEY;

    fetchForecastData(lat, lon, apiKey)
        .then(futureWeatherData => res.json({ futureWeatherData }))
        .catch(error => {
            console.error('Error fetching weather data:', error);
            res.status(500).send({ error: 'Error fetching weather data' });
        });
});

module.exports = router;