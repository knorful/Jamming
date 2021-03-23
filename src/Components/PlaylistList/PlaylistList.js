import React, { Component } from "react";
import PlaylistItem from "./PlaylistItem/PlaylistItem";
import { Spotify } from "../../util/Spotify";
import "./PlaylistList.css";

class PlaylistList extends Component {
  state = {
    userPlaylists: [],
  };

  async componentDidMount() {
    let getPlaylists = await Spotify.getUserPlaylists();
    this.setState({
      userPlaylists: getPlaylists,
    });
  }
  render() {
    console.log("user playlists", this.state.userPlaylists);
    let playlists = this.state.userPlaylists.map((playlist) => {
      return (
        <PlaylistItem id={playlist.id} name={playlist.name} key={playlist.id} />
      );
    });
    return (
      <div className="PlaylistList">
        <h2>Local Playlists</h2>
        {playlists}
      </div>
    );
  }
}

export default PlaylistList;
