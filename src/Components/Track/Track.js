import React, { Component } from "react";
import "./Track.css";

class Track extends Component {
  renderAction = () => {};
  addTrack = () => {
    this.props.onAdd(this.props.track);
  };
  render() {
    const add = <button className="Track-action">+</button>;
    const remove = <button className="Track-action">-</button>;
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist | this.props.track.album}</p>
        </div>
        {this.props.onRemove ? remove : add}
      </div>
    );
  }
}

export default Track;
