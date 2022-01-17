import { createContext, useReducer } from "react";
import appReducer from "./appReducer.js";

export const GlobalContext = createContext();

const GlobalContextProvider = (props) => {
  const initialState = {
    user: null,
    accessToken: '',
    refreshToken: '',
    playlists: [],
    isPlaying: false,
    item: null,
    searchedPlaylists: [],
    currentPlayingItem: ["spotify:album:22zpCX6Nb9ppOVklalvGec"],
    savedAlbums: [],
    playerSettings: ["spotify:album:22zpCX6Nb9ppOVklalvGec"],
    isRunning: false,
  };

  const [userInfo, dispatch] = useReducer(appReducer, initialState);

  return (
    <GlobalContext.Provider value={{ userInfo, dispatch }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
