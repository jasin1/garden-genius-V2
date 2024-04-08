import './search.css';
import Navigation from "../../components/Navigation/Navigation.jsx";
import PlantCard from "../../components/PlantCard/PlantCard.jsx"
import Footer from "../../components/Footer/Footer.jsx";
import SearchIcon from "../../assets/icon-search.svg";
import plantImg01 from '../../assets/dummie-plant-01.jpg';
import plantImg02 from '../../assets/dummie-plant-02.jpg';
import plantImg03 from '../../assets/dummie-plant-03.jpg';
import plantImg04 from '../../assets/dummie-plant-04.jpg';


// import searchIcon from "/src/assets/icon-search.svg"

function Search() {
    return (
        <main>
            <article>
                <Navigation/>
                <section className="search-container">
                    <header className="search-header">
                        <h1 className="search-h1">Unleash the superpowers of plants</h1>
                        <div className="search-bar">
                            <div className="search-icon-wrapper">
                                <img src={SearchIcon} alt="search icon"/>
                            </div>
                            <input
                                className="search-input"
                                type="text"
                                placeholder="Search for plants..."
                            />
                            <button className="search-btn">Search</button>
                        </div>
                    </header>
                </section>

                <section className="suggested">
                    <div className="container">
                        <h2>Suggested plants</h2>
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

export default Search;