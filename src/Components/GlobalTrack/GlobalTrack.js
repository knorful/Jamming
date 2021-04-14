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

    let props = this.props;
    let hasPreview = props.track.preview_url ? true : false;
    return (
      <div className="GlobalTrack">
        <div className="GlobalTrack-information">
          <p className="GlobalTrack-rank">{props.rank}</p>
          <div className="GlobalTrack-content" style={{ color: "black" }}>
            <div>
              <h3 style={{ fontSize: "1.33rem" }}>{props.track.name}</h3>
              <p>
                {props.track.artist} | {props.track.album}
              </p>
            </div>
            {hasPreview ? (
              <ReactAudioPlayer
                className="GlobalTrack-audioPlayer"
                controlsList="nodownload"
                src={props.track.preview_url}
                controls
              />
            ) : null}
          </div>
        </div>

        {add}
      </div>
    );
  }
}

export default GlobalTrack;
