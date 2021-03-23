import React, { Component } from "react";
import ReactAudioPlayer from "react-audio-player";
import "./Track.css";

class Track extends Component {
  state = {
    show: false,
  };
  addTrack = () => {
    this.props.onAdd(this.props.track);
  };
  removeTrack = () => {
    this.props.onRemove(this.props.track);
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
    const remove = (
      <button onClick={this.removeTrack} className="Track-action">
        -
      </button>
    );

    let hasPreview = this.props.track.preview_url ? true : false;
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>
            {this.props.track.artist} | {this.props.track.album}
          </p>
          {hasPreview ? (
            <div>
              <button className="preview-btn" onClick={this.show}>
                {this.state.show ? (
                  "X"
                ) : (
                  <i class="fas fa-chevron-circle-right"> Preview Track</i>
                )}
              </button>
              {this.state.show ? (
                <ReactAudioPlayer src={this.props.track.preview_url} controls />
              ) : null}
            </div>
          ) : (
            <p>No Preview</p>
          )}
        </div>
        {this.props.remove ? remove : add}
      </div>
    );
  }
}

export default Track;
