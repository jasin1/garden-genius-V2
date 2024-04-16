import './saved.css';
import Navigation from "../../components/Navigation/Navigation.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import PlantCard from "../../components/PlantCard/PlantCard.jsx";
import plantImg01 from "../../assets/dummie-plant-01.jpg";
import plantImg02 from "../../assets/dummie-plant-02.jpg";
import plantImg03 from "../../assets/dummie-plant-03.jpg";
import plantImg04 from "../../assets/dummie-plant-04.jpg";
import Hero1 from "../../assets/hero-bg-01.jpg";
import Hero2 from "../../assets/hero-bg-02.jpg";
import Hero3 from "../../assets/hero-bg-03.jpg";

function saved() {
    return (
        <main>
            <article>
                <Navigation/>
                <header className="hero">
                    <img src={Hero3} alt="Hero image for the profile page"/>
                </header>
                <section className="suggested">
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
    );

}

export default saved;