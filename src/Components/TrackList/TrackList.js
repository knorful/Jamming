import React, { Component } from "react";
import "./TrackList.css";
import Track from "../Track/Track";

class TrackList extends Component {
  render() {
    console.log("this is the props passed to tracklist: ", this.props.tracks);
    return (
      <div className="TrackList">
        {this.props.tracks.map((track) => (
          <Track key={track.id} track={track} />
        ))}
      </div>
    );
  }
}

export default TrackList;
