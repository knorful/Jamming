import React, { Component } from "react";
import "./TrackList.css";
import Track from "../Track/Track";

class TrackList extends Component {
  render() {
    let uniqTracks = [...new Set(this.props.tracks.map((t) => t))];
    console.log("uniq tracks", uniqTracks);
    return (
      <div className="TrackList">
        {uniqTracks.map((track) => (
          <Track
            remove={this.props.isRemoval}
            onRemove={this.props.onRemove}
            onAdd={this.props.onAdd}
            key={track.id}
            track={track}
          />
        ))}
      </div>
    );
  }
}

export default TrackList;
