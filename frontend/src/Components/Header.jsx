import { useState } from "react";
import { Link } from "react-router-dom";
import "./header-css.css"
import { FiMenu, FiX } from 'react-icons/fi';

function Header() {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const closeMenu = () => {
        setOpen(false);
    };




    return (

        <nav className="navbar">
            <Link to="/" className="nav-logo">
                <div className="greeting brand">
                    <p>MUSIC</p>
                    <p>ARTISTS</p>
                    <p>WAR</p>
                </div>
            </Link>
            <div onClick={handleClick} className="nav-icon">
                {open ? <FiX /> : <FiMenu />}
            </div>
            <ul className={open ? 'nav-links active' : 'nav-links'}>
                <li className="nav-item">
                    <Link to="/" className="nav-link" onClick={closeMenu}>
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/play" className="nav-link" onClick={closeMenu}>
                        Play
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/gallery" className="nav-link" onClick={closeMenu}>
                        Gallery
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/Statistics" className="nav-link" onClick={closeMenu}>
                        Statistics
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/history" className="nav-link" onClick={closeMenu}>
                        History
                    </Link>
                </li>
            </ul>
        </nav>



    );
}

export default Header;