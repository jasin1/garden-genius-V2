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
    const [isSearching, setIsSearching] = useState(false);
    const [InputSearch, setInputSearch] = useState('');
    const [noResults, setNoResults] = useState(false);

    const [selectedCountry, setSelectedCountry] = useState(null);
    const [hardinessZones, setHardinessZones] = useState([]);
    // const Hardiness = "1";

    const {likedPlantIds} = useContext(PlantContext);
    console.log('Inhoud Plant context in search page', likedPlantIds);

    const handleCountryChange = (countryName) => {
        const selectedCountryObject = countries.find(
            (country) => country.name === countryName
        )
        setSelectedCountry(selectedCountryObject);
        setHardinessZones(selectedCountryObject ? selectedCountryObject.zones : [])
        console.log("Selected country:", selectedCountryObject);

    };


    useEffect(() => {
        async function fetchData() {
            try {
                const hardinessQuery = selectedCountry ? selectedCountry.zones.join(",") : "";
                const response = await axios.get(`https://perenual.com/api/species-list?key=sk-nmqA66236192cd6f53490&hardiness=${hardinessQuery}`);
                setData(response.data.data);
                console.log("normal results:", response.data.data);
                // console.log("hardiness zones", hardinessQuery);
                // console.log('Hardiness ',hardinessZones);
            } catch (error) {
                // console.error("Error fetching data: ", error.response.request.responseText);
                console.error("Error fetching data: ", error.response.status);
                setError('Het ophalen van de data is mislukt!')

            }
        }

        fetchData();

    }, [likedPlantIds, hardinessZones]);


    const handleSearch = async (searchTerm) => {
        setIsSearching(!!searchTerm.trim());
        setInputSearch(searchTerm);
        try {
            const response = await axios.get(`https://perenual.com/api/species-list?key=sk-nmqA66236192cd6f53490&q=${searchTerm}`);
            const searchResults = response.data.data || [];
            setSearchResults(searchResults);
            console.log("Search result for plants: ", searchResults);
            setNoResults(searchResults.length === 0);
        } catch (error) {
            console.error("Error searching for plants:", error);
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
                        <div className="indicator-txt-wrapper">
                            <p>Need inspiration? Give <span>banana</span> a try! </p>
                        </div>
                    </header>
                </section>

                <section className="suggested">
                    <div className="container">
                        <div className="indicator-header">

                            <h2 className={noResults ? 'no-result' : ''}>
                                {noResults ? (
                                    `No results for ${InputSearch}`
                                ) : (
                                    `${isSearching ? 'Search results' : 'Suggested plants'}`
                                )}
                                {InputSearch && !noResults && (
                                    <span className="searchTerm"> for {InputSearch}</span>
                                )}
                            </h2>

                            {!isSearching && (

                                <Dropdown
                                    options={countries.map((country) => country.name)}
                                    onSelect={handleCountryChange}
                                    selectedOption={selectedCountry ? selectedCountry.name : "Choose a country"}
                                />
                            )}
                        </div>
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
                    </div>
                </section>
                <Footer/>
            </article>
        </main>

    );
}

export default Search;