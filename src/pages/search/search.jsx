import './search.css';
import Navigation from "../../components/Navigation/Navigation.jsx";
import SearchIcon from "../../assets/icon-search.svg"

// import searchIcon from "/src/assets/icon-search.svg"

function Search() {
    return (
        <main>
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
                        <button>Search</button>
                    </div>
                </header>
            </section>


        </main>

    );
}

export default Search;