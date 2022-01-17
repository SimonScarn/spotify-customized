import SpotifyWebApi from "spotify-web-api-js";

const AUTH_URL = "https://accounts.spotify.com/authorize";
const redirect_URI = "https://spotify-customized.netlify.app/auth/external/callback";


const clientID = "5aed99f573aa4efdb7e16beaaa9bf9bb";
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

const scopes = [
  "ugc-image-upload",
  "user-read-recently-played",
  "user-top-read",
  "user-read-playback-position",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "app-remote-control",
  "streaming",
  "playlist-modify-public",
  "playlist-modify-private",
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-follow-modify",
  "user-follow-read",
  "user-library-modify",
  "user-library-read",
  "user-read-email",
  "user-read-private"
];

  const credentials = {
    clientId: clientID,
    clientSecret: clientSecret,
    redirectUri: redirect_URI,
    scopes: scopes
  }



export const getUrlToken = () => {

  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};

export const loginURL = `${AUTH_URL}?client_id=${clientID}&response_type=token&redirect_uri=${encodeURIComponent(redirect_URI)}&scope=${scopes.join(
  "%20"
)}&show_dialog=true`;

export const spotifyAPI = new SpotifyWebApi(credentials);
