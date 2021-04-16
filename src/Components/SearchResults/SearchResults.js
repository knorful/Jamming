import React, { Component } from "react";
import TrackList from "../TrackList/TrackList";
import "./SearchResults.css";

class SearchResults extends Component {
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        {this.props.searchResults.length ? (
          <TrackList
            isRemoval={false}
            onAdd={this.props.onAdd}
            tracks={this.props.searchResults}
            loggedIn={this.props.loggedIn}
          />
        ) : (
          <div className="results-placeholder">
            <p>No Results</p>
          </div>
        )}
      </div>
    );
  }
}

export default SearchResults;
