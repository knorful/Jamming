import React, { Component } from "react";
import "./Track.css";

class Track extends Component {
  state = {
    isRemoval: false,
  };

  renderAction = () => {};
  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist | this.props.track.album}</p>
        </div>
        <button className="Track-action">
          {this.state.isRemoval ? "-" : "+"}
        </button>
      </div>
    );
  }
}

export default Track;
