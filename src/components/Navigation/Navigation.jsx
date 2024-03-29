import './Navigation.css';
import logo from '../../assets/main-logo.svg';
import user from '../../assets/user-icon-default.svg'
import {NavLink} from "react-router-dom";

function Navigation() {
    return (
        <nav>
            <div className="logo-wrapper">
                <NavLink to="/search" className="nav-link"><img src={logo} alt="GardenGenius Logo"/></NavLink>
            </div>
            <ul className="nav-links">
                <li>
                    <NavLink to="/about" className="nav-link">
                        About
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/profile" className="nav-link">
                        <div className="nav-profile">
                            <span>Login</span>
                            <img src={user} alt="profile-icon"/>
                        </div>
                    </NavLink>
                </li>

            </ul>

        </nav>
    );

}

export default Navigation;
