import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import "./homepage.css";
import { FeatureCollection, Geometry, Feature, GeoJsonProperties } from "geojson";
import rawStates from "../data/us-states.json";

const rawStatesData: FeatureCollection = rawStates as FeatureCollection;

function HomePage() {
    const navigate = useNavigate();
    return (
        <div className="homepage-container">
            <div className="text_container">
                <h1>📍 Select a State</h1>
                <p className="explanation">
                    How It Works 🗺️<br />
                    1️⃣ Select a State – Click on a state on the map to explore it.<br />
                    2️⃣ View Details – A popup will show the state's name and a link to breweries.<br />
                    3️⃣ Navigate Easily – Click the link to explore breweries in that state.
                </p>
            </div>

            {/* Map Container */}
            <MapContainer className="map-container" center={[37.0902, -95.7129]} zoom={4}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                <GeoJSON
                    data={rawStatesData}
                    style={() => ({
                        fillColor: "hsla(326, 47%, 37%, 0.3)",
                        weight: 1,
                        color: "white",
                        fillOpacity: 0.7,
                    })}
                    onEachFeature={(feature: Feature<Geometry, GeoJsonProperties>, layer) => {
                        const stateName: string = feature.properties?.NAME || "Unknown";

                        // Bind the popup
                        layer.bindPopup(`
                            <strong>${stateName}</strong><br/>
                            <a href="/state/${stateName}" target="_blank">View Breweries</a>
                        `);

                        // Event Listeners for interactivity
                        layer.on({
                            mouseover: (e) => {
                                e.target.setStyle({
                                    fillColor: "hsl(320, 100%, 32%)",
                                    fillOpacity: 0.6,
                                    weight: 2,
                                });
                            },
                            mouseout: (e) => {
                                e.target.setStyle({
                                    fillColor: "hsla(326, 47%, 37%, 0.3)",
                                    fillOpacity: 0.7,
                                    weight: 1,
                                });
                            },
                            click: (e) => {
                                navigate(`/state/${stateName}`);
                                layer.openPopup(); // ✅ Opens the popup on click
                            },
                        });
                    }}
                />
            </MapContainer>
        </div>
    );
}

export default HomePage;
