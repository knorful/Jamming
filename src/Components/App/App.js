import React, { Component } from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Loader from "react-loader-spinner";
import { Spotify } from "../../util/Spotify";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "New Playlist",
      playlistTracks: [],
      searching: false,
    };

    this.searchRef = React.createRef();
  }

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
    this.handleScrollToSearchResults();
    this.setState({
      searching: true,
    });
    setTimeout(() => {
      this.setState({
        searching: false,
      });
    }, 2000);
  };

  handleScrollToSearchResults = () => {
    window.scrollTo({
      top: this.searchRef.current.offsetTop,
      behavior: "smooth",
    });
  };

  savePlaylist = () => {
    let tracksUri = this.state.playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(this.state.playlistName, tracksUri)
      .then((res) => res)
      .catch((e) => console.log("Error from App.js", e));
    this.setState({
      playlistName: "New Playlist",
      playlistTracks: [],
    });
  };

  selectPlaylist = (playlistName, id) => {
    console.log("playlistName: ", playlistName);
    Spotify.getPlaylist(id).then((res) =>
      this.setState({
        playlistName: playlistName,
        playlistTracks: res,
      })
    );
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
          <SearchBar
            spotify={Spotify.getAccessToken}
            onSearch={this.search}
            click={this.handleSearchClick}
          />
          <div className="App-playlist" ref={this.searchRef}>
            {!this.state.searching ? (
              <SearchResults
                onAdd={this.addTrack}
                searchResults={this.state.searchResults}
              />
            ) : (
              <div className="results-loader">
                <p>Searching...</p>
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
              selectPlaylist={this.selectPlaylist}
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
