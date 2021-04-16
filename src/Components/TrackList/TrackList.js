import React, { Component } from "react";
import "./TrackList.css";
import Track from "../Track/Track";

class TrackList extends Component {
  render() {
    return (
      <div className="TrackList">
        {this.props.tracks.map((track) => (
          <Track
            remove={this.props.isRemoval}
            onRemove={this.props.onRemove}
            onAdd={this.props.onAdd}
            key={track.id}
            track={track}
            loggedIn={this.props.loggedIn}
          />
        ))}
      </div>
    );
  }
}

export default TrackList;
