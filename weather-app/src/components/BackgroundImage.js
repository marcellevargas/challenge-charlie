import { useEffect, useState } from "react";
import { BingRequests } from "../services/api/BingRequests";
import "./BackgroundImage.css";

export default function BackgroundImage() {
    const [backgroundImg, setBackgroundImg] = useState({
        url: "",
        alt: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        BingRequests()
            .then((data) => {
                setBackgroundImg({ url: data.url, alt: data.copyright });
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="loading">LOADING...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="backgroundImageComponent">
            <img src={backgroundImg.url} alt={backgroundImg.copyright}  loading="lazy"/>
        </div>
    );
}