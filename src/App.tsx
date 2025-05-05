import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/homepage';
import StateBreweries from './pages/StateBreweries';
import FavoritesPage from './pages/FavoritesPage';
import Navbar from './components/Navbar';
import "./App.css";
import "leaflet/dist/leaflet.css";

function App() {
    return (
        <Router>
            <div className="app-container">
                <Navbar />
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/state/:stateAbbr" element={<StateBreweries />} />
                        <Route path="/favorites" element={<FavoritesPage />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;