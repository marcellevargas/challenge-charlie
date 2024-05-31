export const WeatherRequest = async (latitude, longitude) => {
    const baseURL = "http://localhost:3005";

    const response = await fetch(`${baseURL}/weather`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ latitude: latitude, longitude: longitude }),
    });

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    const data = await response.json();

    return data.futureWeatherData;
};
