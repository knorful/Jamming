import React, { Component } from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import { Spotify } from "../../util/Spotify";
import "./App.css";

class App extends Component {
  state = {
    searchResults: [],
    playlistName: "New Playlist",
    playlistTracks: [],
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
    Spotify.search(term).then((result) => {
      this.setState({
        searchResults: result,
      });
    });
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
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              onAdd={this.addTrack}
              searchResults={this.state.searchResults}
            />
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
      </div>
    );
  }
}

export default App;
