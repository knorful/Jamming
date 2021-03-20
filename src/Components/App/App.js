import React, { Component } from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Loader from "react-loader-spinner";
import { Spotify } from "../../util/Spotify";
import "./App.css";

class App extends Component {
  state = {
    searchResults: [],
    playlistName: "New Playlist",
    playlistTracks: [],
    searching: false,
    saving: true,
  };

  addTrack = (track) => {
    let copyPlaylist = this.state.playlistTracks.slice();
    if (
      this.state.playlistTracks.find((song) => song.id !== track.id) ||
      copyPlaylist.length === 0
    ) {
      copyPlaylist.push(track);
      this.setState({
        playlistTracks: copyPlaylist,
      });
    }
  };

  removeTrack = (track) => {
    let newPlaylist = this.state.playlistTracks.filter(
      (song) => song.id !== track.id
    );

    this.setState({
      playlistTracks: newPlaylist,
    });
  };

  updatePlaylistName = (newPlaylistName) => {
    this.setState({
      playlistName: newPlaylistName,
    });
  };

  search = (term) => {
    Spotify.search(term)
      .then((result) => {
        this.setState({
          searchResults: result,
        });
      })
      .catch((e) => console.log("There was an error during search!", e));
  };

  handleSearchClick = () => {
    this.setState({
      searching: true,
    });
    setTimeout(() => {
      this.setState({
        searching: false,
      });
    }, 2000);
  };

  savePlaylist = () => {
    let tracksUri = this.state.playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(this.state.playlistName, tracksUri);
    this.setState({
      playlistName: "New Playlist",
      playlistTracks: [],
    });
  };

  render() {
    return (
      <div>
        <header>
          <h1>
            Ja<span className="highlight">mmm</span>ing
          </h1>
        </header>
        <main className="App">
          <SearchBar onSearch={this.search} click={this.handleSearchClick} />
          <div className="App-playlist">
            {!this.state.searching ? (
              <SearchResults
                onAdd={this.addTrack}
                searchResults={this.state.searchResults}
              />
            ) : (
              <div className="results-loader">
                <Loader type="Audio" color="#89b198" height={80} width={80} />
              </div>
            )}
            <Playlist
              onAdd={this.addTrack}
              onSave={this.savePlaylist}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
            />
          </div>
        </main>
        <footer>
          <p>Jammming 2021</p>
          <p>Powered by the Spotify Web API</p>
        </footer>
      </div>
    );
  }
}

export default App;
