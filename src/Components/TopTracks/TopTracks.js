import React, { Component } from "react";
import "./TopTracks.css";
import GlobalTrack from "../GlobalTrack/GlobalTrack";

class TopTracks extends Component {
  state = {
    showAll: false,
    maxCount: 10,
  };
  render() {
    return (
      <div className="TopTracks">
        <h2 className="TopTracks-header">Global Top 50</h2>
        <p style={{ width: "100%", textAlign: "center", marginBottom: "15px" }}>
          Spotify's daily update of the most played tracks right now - Global
        </p>
        {this.props.top50Tracks.map((track, i) => (
          <GlobalTrack
            onAdd={this.props.onAdd}
            key={track.uri}
            rank={`${i + 1}`}
            track={track}
            loggedIn={this.props.loggedIn}
          />
        ))}
      </div>
    );
  }
}

export default TopTracks;
