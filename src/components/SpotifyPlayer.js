import { useContext, useState, useEffect, useRef } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { GlobalContext } from "../GlobalContext";

export default function FooterPlayer() {
  const { userInfo, dispatch } = useContext(GlobalContext);
  const playerRef = useRef();

  
  return (
    <SpotifyPlayer
      ref={playerRef}
      token={userInfo.accessToken}
      uris={userInfo.currentPlayingItem}
      play={userInfo.isPlaying}
      updateSavedStatus={() =>{
        dispatch({type: 'SET_PLAYING_STATE', payload: !userInfo.isPlaying})
      }}
      showSaveIcon
      styles={{
        activeColor: "blue",
        bgColor: "#333",
        color: "pink",
        loaderColor: "#fff",
        sliderColor: "aqua",
        trackArtistColor: "aqua",
        trackNameColor: "pink",
      }}
    />
      
  );
}
