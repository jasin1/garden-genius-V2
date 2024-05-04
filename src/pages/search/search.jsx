import './search.css';
import axios from "axios";
import {useState, useEffect, useContext} from "react";
import {PlantContext} from '../../context/PlantContext.jsx';

import Navigation from "../../components/Navigation/Navigation.jsx";
import PlantCard from "../../components/PlantCard/PlantCard.jsx"
import Footer from "../../components/Footer/Footer.jsx";
import SearchBar from "../../components/SeachBar/SearchBar.jsx";
import Dropdown from "../../components/Dropdown/Dropdown.jsx";
import countries from "../../assets/countries.json";


// import searchIcon from "/src/assets/icon-search.svg"

function Search() {
    const [data, setData] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState('');

    const [selectedCountry, setSelectedCountry] = useState(null);
    const [hardinessZones, setHardinessZones] = useState([]);
    const Hardiness = "1";

    const {likedPlantIds} = useContext(PlantContext);
    console.log('Inhoud Plant context in search page', likedPlantIds);


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

    }, [likedPlantIds]);


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

    const handleCountryChange = (countryName) =>{
        const selectedCountryObject = countries.find(
            (country) => country.name === countryName
        )

        setSelectedCountry(selectedCountryObject);

        setHardinessZones(selectedCountryObject ? selectedCountryObject.zones : [])

    };


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
                        <p>for example search for banana </p>
                        <Dropdown
                            options={countries.map((country) => country.name)}
                            onSelect={handleCountryChange}
                            selectedOption={selectedCountry ? selectedCountry.name : "Choose a country"}
                        />
                    </header>
                </section>

                <section className="suggested">
                    <div className="container">
                        <h2>{searchResults.length > 0 ? 'Search results' : 'Suggested plants'}</h2>
                        <div className="grid">
                            {error && <p>{error}</p>}
                            {searchResults.length > 0 ? (
                                searchResults.map((plant) => (
                                    <PlantCard
                                        key={plant.id}
                                        id={plant.id}
                                        plantName={plant.common_name}
                                        subName={plant.scientific_name.join(", ")}
                                        image={plant.default_image && plant.default_image.small_url}
                                    />
                                ))
                            ) : (
                                data.map((plant) => (
                                    <PlantCard
                                        key={plant.id}
                                        id={plant.id}
                                        plantName={plant.common_name}
                                        subName={plant.scientific_name.join(", ")}
                                        image={plant.default_image && plant.default_image.small_url}
                                    />
                                ))
                            )}
                        </div>

                        {/*<div className="grid">*/}
                        {/*    {error && <p>{error}</p>}*/}
                        {/*    {data && data.map((plant) => (*/}
                        {/*        <PlantCard*/}
                        {/*            key={plant.id}*/}
                        {/*            id={plant.id}*/}
                        {/*            plantName={plant.common_name}*/}
                        {/*            subName={plant.scientific_name.join(", ")}*/}
                        {/*            image={plant.default_image && plant.default_image.small_url}*/}
                        {/*        />*/}
                        {/*    ))}*/}

                        {/*</div>*/}
                    </div>
                </section>
                <Footer/>
            </article>
        </main>

    );
}

export default Search;