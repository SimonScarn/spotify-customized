import "../styles/Playlist.css";
import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { spotifyAPI } from "../spotify";
import TopHeader from "./TopHeader";
import SongRow from "./SongRow";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Button } from "@material-ui/core";
import defaultImgSrc from '../assets/defaultimgsrc.png'

function Playlist() {
  const [playlist, setPlaylist] = useState();
  const [tracks, setTracks] = useState([]);
  const [randomTracks, setRandomTracks] = useState([]);
  const [recommendedTracks, setRecommendedTracks] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const playlistID = location.pathname.split("/")[2];

    spotifyAPI.getPlaylist(playlistID).then((data) => {
      setPlaylist(data);
      setRandomTracks(randomizeTracks(data.tracks.items.map(e => e.track.id)));

    });
    spotifyAPI.getPlaylistTracks(playlistID).then((data) => {
      setTracks(data.items);
    });
  }, [location]);


  useEffect(() => {
    if (randomTracks.length) {
      spotifyAPI
      .getRecommendations({ seed_tracks: randomTracks })
       .then((data) => {
        setRecommendedTracks(data.tracks)
       });  
    }
  }, [randomTracks])


  function getRecommendedTracks() {
      const tracks = randomizeTracks(playlist.tracks.items.map(e => e.track.id));
      spotifyAPI
      .getRecommendations({ seed_tracks: tracks })
       .then((data) => {
        setRecommendedTracks(data.tracks)
       });  
  }

  function randomizeTracks(tracks) {
    if (tracks.length < 5) return tracks;
    let arr = [];
    while (arr.length < 5) {
      let randomNumber = Math.floor(Math.random() * tracks.length);
      let randomItem = tracks[randomNumber];
      if (!arr.includes(randomItem)) {
        arr.push(randomItem);
      }
    }
    return arr;
  }


  return (
    <div className="playlist">
      <TopHeader />
      <div className="playlist__header">
      <img alt="playlist cover" src={playlist?.images[0]?.url ? playlist?.images[0]?.url : defaultImgSrc}/>
        <div>
          <p style={{textTransform: 'capitalize'}}>{playlist?.type}</p>
          <h2 className="playlist__name">{playlist?.name}</h2>
          <div className="playlist__details">
            <p>{playlist?.owner["display_name"]}</p>
            <p>
              <span>{playlist?.tracks.total}</span> {playlist?.tracks.total > 1 ? "tracks" : "track"}
            </p>
          </div>
        </div>
      </div>
      <div className="playlist__toolbar">
        <PlayCircleFilledIcon />
        <MoreHorizIcon />
      </div>
      <hr />
      <div className="playlist__tracks">
        {tracks.map((item) => {
          return <SongRow key={item.track.id} song={item.track} />;
        })}
      </div>
      <h3 style={{marginLeft: "5%", fontSize: "30px"}}>Recommended: </h3>
    <div className="playlist__recommended">
    {recommendedTracks?.map(item => {
          return <SongRow key={item.id} song={item} recommended={true} playlistID={playlist.id}/>;
    })} 
    <Button className="playlist__recommendedRefreshBtn" onClick={getRecommendedTracks}>Refresh</Button>
    </div>

    </div>
  );
}

export default Playlist;
