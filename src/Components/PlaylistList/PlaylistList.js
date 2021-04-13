import React, { Component } from "react";
import PlaylistItem from "./PlaylistItem/PlaylistItem";
import { Spotify } from "../../util/Spotify";
import "./PlaylistList.css";

class PlaylistList extends Component {
  state = {
    userPlaylists: [],
  };

  render() {
    let playlists = this.state.userPlaylists.map((playlist) => {
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
