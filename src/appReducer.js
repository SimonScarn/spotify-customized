const appReducer = (state, action) => {
  switch (action.type) {
    case "SET_APP_STATUS":
      return {
        ...state,
        isRunning: action.payload,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SET_ACCESS_TOKEN":
      return {
        ...state,
        accessToken: action.payload,
      };
    case "SET_REFRESH_TOKEN":
      return {
        ...state,
        refreshToken: action.payload,
      };
    case "SET_USER_PLAYLISTS":
      return {
        ...state,
        playlists: action.payload,
      };
    case "SET_PLAYLIST":
      return {
        ...state,
        playlist: action.payload,
      };
    case "SET_SEARCHED_PLAYLISTS":
      let playlistsItems = state.playlists.items;

      let result = playlistsItems?.filter((item) => {
        return item.name.includes(action.payload);
      });
      return {
        ...state,
        searchedPlaylists: result,
      };
    case "SET_CURRENT_TRACK":
      return {
        ...state,
        currentTrack: action.payload,
      };
    case "SET_PLAYING_STATE":
      return {
        ...state,
        isPlaying: action.payload,
      };

    case "SET_PLAYER_TRACK":
      return {
        ...state,
        playerSettings: action.payload,
      };
    case "SET_USER_ALBUMS":
      return {
        ...state,
        savedAlbums: action.payload,
      };

    default:
      return state;
  }
};

export default appReducer;
