import axios from "axios";
import { config } from "../config";

const querystring = require("querystring");
const CLIENT_ID = config.CLIENT_ID;
const CLIENT_SECRET = config.CLIENT_SECRET;
// const REDIRECT_URI = "http://sonics.surge.sh/";
const REDIRECT_URI = "http://localhost:3000/callback";
let accessToken = "";
let clientAccessToken = "";
let expiresIn = "";
let user_id = "";
let playlistID = "";

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

  async getClientAccessToken() {
    if (clientAccessToken) {
      return clientAccessToken;
    }

    let data = {
      grant_type: "client_credentials",
      redirectUri: `${REDIRECT_URI}`,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    };

    clientAccessToken = await axios
      .post(
        "https://accounts.spotify.com/api/token",
        querystring.stringify(data),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => res.data.access_token);
  },

  async search(term) {
    this.getClientAccessToken();
    let trackObjects = [];
    try {
      await axios
        .get(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
          headers: {
            Authorization: `Bearer ${clientAccessToken}`,
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
              preview_url: track.preview_url,
              image: track.album.images[2],
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

  async savePlaylist(playlistName, trackURIs, id) {
    user_id = user_id
      ? user_id
      : await this.getCurrentUserId().then((res) => res);
    accessToken = accessToken ? accessToken : this.getAccessToken();
    if (!playlistName && !trackURIs) {
      return;
    }

    if (id) {
      axios
        .put(
          `https://api.spotify.com/v1/users/${user_id}/playlists/${id}`,
          {
            name: playlistName,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => console.log(res))
        .catch((err) =>
          console.log("There was an error updating this playlist", err)
        );
    } else {
      playlistID = await axios
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
        .then((res) => {
          console.log("id", res.data.id);
          return res.data.id;
        })
        .catch((e) => console.log("Playlist create failure!", e));
    }
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
      .then((res) => console.log("Songs added to playlist on save", res))
      .catch((e) => console.log("Error adding songs to playlist!", e));
  },
  async getUserPlaylists() {
    user_id = user_id
      ? user_id
      : await this.getCurrentUserId().then((res) => res);
    accessToken = accessToken ? accessToken : this.getAccessToken();
    let playlists = await axios
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
  getPlaylist(id) {
    user_id = user_id || this.getCurrentUserId();
    let retrievedPlaylist = axios
      .get(
        `https://api.spotify.com/v1/users/${user_id}/playlists/${id}/tracks`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => res.data.items)
      .then((tracks) => {
        return tracks.map((track) => {
          return {
            id: track.track.id,
            name: track.track.name,
            artist: track.track.artists[0].name,
            album: track.track.album.name,
            uri: track.track.uri,
            preview_url: track.track.preview_url,
            image: track.track.album.images[2],
          };
        });
      });

    return retrievedPlaylist;
  },

  async getGlobalTop50() {
    await this.getClientAccessToken();
    const top50 = await axios
      .get("https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF", {
        headers: {
          Authorization: `Bearer ${clientAccessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.data.tracks.items)
      .then((tracks) => {
        return tracks.map((track) => {
          return {
            id: track.track.id,
            name: track.track.name,
            artist: track.track.artists[0].name,
            album: track.track.album.name,
            uri: track.track.uri,
            preview_url: track.track.preview_url,
            image: track.track.album.images[2],
          };
        });
      });

    return top50;
  },
};
