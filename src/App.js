import "./App.css";
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "./GlobalContext";
import { BrowserRouter as Router } from "react-router-dom";
import { getUrlToken, spotifyAPI } from "./spotify";
import { getUserPlaylists } from "./utils/ApiCalls";
import Login from "./components/Login";
import Player from "./components/Player";

const code = new URLSearchParams(window.location.search).get("code");


function App() {
  const [token, setToken] = useState();
  const { userInfo, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    const hash = getUrlToken(code);
    window.location.hash = "";
    const _token = hash["access_token"];

    setToken(_token);
    dispatch({ type: "SET_TOKEN", payload: _token });
    spotifyAPI.setAccessToken(_token);
    //? get USER
    spotifyAPI.getMySavedAlbums({ limit: 10 }).then((data) => {
      dispatch({ type: "SET_USER_ALBUMS", payload: data.items });
    });

    getUserPlaylists().then((data) => {
      dispatch({ type: "SET_USER_PLAYLISTS", payload: data });
    })
    spotifyAPI.getMe().then(data => {
      dispatch({type: 'SET_USER', payload: data})
    })
  }, []);

  return (
    <Router>
      {!token ? (
        <Login />
      ) : (
        <div className="App">
          <Player />
        </div>
      )}
    </Router>
  );
}

export default App;
