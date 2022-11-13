import { Link } from "react-router-dom";
import startLogo from '../img/start-logo.png'

function StartPage() {
    return (
        <Link to="/play" className="link-start-page">
            <section className="start-contaiener">
                <img className="logo-img" src={startLogo} alt="start-logo" />
                <h1>Music Artist War</h1>
            </section>
        </Link>
    )
}

export default StartPage;