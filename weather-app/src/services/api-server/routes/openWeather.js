const express = require("express");
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

router.use(express.json());

function fetchForecastData(latitude, longitude, apiKey) {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    return axios.get(forecastUrl)
        .then(response => parseForecastWeather(response.data.list));
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
        windSpeed: item.wind.speed,
        pressure: item.main.pressure,
        humidity: item.main.humidity
    }));
}

router.post("/", (req, res) => {
    const { latitude, longitude } = req.body;
    const apiKey = process.env.OPEN_WEATHER_KEY;

    fetchForecastData(latitude, longitude, apiKey)
        .then(futureWeatherData => res.json({ futureWeatherData }))
        .catch(error => {
            console.error('Error fetching weather data:', error);
            res.status(500).send({ error: 'Error fetching weather data' });
        });
});

module.exports = router;