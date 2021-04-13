import React, { Component } from "react";
import "./SearchBar.css";

class SearchBar extends Component {
  state = {
    term: "",
  };

  search = () => {
    const searchTerm = this.state.term;
    this.props.onSearch(searchTerm);
    this.props.click();
  };

  handleTermChange = ({ target }) => {
    this.setState({
      term: target.value,
    });
  };

  render() {
    return (
      <div className="SearchBar">
        <p>
          Search Spotify to create a custom playlist by song, album, or artist
        </p>
        <div className="search-content">
          <input
            onChange={this.handleTermChange}
            placeholder="Enter A Song, Album, or Artist"
          />
          <button onClick={this.search} className="SearchButton">
            SEARCH
          </button>
        </div>
      </div>
    );
  }
}

export default SearchBar;
