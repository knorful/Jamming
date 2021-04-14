import React, { Component } from "react";
import ReactAudioPlayer from "react-audio-player";
import "./GlobalTrack.css";

class GlobalTrack extends Component {
  state = {
    show: false,
  };
  addTrack = () => {
    this.props.onAdd(this.props.track);
  };

  show = () => {
    this.setState({
      show: !this.state.show,
    });
  };
  render() {
    const add = (
      <button onClick={this.addTrack} className="Track-action">
        +
      </button>
    );

    // let hasPreview = this.props.track.preview_url ? true : false;
    let props = this.props;
    return (
      <div className="GlobalTrack">
        <div className="GlobalTrack-information">
          <p className="GlobalTrack-rank">{props.rank}</p>
          <div style={{ color: "black" }}>
            <h3>{props.track.name}</h3>
            <p>
              {props.track.artist} | {props.track.album}
            </p>
            {/* {hasPreview ? (
              <ReactAudioPlayer src={this.props.track.preview_url} controls />
            ) : null} */}
          </div>
        </div>

        {add}
      </div>
    );
  }
}

export default GlobalTrack;
