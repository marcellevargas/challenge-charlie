import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BackgroundImageProvider } from "./hooks/BackgroundImageHook";
import { GeoLocationProvider } from "./hooks/GeoLocationHook";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <GeoLocationProvider>
            <BackgroundImageProvider>
                <App />
            </BackgroundImageProvider>
        </GeoLocationProvider>
    </React.StrictMode>
);

reportWebVitals();