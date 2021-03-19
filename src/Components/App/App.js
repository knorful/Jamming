import React, { Component } from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import { Spotify } from "../../util/Spotify";
import "./App.css";

class App extends Component {
  state = {
    searchResults: [
      {
        name: "All Falls Down",
        artist: "Kanye West",
        album: "College Dropout",
        id: 1,
      },
      {
        name: "Dead Presidents",
        artist: "Jay-Z",
        album: "Reasonable Doubt",
        id: 2,
      },
      {
        name: "Pink + White",
        artist: "Frank Ocean",
        album: "Blonde",
        id: 3,
      },
    ],
    playlistName: "New Playlist",
    playlistTracks: [
      {
        name: "Roll Some Mo'",
        artist: "Lucky Daye",
        album: "Lucky Daye",
        id: 4,
      },
      {
        name: "Flex On 'Em",
        artist: "Money J",
        album: "Dollarz",
        id: 5,
      },
      {
        name: "Jungle Jim",
        artist: "Taxadermist",
        album: "Jamz",
        id: 6,
      },
    ],
  };

  addTrack = (track) => {
    let copyPlaylist = this.state.playlistTracks.slice();
    if (this.state.playlistTracks.find((song) => song.id !== track.id)) {
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

  savePlaylist = () => {};

  render() {
    Spotify.getAccessToken();
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
