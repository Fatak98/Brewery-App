import { useState, useEffect } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";

interface Brewery {
    id: string;
    name: string;
    brewery_type: string;
    city: string;
    state: string;
}

function Favorites() {
    const [favorites, setFavorites] = useState<Brewery[]>([]);

    // Load favorites from localStorage on component mount
    useEffect(() => {
        const savedFavorites = localStorage.getItem("favorites");
        if (savedFavorites) {
            try {
                const parsedFavorites: Brewery[] = JSON.parse(savedFavorites);
                if (Array.isArray(parsedFavorites)) {
                    setFavorites(parsedFavorites);
                } else {
                    setFavorites([]);
                }
            } catch (error) {
                console.error("Error parsing favorites:", error);
                setFavorites([]);
            }
        }
    }, []);

    // Function to remove a favorite
    const removeFavorite = (id: string) => {
        const updatedFavorites = favorites.filter((fav) => fav.id !== id);
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1 style={{ backgroundColor: "lightgrey", borderRadius: "5px", padding: "8px", textAlign: "center", boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)" }}>
                ⭐ Favorite Breweries
            </h1>

            {favorites.length === 0 ? (
                <p style={{ textAlign: "center", fontSize: "1.2rem", marginTop: "20px" }}>No favorites yet. Add some from the list!</p>
            ) : (
                favorites.map((brewery) => (
                    <Card key={brewery.id} sx={{ marginBottom: 2, boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)" }}>
                        <CardContent>
                            <Typography variant="h6">{brewery.name || "Unnamed Brewery"}</Typography>
                            <Typography>Type: {brewery.brewery_type || "Unknown"}</Typography>
                            <Typography>📍 {brewery.city || "Unknown City"}, {brewery.state || "Unknown State"}</Typography>
                            <Button
                                variant="contained"
                                color="error"
                                sx={{ marginTop: "10px" }}
                                onClick={() => removeFavorite(brewery.id)}
                            >
                                ❌ Remove
                            </Button>
                        </CardContent>
                    </Card>
                ))
            )}
        </div>
    );
}

export default Favorites;
