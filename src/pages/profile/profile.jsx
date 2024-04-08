import './profile.css';
import Navigation from "../../components/Navigation/Navigation.jsx";
import PlantCard from "../../components/PlantCard/PlantCard.jsx";
import Hero from "../../assets/profile-hero.jpg";
import Avatar from "../../assets/user-avatar.svg";
import Footer from "../../components/Footer/Footer.jsx";

function profile(){
    return(
        <main>
            <article>
                <Navigation/>
                <header className="hero">
                    <div className="avatar-wrapper">
                        <img src={Avatar} alt=""/>
                    </div>
                    <img src={Hero} alt="Hero image for the profile page"/>
                </header>
                <section className="container">

                </section>
                <Footer/>
            </article>
        </main>
    )
}

export default profile;
