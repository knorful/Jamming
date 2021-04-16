import React, { Component } from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import TopTracks from "../TopTracks/TopTracks";
import Loader from "react-loader-spinner";
import { Spotify } from "../../util/Spotify";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "",
      playlistTracks: [],
      top50Tracks: [],
      loggedIn: sessionStorage.getItem("loggedIn") || false,
      searching: false,
      playlistId: null,
      userPlaylists: [],
    };

    this.searchRef = React.createRef();
  }

  componentDidMount() {
    Spotify.getClientAccessToken();
    Spotify.getGlobalTop50().then((res) => {
      this.setState({
        top50Tracks: res,
      });
    });
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
    let newPlaylist = this.state.playlistTracks.filter((song, i) => {
      Spotify.removeTracksFromPlaylist(song.uri, i);
      return song.id !== track.id;
    });

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
    Spotify.savePlaylist(
      this.state.playlistName,
      tracksUri,
      this.state.playlistId
    )
      .then((res) => res)
      .catch((e) => console.log("Error from App.js", e));
    this.setState({
      playlistName: "New Playlist",
      playlistTracks: [],
    });
  };

  selectPlaylist = (playlistName, id) => {
    Spotify.getPlaylist(id).then((res) =>
      this.setState({
        playlistName: playlistName,
        playlistTracks: res,
        playlistId: id,
      })
    );
  };

  login = () => {
    sessionStorage.setItem("loggedIn", "true");
    Spotify.getAccessToken();
    Spotify.getUserPlaylists().then((res) => {
      this.setState((st) => ({
        ...st,
        userPlaylists: res,
      }));
    });
  };

  render() {
    let showLogin = this.state.loggedIn ? false : true;
    return (
      <div>
        <header>
          <div className="App-header">
            <h1>
              Ja<span className="highlight">mmm</span>ing
            </h1>
            <div className="App-loginContainer">
              <button
                className="App-login"
                style={{ visibility: showLogin ? "visible" : "hidden" }}
                onClick={this.login}
              >
                login{" "}
              </button>
              <i style={{ fontSize: "2rem" }} className="fab fa-spotify"></i>
            </div>
          </div>
        </header>
        <main className="App">
          <SearchBar
            spotify={Spotify.getAccessToken}
            onSearch={this.search}
            click={this.handleSearchClick}
            searchResults={this.state.searchResults}
          />
          <div className="App-global">
            <div className="App-top50">
              <div>
                <h1>Don't know where to start?</h1>
                <p style={{ color: "black", marginTop: "10px" }}>
                  Browse the top 50 songs in the world on Spotify
                </p>
              </div>
              <TopTracks
                onAdd={this.addTrack}
                onRemove={this.removeTrack}
                top50Tracks={this.state.top50Tracks}
                loggedIn={this.state.loggedIn}
              />
            </div>
          </div>
          <div className="App-playlist" ref={this.searchRef}>
            {!this.state.searching ? (
              <SearchResults
                onAdd={this.addTrack}
                searchResults={this.state.searchResults}
                loggedIn={this.state.loggedIn}
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
              login={this.login}
              loggedIn={this.state.loggedIn}
              userPlaylists={this.state.userPlaylists}
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
