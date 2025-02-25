import "./search.css";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { PlantContext } from "../../context/PlantContext.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";

import Navigation from "../../components/Navigation/Navigation.jsx";
import PlantCard from "../../components/PlantCard/PlantCard.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import SearchBar from "../../components/SeachBar/SearchBar.jsx";
import Dropdown from "../../components/Dropdown/Dropdown.jsx";
import countries from "../../assets/countries.json";
import Header from "../../components/Headers/Header.jsx";
import Notification from "../../components/Notification/Notification.jsx";
import Modal from "../../components/Modal/Modal.jsx";
import Spinner from "../../components/Spinner/Spinner.jsx";

function Search() {
  const [data, setData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [InputSearch, setInputSearch] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const { savedPlants } = useContext(PlantContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const { user } = useContext(AuthContext);

  const handleCountryChange = (countryName) => {
    const selectedCountryObject = countries.find(
      (country) => country.name === countryName,
    );
    setSelectedCountry(selectedCountryObject);
  };

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const hardinessQuery = selectedCountry
          ? selectedCountry.zones.join(",")
          : "";
        const response = await axios.get(
          `https://perenual.com/api/species-list?key=${
            import.meta.env.VITE_API_KEY
          }&hardiness=${hardinessQuery}`,
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data: ", error.response.status);
        setError("Het ophalen van de data is mislukt!");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [savedPlants, selectedCountry, searchResults]);

  const handleSearch = async (searchTerm) => {
    setIsLoading(true);
    setIsSearching(!!searchTerm.trim());
    setInputSearch(searchTerm);
    try {
      const response = await axios.get(
        `https://perenual.com/api/species-list?key=sk-nmqA66236192cd6f53490&q=${searchTerm}`,
      );
      const searchResults = response.data.data || [];
      setSearchResults(searchResults);
      setNoResults(searchResults.length === 0);
    } catch (error) {
      console.error("Error searching for plants:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseNotification = () => {
    setError(null);
  };

  const triggerModal = () => {
    setIsModalOpen(true);
    console.log("Modal should open", isModalOpen);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main>
      <article>
        <Navigation />
        <section className="search-container">
          <header className="search-header">
            <span>
              {user
                ? `Welcome, ${user.user_metadata.username}`
                : "Please log in"}
            </span>
            <h1 className="search-h1">Unleash the superpowers of plants</h1>
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search for plants..."
            />
            <div className="indicator-txt-wrapper">
              <p>
                Need inspiration? Give <span>banana</span> a try!{" "}
              </p>
            </div>
          </header>
        </section>

        <section className="suggested">
          <div className="container">
            <div className="indicator-header">
              <Header Tag="h2" className={noResults ? "no-result" : ""}>
                {noResults
                  ? `No results for ${InputSearch}`
                  : `${isSearching ? "Search results" : "Suggested plants"}`}
                {InputSearch && !noResults && (
                  <span className="searchTerm"> for {InputSearch}</span>
                )}
              </Header>

              {!isSearching && (
                <Dropdown
                  options={countries.map((country) => country.name)}
                  onSelect={handleCountryChange}
                  selectedOption={
                    selectedCountry ? selectedCountry.name : "Choose a country"
                  }
                />
              )}
            </div>
            <div className="grid">
              {isLoading ? (
                <Spinner />
              ) : error ? (
                <p>{error}</p>
              ) : searchResults.length > 0 ? (
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
                    triggerModal={triggerModal}
                  />
                ))
              )}
            </div>
          </div>
        </section>
        <Footer />
        {error && (
          <Notification message={error} onClose={handleCloseNotification} />
        )}
        {isModalOpen && <Modal onClose={handleCloseModal} />}
      </article>
    </main>
  );
}

export default Search;
