import React, { createContext, useState, useEffect } from 'react';
import { bingRequests } from "../services/https/bingRequests";

const BackgroundImageHook = createContext();

export const BackgroundImageProvider = ({ children }) => {
    const [backgroundImg, setBackgroundImg] = useState({ url: "", alt: "" });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
 
    useEffect(() => {
        bingRequests()
            .then(data => {
                setBackgroundImg({ url: data.url, alt: data.copyright });
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    return (
        <BackgroundImageHook.Provider value={{ backgroundImg, loading, error }}>
            {children}
        </BackgroundImageHook.Provider>
    );
}

export default BackgroundImageHook;