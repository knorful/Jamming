import React, { Component } from "react";
import "./PlaylistItem.css";

class PlaylistItem extends Component {
  render() {
    return (
      <div className="PlaylistItem">
        <h3
          onClick={() =>
            this.props.selectPlaylist(this.props.name, this.props.id)
          }
        >
          {this.props.name}
        </h3>
      </div>
    );
  }
}

export default PlaylistItem;
