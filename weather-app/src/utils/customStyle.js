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
