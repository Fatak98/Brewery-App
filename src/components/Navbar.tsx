import { Link } from "react-router-dom";
import styles from "./Navbar.module.css"; // Import the CSS module

function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Link to="/">🍻 Brewery Finder</Link>
            </div>
            <ul className={styles.navLinks}>
                <li>
                    <Link to="/" className={styles.navItem}>About beers</Link>
                </li>
                <li>
                    <Link to="/favorites" className={styles.navItem}>Favorites ⭐</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
