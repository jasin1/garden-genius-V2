import './SearchBar.css';
import PropTypes from "prop-types";
import {useState} from "react";
import SearchIcon from '../../assets/icon-search.svg';

function SearchBar({onSearch, placeholder, initialValue}){
    const [searchTerm, setSearchTerm] = useState(initialValue || "");

    const handleInputChange = (event) =>{
        setSearchTerm(event.target.value);
    };

    const handleSearch = () =>{
        if(onSearch){
            onSearch(searchTerm);
        }
    }

    const handleKeyPress = (event) =>{
        if(event.key === 'Enter'){
            handleSearch();
        }
    }

    return(
        <div className="search-bar">
            <div className="search-icon-wrapper">
                <img src={SearchIcon} alt="search icon"/>
            </div>
            <input
                className="search-input"
                type="text"
                placeholder={placeholder || "Search for plants..."}
                value={searchTerm}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
            />
            <button className="search-btn" onClick={handleSearch}>Search</button>
        </div>
    )
}

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    initialValue: PropTypes.string
};

export default SearchBar;