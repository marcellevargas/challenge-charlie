import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BackgroundImageProvider } from "./hooks/BackgroundImage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BackgroundImageProvider>
            <App />
        </BackgroundImageProvider>
    </React.StrictMode>
);

reportWebVitals();
