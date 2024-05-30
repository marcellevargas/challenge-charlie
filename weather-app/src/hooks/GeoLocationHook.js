import { postGeoLocation } from '../services/api/GeolocationRequests';
import { createContext, useState, useContext, useEffect } from 'react';

const GeoLocationHook = createContext();

export const GeoLocationProvider = ({ children }) => {
    const [location, setLocation] = useState({
        loaded: false,
        coordinates: { latitude: "", longitude: "" },
        locationName: "",
        error: null
    });

    const onSuccess = async location => {
        const { latitude, longitude } = location.coords;
        setLocation(prevState => ({
            ...prevState,
            loaded: true,
            coordinates: {
                latitude: latitude,
                longitude: longitude
            },
        }));

        try {
            const locationName = await postGeoLocation(latitude, longitude);
            
            setLocation(prevState => ({
                ...prevState,
                locationName: locationName.results[0].components.state
            }));
        } catch (error) {
            setLocation(prevState => ({
                ...prevState,
                error: error.message
            }));
        }
    };

    const onError = error => {
        setLocation({
            loaded: true,
            coordinates: { latitude: "", longitude: "" },
            locationName: "",
            error: error.message
        });
    };

    useEffect(() => {
        if (!navigator.geolocation) {
            onError({ message: "Geolocation is not supported by your browser." });
        } else {
            navigator.geolocation.getCurrentPosition(onSuccess, onError, {timeout: 20000});
        }
    }, []);

    return (
        <GeoLocationHook.Provider value={location}>
            {children}
        </GeoLocationHook.Provider>
    );
}

export const useGeoLocation = () => {
    const context = useContext(GeoLocationHook);
    if (context === undefined) {
        throw new Error('useGeoLocation must be used within a GeoLocationProvider');
    }
    return context;
}

export default GeoLocationHook;