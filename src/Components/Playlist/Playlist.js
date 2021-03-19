import React, { Component } from "react";
import TrackList from "../TrackList/TrackList";
import "./Playlist.css";

class Playlist extends Component {
  handleNameChange = (e) => {
    const newName = e.target.value;
    this.props.onNameChange(newName);
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
        <button onClick={this.props.onSave} className="Playlist-save">
          SAVE TO SPOTIFY
        </button>
      </div>
    );
  }
}

export default Playlist;
