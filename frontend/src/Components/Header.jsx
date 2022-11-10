import { NavLink, Link } from "react-router-dom";
import "./header-css.css"

function Header() {
    return (
        <section className="header">
            <div class="greeting">
                <p>MUSIC</p>
                <p>ARTISTS</p>
                <p>WAR</p>
            </div>
            {/*  <h1 className="header-title" > <p>MUSIC</p>  <p>ARTISTS</p> ARTISTS WAR</h1> */}

            <section className="nav-link">
                <NavLink to="/" activeClassName="active" >Home</NavLink>
                <NavLink to="/play" activeClassName="active">Play</NavLink>
                <NavLink to="/gallery" activeClassName="active">Gallery</NavLink>
                <NavLink to="/Statistics" activeClassName="active">Statistics</NavLink>
                <NavLink to="/history" activeClassName="active">History</NavLink>
            </section>

        </section>
    );
}

export default Header;