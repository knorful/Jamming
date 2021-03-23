import React, { Component } from "react";
import "./PlaylistItem.css";

class PlaylistItem extends Component {
  render() {
    return (
      <div className="PlaylistItem">
        <h3>{this.props.name}</h3>
      </div>
    );
  }
}

export default PlaylistItem;
