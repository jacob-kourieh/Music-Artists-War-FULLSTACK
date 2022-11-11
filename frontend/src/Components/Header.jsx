import { Link } from "react-router-dom";
import "./header-css.css"

function Header() {
    return (
        <section className="header">
            <div className="greeting">
                <p>MUSIC</p>
                <p>ARTISTS</p>
                <p>WAR</p>
            </div>

            <section className="nav-link">
                <Link to="/">Home</Link>
                <Link to="/play">Play</Link>
                <Link to="/gallery">Gallery</Link>
                <Link to="/Statistics">Statistics</Link>
                <Link to="/history">History</Link>
            </section>

        </section>
    );
}

export default Header;