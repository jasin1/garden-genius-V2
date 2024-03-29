import './Footer.css';
import WhiteLogo from "../../assets/white-logo.svg"

function Footer(){
    return(
        <footer>
            <div className="footer-logo-wrapper">
                <img src={WhiteLogo} alt=""/>
            </div>
        </footer>
    );

}

export default Footer;