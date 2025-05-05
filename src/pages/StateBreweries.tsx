import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Card, CardContent, Typography } from "@mui/material";

interface Brewery {
    id: string;
    name: string;
    brewery_type: string;
    city: string;
    state: string;
}

function StateBreweries() {
    const { stateAbbr } = useParams<{ stateAbbr: string }>();
    const [breweries, setBreweries] = useState<Brewery[]>([]);
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState<Brewery[]>([]); // Store favorite breweries

    // Fetch breweries when stateAbbr changes
    useEffect(() => {
        if (!stateAbbr) return;
        const fetchBreweries = async () => {
            try {
                const response = await axios.get(
                    `https://api.openbrewerydb.org/breweries?by_state=${stateAbbr.toLowerCase()}`
                );
                setBreweries(response.data);
            } catch (error) {
                console.error("Error fetching breweries:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBreweries();
    }, [stateAbbr]);

    // Load favorites from localStorage on component mount
    useEffect(() => {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
            try {
                setFavorites(JSON.parse(storedFavorites));
            } catch (error) {
                console.error("Error parsing favorites:", error);
                setFavorites([]); //The empty dependency array [] ensures this runs only once.
            }
        }
    }, []);

    // Function to add/remove a brewery from favorites
    const toggleFavorite = (brewery: Brewery) => {
        let updatedFavorites;
        if (favorites.some((fav) => fav.id === brewery.id)) {
            // Remove from favorites
            updatedFavorites = favorites.filter((fav) => fav.id !== brewery.id);
        } else {
            // Add to favorites
            updatedFavorites = [...favorites, brewery];
        }

        // Update state and localStorage
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    return (
        <div>
            <h1 style={{ backgroundColor: "lightgrey", borderRadius: "5px", padding: "8px", boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)"}}>
                🍺 Breweries in {stateAbbr || "Unknown State"}
            </h1>
            {loading ? (
                <p>Loading breweries...</p>
            ) : breweries.length === 0 ? (
                <p>No breweries found for {stateAbbr}.</p>
            ) : (
                breweries.map((brewery) => (
                    <Card key={brewery.id} sx={{ marginBottom: 2 }}>
                        <CardContent>
                            <Typography variant="h6">{brewery.name || "Unnamed Brewery"}</Typography>
                            <Typography>Type: {brewery.brewery_type || "Unknown"}</Typography>
                            <Typography>📍 {brewery.city || "Unknown City"}, {brewery.state || "Unknown State"}</Typography>
                            <Button
                                variant="contained"
                                color={favorites.some((fav) => fav.id === brewery.id) ? "success" : "secondary"} //If the brewery is in favorites, the button turns green
                                onClick={() => toggleFavorite(brewery)}
                            >
                                {favorites.some((fav) => fav.id === brewery.id) ? "✅ Added to Favorites" : "⭐ Add to Favorites"}
                            </Button>
                        </CardContent>
                    </Card>
                ))
            )}
        </div>
    );
}

export default StateBreweries;
