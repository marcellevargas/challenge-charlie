export const geoLocationRequests = async (latitude, longitude) => {
    const baseURL = "http://localhost:3005";

    const response = await fetch(`${baseURL}/geolocation`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ latitude: latitude, longitude: longitude }),
    });

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    return response.json();
};