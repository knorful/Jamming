import React, { Component } from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>
            Ja<span className="highlight">mmm</span>ing
          </h1>
        </header>
        <main className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults />
            {/* <!-- Add a Playlist component --> */}
          </div>
        </main>
      </div>
    );
  }
}

export default App;
