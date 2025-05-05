import { useEffect, useState } from "react";
import { MapContainer, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./map.css";

function Map() {
    const [geoJsonData, setGeoJsonData] = useState<never | null>(null);

    useEffect(() => {
        fetch("/us-states.json")
            .then((response) => response.json())
            .then((data) => {
                if (data?.features) {
                    setGeoJsonData(data);
                } else {
                    console.error("Invalid GeoJSON data:", data);
                }
            })
            .catch((error) => console.error("Error loading GeoJSON:", error));
    }, []);

    return (
        <div className="map-wrapper">
            {geoJsonData ? (
                <MapContainer className="map-container" center={[37.8, -96]} zoom={12}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                </MapContainer>
            ) : (
                <p>Loading map...</p>
            )}
        </div>
    );
}

export default Map;