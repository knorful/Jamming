import React, { Component } from "react";
import "./SearchBar.css";

class SearchBar extends Component {
  state = {
    term: sessionStorage.getItem("searchTerm") || "",
  };

  componentDidMount() {
    console.log("component mounting...");
  }

  search = () => {
    const searchTerm = this.state.term;
    this.props.onSearch(searchTerm);
    this.props.click();
  };

  handleTermChange = ({ target }) => {
    sessionStorage.setItem("searchTerm", target.value);
    this.setState({
      term: target.value,
    });
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.search();
    }
  };

  render() {
    return (
      <div className="SearchBar">
        <div className="SearchBar-bg">
          <p>
            Search Spotify to create a custom playlist by song, album, or artist
          </p>
          <div className="search-content">
            <input
              onChange={this.handleTermChange}
              placeholder="Enter A Song, Album, or Artist"
              onKeyPress={this.handleKeyPress}
              value={this.state.term}
            />
            <button onClick={this.search} className="SearchButton">
              SEARCH
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBar;
