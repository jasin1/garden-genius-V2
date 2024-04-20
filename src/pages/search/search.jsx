import './search.css';
import axios from "axios";
import {useState, useEffect} from "react";

import Navigation from "../../components/Navigation/Navigation.jsx";
import PlantCard from "../../components/PlantCard/PlantCard.jsx"
import Footer from "../../components/Footer/Footer.jsx";
import SearchBar from "../../components/SeachBar/SearchBar.jsx";
// import plantImg01 from '../../assets/dummie-plant-01.jpg';
// import plantImg02 from '../../assets/dummie-plant-02.jpg';
// import plantImg03 from '../../assets/dummie-plant-03.jpg';
// import plantImg04 from '../../assets/dummie-plant-04.jpg';


// import searchIcon from "/src/assets/icon-search.svg"

function Search() {
    const [data, setData] = useState(null);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`https://perenual.com/api/species-list?key=sk-nmqA66236192cd6f53490`);
                setData(response.data);
                console.log("Search results:", data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        }

        fetchData();

    }, []);

    const handleSearch = async (searchTerm) => {
        try {
            const response = await axios.get(`https://perenual.com/api/species-list?key=sk-nmqA66236192cd6f53490&q=${searchTerm}`);
            setSearchResults(response.data[0] || []);
            console.log("Search result for plants: ", response.data);
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
                        <div className="testdata">
                            {/*<button type="button" onClick={fetchData}>test data</button>*/}
                        </div>
                        <div className="grid">
                            {/*{searchResults && searchResults.map((plant) => (*/}
                            {/*    <PlantCard*/}

                            {/*        key={plant.id}*/}
                            {/*        plantName={plant.common_name}*/}
                            {/*        subName={plant.scientific_name.join(", ")}*/}
                            {/*        image={plant.default_image && plant.default_image.small_url}*/}
                            {/*    />*/}
                            {/*))}*/}
                            <PlantCard
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