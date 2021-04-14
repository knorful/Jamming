import React, { Component } from "react";
import TrackList from "../TrackList/TrackList";
import PlaylistList from "../PlaylistList/PlaylistList";
import Loader from "react-loader-spinner";
import { Spotify } from "../../util/Spotify";
import "./Playlist.css";

class Playlist extends Component {
  state = {
    saving: false,
    message: "",
    userPlaylists: [],
  };

  handleNameChange = (e) => {
    const newName = e.target.value;
    this.props.onNameChange(newName);
  };

  handleSaveClick = () => {
    this.setState((st) => ({
      saving: true,
      ...st,
    }));
    setTimeout(() => {
      this.setState({
        saving: false,
        message: "Playlist Saved",
      });
    }, 2000);

    this.getPlaylists();
  };

  async getPlaylists() {
    await Spotify.getUserPlaylists().then((res) => {
      this.setState({
        userPlaylists: res,
      });
    });
  }

  render() {
    console.log("rendering...");
    return (
      <div className="Playlist">
        <input
          onChange={this.handleNameChange}
          placeholder="Enter Playlist Name"
          value={this.props.playlistName}
        />
        <TrackList
          onRemove={this.props.onRemove}
          isRemoval={true}
          tracks={this.props.playlistTracks}
        />
        {!this.state.saving ? (
          <>
            <button
              onClick={async () => {
                await this.getPlaylists();
                this.handleSaveClick();
                this.props.onSave();
                this.getPlaylists();
              }}
              className="Playlist-save"
            >
              SAVE TO SPOTIFY
            </button>
            <span className="playlist-msg">{this.state.message}</span>
            <PlaylistList
              userPlaylists={this.state.userPlaylists}
              selectPlaylist={this.props.selectPlaylist}
            />
          </>
        ) : (
          <div className="loader">
            <p className="loader-msg">Saving...</p>
            <Loader type="Audio" color="#89b198" height={80} width={80} />
          </div>
        )}
      </div>
    );
  }
}

export default Playlist;
