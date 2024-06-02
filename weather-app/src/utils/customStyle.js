export const handleBackgroundColor = (temperature) => {
    switch (true) {
        case temperature < 15:
            return {
                currentColor: "rgba(0,0,139,0.8)",
                tomorrowColor: "rgba(0,0,139,0.6)",
                afterTomorrowColor: "rgba(0,0,139,0.4)",
            };
        case temperature > 35:
            return {
                currentColor: "rgba(128,0,0,0.8)",
                tomorrowColor: "rgba(128,0,0,0.6)",
                afterTomorrowColor: "rgba(128,0,0,0.4)",
            };
        default:
            return {
                currentColor: "rgba(255,215,0,0.8)",
                tomorrowColor: "rgba(255,215,0,0.6)",
                afterTomorrowColor: "rgba(255,215,0,0.4)",
            };
    }
};

export const handleIcon = (description) => {
    switch (description) {
        case "clear sky":
            return "B"
        case "few clouds":
            return "H"
        case "scattered clouds":
            return "N"
        case "broken clouds":
            return "L"
        case "shower rain":
            return "R"
        case "rain":
            return "R"
        case "thunderstorm":
            return "Z"
        case "snow":
            return "W"
        case "mist":
            return "M"
        default:
            return ")"
    }
}