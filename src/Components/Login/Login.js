import React, { Component } from "react";
import "./Login.css";

class Login extends Component {
  render() {
    return (
      <div className="login">
        <div className="login-prompt">
          <h3>
            This app is powered by Spotify Web API. Please log in to your
            Spotify account
          </h3>
          <button onClick={this.props.login}>Log in to Spotify</button>
        </div>
      </div>
    );
  }
}

export default Login;
