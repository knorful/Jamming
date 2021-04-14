import React, { Component } from "react";
import PlaylistItem from "./PlaylistItem/PlaylistItem";
import "./PlaylistList.css";

class PlaylistList extends Component {
  render() {
    console.log("playlistlist", this.props);
    let playlists = this.props.userPlaylists.map((playlist) => {
      return (
        <PlaylistItem
          selectPlaylist={this.props.selectPlaylist}
          id={playlist.id}
          name={playlist.name}
          key={playlist.id}
        />
      );
    });

    return (
      <div className="PlaylistList">
        <div>
          <h2>Local Playlists</h2>
          {playlists}
        </div>
      </div>
    );
  }
}

export default PlaylistList;
