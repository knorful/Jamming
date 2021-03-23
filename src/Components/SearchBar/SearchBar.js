import React, { Component } from "react";
import "./SearchBar.css";

class SearchBar extends Component {
  state = {
    term: sessionStorage.getItem("searchTerm") || "",
    isLoggedIn: false,
  };

  // checkLogin = () => {
  //   let getAccessToken = this.props.spotify();
  //   console.log("here is the access token", getAccessToken);
  //   let loggedIn = getAccessToken ? true : false;
  //   this.setState({
  //     isLoggedIn: loggedIn,
  //   });
  // };

  search = () => {
    const searchTerm = this.state.term;
    sessionStorage.setItem("searchTerm", searchTerm);
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
