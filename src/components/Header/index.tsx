import { Link, useLocation } from "react-router-dom";
import '../../style/css/header.css';


function Header() {
    const location = useLocation();
    var pageName = {'/' : 'HOME', '/map' : 'CARTE', '/blog' : 'BLOG'}[location.pathname];

    return (
        <div className="header">
            <div className="header__banner">
                <h1 className="header__banner__logo">LOGO<br/> DEPATOUILLEUSE</h1>
                <ul className="header__banner__menu">
                    <Link to={'/'} className={location.pathname=='/' ? 'current' : ''} >HOME</Link>
                    <Link to={'/map'} className={location.pathname=='/map' ? 'current' : ''} >CARTE</Link>
                    <Link to={'/blog'} className={location.pathname=='/blog' ? 'current' : ''}>BLOG</Link>
                </ul>
            </div>
            <h2 className="header__pageTitle">
                {pageName + ' —'}
            </h2>
        </div>


    )
}

export default Header;