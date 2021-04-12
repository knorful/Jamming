import React, { Component } from "react";
import "./SearchBar.css";

class SearchBar extends Component {
  state = {
    term: sessionStorage.getItem("searchTerm") || "",
  };

  search = () => {
    const searchTerm = this.state.term;
    // sessionStorage.setItem("searchTerm", searchTerm);
    this.props.onSearch(searchTerm);
    this.props.click();
  };

  handleTermChange = (e) => {
    this.setState({
      term: e.target.value,
    });
  };

  render() {
    return (
      <div className="SearchBar">
        <p>
          Search Spotify to create a custom playlist by song, album, or artist
        </p>
        <input
          onChange={this.handleTermChange}
          placeholder="Enter A Song, Album, or Artist"
          value={this.state.term}
        />
        <button onClick={this.search} className="SearchButton">
          SEARCH
        </button>
      </div>
    );
  }
}

export default SearchBar;
