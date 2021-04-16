import React, { Component } from "react";
import PlaylistItem from "./PlaylistItem/PlaylistItem";
import "./PlaylistList.css";

class PlaylistList extends Component {
  render() {
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
        {this.props.userPlaylists.length ? (
          <div>
            <h2>Local Playlists</h2>
            {playlists}
          </div>
        ) : null}
      </div>
    );
  }
}

export default PlaylistList;
