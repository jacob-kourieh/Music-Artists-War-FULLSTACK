import { Link } from "react-router-dom";
import "./header-css.css"

function Header() {
    return (
        <section className="header">
            <div className="greeting brand">
                <p>MUSIC</p>
                <p>ARTISTS</p>
                <p>WAR</p>
            </div>

            <div className="menu-btn"></div>

            <section className="nav-link navigation">
                <Link to="/" lang="en" data-i18n="home">Home</Link>
                <Link to="/play" data-i18n="play">Play</Link>
                <Link to="/gallery">Gallery</Link>
                <Link to="/Statistics">Statistics</Link>
                <Link to="/history">History</Link>
            </section>

        </section>
    );
}

export default Header;