import React, { Component } from "react";
import { Spotify } from "../../util/Spotify";

class PlaylistList extends Component {
  state = {
    userPlaylists: [],
  };

  componentDidMount() {
    Spotify.getUserPlaylists().then((res) => console.log(res));
  }
  render() {
    return <div>PlaylistList</div>;
  }
}

export default PlaylistList;
