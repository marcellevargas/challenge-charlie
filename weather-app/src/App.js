import "./App.css";
import BackgroundImage from "./components/BackgroundImage/BackgroundImage";
import { useGeoLocation } from "./hooks/GeoLocationHook";

function App() {
    const location = useGeoLocation();
    if (!location.loaded) {
        return <div>Loading Location...</div>;
    }

    if (location.error) {
        return <div>Error: {location.error}</div>;
    }
    return (
        <>
            name: {location.locationName}
            <BackgroundImage />
        </>
    );
}

export default App;
