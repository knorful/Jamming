import React, { Component } from "react";
import "./PlaylistItem.css";

class PlaylistItem extends Component {
  render() {
    return (
      <div className="PlaylistItem">
        <h3>{this.props.name}</h3>
        <button
          onClick={() =>
            this.props.selectPlaylist(this.props.name, this.props.id)
          }
        >
          Modify
        </button>
      </div>
    );
  }
}

export default PlaylistItem;
