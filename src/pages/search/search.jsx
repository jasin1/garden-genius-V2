import './search.css';
import axios from "axios";
import {useState, useEffect} from "react";

import Navigation from "../../components/Navigation/Navigation.jsx";
import PlantCard from "../../components/PlantCard/PlantCard.jsx"
import Footer from "../../components/Footer/Footer.jsx";
import SearchBar from "../../components/SeachBar/SearchBar.jsx";



// import searchIcon from "/src/assets/icon-search.svg"

function Search() {
    const [data, setData] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState('');
    const Hardiness = "8a";


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`https://perenual.com/api/species-list?key=sk-nmqA66236192cd6f53490&hardiness=${Hardiness}`);
                setData(response.data.data);
                console.log("normal results:", response.data.data);
            } catch (error) {
                // console.error("Error fetching data: ", error.response.request.responseText);
                console.error("Error fetching data: ", error.response.status);
                setError('Het ophalen van de data is mislukt!')

            }
        }

        fetchData();

    }, []);


    const handleSearch = async (searchTerm) => {
        try {
            const response = await axios.get(`https://perenual.com/api/species-list?key=sk-nmqA66236192cd6f53490&q=${searchTerm}`);
            setSearchResults(response.data.data || []);
            console.log("Search result for plants: ", response.data.data);
        } catch (error) {
            console.error("Error searchin for plants:", error);
        }
        console.log("Search term :", searchTerm)
    }


    return (
        <main>
            <article>
                <Navigation/>
                <section className="search-container">
                    <header className="search-header">
                        <h1 className="search-h1">Unleash the superpowers of plants</h1>
                        <SearchBar
                            onSearch={handleSearch}
                            placeholder="Search for plants..."

                        />
                    </header>
                </section>

                <section className="suggested">
                    <div className="container">
                        <h2>Suggested plants</h2>

                        <div className="grid">
                            {error && <p>{error}</p>}
                            {data && data.map((plant) => (
                                <PlantCard
                                    key={plant.id}
                                    plantName={plant.common_name}
                                    subName={plant.scientific_name.join(", ")}
                                    image={plant.default_image && plant.default_image.small_url}
                                />
                            ))}

                        </div>
                        <p>dummies</p>
                        <div className="grid">
                            <PlantCard />
                            <PlantCard />
                            <PlantCard />
                            <PlantCard />
                        </div>
                    </div>
                </section>
                <Footer/>
            </article>
        </main>

    );
}

export default Search;