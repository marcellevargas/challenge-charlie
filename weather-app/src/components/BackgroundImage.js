import { useContext } from 'react';
import BackgroundImageHook from '../hooks/BackgroundImageHook';
import "./BackgroundImage.css";

export default function BackgroundImage() {
    const { backgroundImg, loading, error } = useContext(BackgroundImageHook);

    if (loading) {
        return <div className="loading">LOADING...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!backgroundImg.url) {
        return <div>Loading image...</div>;
    }

    return (
        <div className="backgroundImageComponent">
            <img src={backgroundImg.url} alt={backgroundImg.alt} loading="lazy" />
        </div>
    );
}