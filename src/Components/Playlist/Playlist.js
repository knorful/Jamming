import React, { Component } from "react";
import TrackList from "../TrackList/TrackList";
import Loader from "react-loader-spinner";
import "./Playlist.css";

class Playlist extends Component {
  state = {
    saving: false,
    message: "",
  };

  handleNameChange = (e) => {
    const newName = e.target.value;
    this.props.onNameChange(newName);
  };

  handleSaveClick = () => {
    this.setState({
      saving: true,
    });
    setTimeout(() => {
      this.setState({
        saving: false,
        message: "Playlist Saved",
      });
    }, 2000);
  };

  render() {
    return (
      <div className="Playlist">
        <input onChange={this.handleNameChange} defaultValue={"New Playlist"} />
        <TrackList
          onRemove={this.props.onRemove}
          isRemoval={true}
          tracks={this.props.playlistTracks}
        />
        {!this.state.saving ? (
          <>
            <button
              onClick={() => {
                this.props.onSave();
                this.handleSaveClick();
              }}
              className="Playlist-save"
            >
              SAVE TO SPOTIFY
            </button>
            <span className="playlist-msg">{this.state.message}</span>
          </>
        ) : (
          <div className="loader">
            <Loader type="Audio" color="#89b198" height={80} width={80} />
          </div>
        )}
      </div>
    );
  }
}

export default Playlist;
