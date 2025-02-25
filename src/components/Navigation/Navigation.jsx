import {useState, useEffect} from "react";
import './Navigation.css';
import logo from '../../assets/main-logo.svg';
import {NavLink} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext.jsx";
import {useContext} from "react";




function Navigation() {
    const [showMenu, setShowMenu] = useState(false);
    const { logout, user} = useContext(AuthContext);

    function handleLogOut(){
        logout();
    }


    const toggleMenu = () =>{
        if(window.innerWidth <= 768){
            setShowMenu(!showMenu);
        } else{
            setShowMenu(false);
        }

    }

    useEffect(()=>{
        const handleResize = ()=>{
            if(window.innerWidth > 768){
                setShowMenu(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);

    },[]);


    return (
        <nav>
            <div className="nav-logo-wrapper">
                <NavLink to="/search" className={(isActive)=>"navActive" + (!isActive ? "nav-link" : "")}><img src={logo} alt="GardenGenius Logo" className="main-logo"/></NavLink>
            </div>
            <ul className={`nav-links ${showMenu ? 'active': ''}`}>
                <li>
                    <NavLink to="/search" className={`nav-link${location.pathname ==='/search' ? ' navActive' : ''}`}>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/onboarding" className="nav-link">
                        About
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/saved" className={`nav-link${location.pathname ==='/saved' ? ' navActive' : ''}`}>
                        Saved Plants
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/profile" className={`nav-link${location.pathname ==='/profile' ? ' navActive' : ''}`}>
                        Profile
                    </NavLink>
                </li>
                <li>
                        <div className="nav-profile nav-link" onClick={handleLogOut}>
                            <span>{user ? "Logout" : "Login"}</span>
                            <svg className="userIcon" width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path className="userIcon-path" d="M22.5002 45.0001C19.0984 45.0096 15.7395 44.2399 12.6812 42.75C11.562 42.2056 10.4896 41.5697 9.47497 40.8488L9.16672 40.6237C6.37632 38.5641 4.09494 35.8925 2.49772 32.814C0.845631 29.6277 -0.0112336 26.0891 0.000111202 22.5C0.000111202 10.0736 10.0738 0 22.5002 0C34.9266 0 45.0003 10.0736 45.0003 22.5C45.0116 26.0874 44.1555 29.6243 42.505 32.8095C40.91 35.8862 38.6318 38.5569 35.845 40.617C34.7937 41.3865 33.6781 42.064 32.5105 42.642L32.3305 42.732C29.2703 44.2298 25.9073 45.0057 22.5002 45.0001ZM22.5002 33.75C19.1285 33.7434 16.0375 35.6266 14.497 38.6257C19.5401 41.1237 25.4603 41.1237 30.5035 38.6257V38.6145C28.9611 35.6186 25.8699 33.7397 22.5002 33.75ZM22.5002 29.25C27.374 29.2564 31.8679 31.8828 34.2655 36.126L34.2992 36.0967L34.3307 36.0698L34.2925 36.1035L34.27 36.1215C39.9602 31.2055 41.9949 23.2703 39.3722 16.2227C36.7495 9.17522 30.0222 4.50071 22.5025 4.50071C14.9828 4.50071 8.25546 9.17522 5.63276 16.2227C3.01007 23.2703 5.04473 31.2055 10.735 36.1215C13.1341 31.8803 17.6275 29.2559 22.5002 29.25ZM22.5002 27C17.5297 27 13.5002 22.9706 13.5002 18C13.5002 13.0294 17.5297 9 22.5002 9C27.4708 9 31.5002 13.0294 31.5002 18C31.5002 20.3869 30.552 22.6761 28.8642 24.364C27.1764 26.0518 24.8872 27 22.5002 27ZM22.5002 13.5C20.0149 13.5 18.0002 15.5147 18.0002 18C18.0002 20.4853 20.0149 22.5 22.5002 22.5C24.9855 22.5 27.0002 20.4853 27.0002 18C27.0002 15.5147 24.9855 13.5 22.5002 13.5Z" fill="#284627"/>
                            </svg>

                        </div>
                </li>

            </ul>
            <div className="burger-menu" onClick={toggleMenu}>
                <div className="burger-line"></div>
                <div className="burger-line"></div>
                <div className="burger-line"></div>
            </div>

        </nav>
    );

}

export default Navigation;
