import axios from "axios";
const CLIENT_ID = "5585dd32cc0046a0a6ca2f6142633b73";
// const REDIRECT_URI = "http://sonics.surge.sh/";
const REDIRECT_URI = "http://localhost:3000/callback";
let accessToken = "";
let expiresIn = "";
let user_id = "";

export const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      expiresIn = expiresInMatch[1];
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
      return accessToken;
    } else {
      const redirect = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
      window.location = redirect;
    }
  },

  async search(term) {
    this.getAccessToken();
    let trackObjects = [];
    try {
      await axios
        .get(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.data.tracks.items)
        .then((tracks) => {
          trackObjects = tracks.map((track) => {
            return {
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              uri: track.uri,
            };
          });
        });
    } catch (e) {
      console.timeLog("Spotify search ERROR");
    }
    return trackObjects;
  },

  async getCurrentUserId() {
    this.getAccessToken();
    if (user_id) {
      return user_id;
    }

    user_id = await axios
      .get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.data.id)
      .catch((e) => console.log("User id fetch error!", e));

    return user_id;
  },

  async savePlaylist(playlistName, trackURIs) {
    if (!playlistName && !trackURIs) {
      return;
    }
    user_id = await this.getCurrentUserId().then((res) => res);
    let playlistID = await axios
      .post(
        `https://api.spotify.com/v1/users/${user_id}/playlists`,
        { name: playlistName },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => res.data.id)
      .catch((e) => console.log("Playlist create failure!", e));

    await axios
      .post(
        `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
        {
          uris: trackURIs,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => console.log("Songs added to playlist", res))
      .catch((e) => console.log("Error adding songs to playlist!", e));
  },
  async getUserPlaylists() {
    if (user_id) {
      return user_id;
    }
    user_id = await this.getCurrentUserId().then((res) => res);
    let playlists = axios
      .get(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.data.items)
      .catch((e) => console.log("error retrieving playlists!"));

    return playlists;
  },
};
