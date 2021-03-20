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

  handleTermChange = (e) => {
    this.setState({
      term: e.target.value,
    });
  };

  render() {
    return (
      <div className="SearchBar">
        <input
          onChange={this.handleTermChange}
          placeholder="Enter A Song, Album, or Artist"
        />
        <button onClick={this.search} className="SearchButton">
          SEARCH
        </button>
      </div>
    );
  }
}

export default SearchBar;
