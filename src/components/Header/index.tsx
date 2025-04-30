import { Link } from "react-router-dom";

function Header() {
    return (
        <div className="header">
            <h1>Bienvenue sur le site officiel de la dépatouilleuse !</h1>
            <ul>
                <Link to={'/'}> Home </Link>
                <Link to={'/map'}> Carte </Link>
                <Link to={'/blog'}> Blog </Link>
                <Link to={'/tips'}> Paye-moi un café </Link>
            </ul>
        </div>


    )
}

export default Header;