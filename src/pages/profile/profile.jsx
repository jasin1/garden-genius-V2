import './profile.css';
import Navigation from "../../components/Navigation/Navigation.jsx";
import PlantCard from "../../components/PlantCard/PlantCard.jsx";
import Hero from "../../assets/profile-hero.jpg";
import Footer from "../../components/Footer/Footer.jsx";
import plantImg01 from "../../assets/dummie-plant-01.jpg";
import plantImg02 from "../../assets/dummie-plant-02.jpg";
import plantImg03 from "../../assets/dummie-plant-03.jpg";
import plantImg04 from "../../assets/dummie-plant-04.jpg";
import {AuthContext} from "../../context/AuthContext.jsx";
import {useContext} from "react";

function Profile() {

    const { logout} = useContext(AuthContext);



    return (
        <main>
            <article>
                <Navigation/>
                <header className="hero">
                    <img src={Hero} alt="Hero image for the profile page"/>
                </header>
                <section className="suggested">
                    <div className="block-top">
                        <div className="heading-block">
                            <h1>Stephanie S.</h1>
                            <p>Id sit odio ac integer tincidunt pellentesque id consectetur consequat. Elementum sodales
                                et ut euismod lobortis faucibus vivamus sit magnis. Mi laoreet scelerisque scelerisque
                                non amet purus. Penatibus ac nec eu vel malesuada nunc. </p>
                        </div>

                    </div>

                    <div className="container">
                        <h2>Saved Plants</h2>
                        <div className="grid">
                            <PlantCard
                                plantName="Plant Name"
                                subName="a long plant subname weet je wel"
                                image={plantImg01}
                            />
                            <PlantCard
                                plantName="Plant Name"
                                subName="a long plant subname weet je wel"
                                image={plantImg02}
                            />
                            <PlantCard
                                plantName="Plant Name"
                                subName="a long plant subname weet je wel"
                                image={plantImg03}
                            />
                            <PlantCard
                                plantName="Plant Name"
                                subName="a long plant subname weet je wel"
                                image={plantImg04}
                            />
                        </div>
                    </div>
                </section>
                <Footer/>
            </article>
        </main>
    )
}

export default Profile;
