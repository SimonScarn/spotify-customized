import "../styles/SongRow.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { spotifyAPI } from "../spotify";
import { getItemDuration, getArtists } from '../utils/ApiData';
import Modal from "./Modal";
import { Button } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import AudiotrackIcon from '@material-ui/icons/Audiotrack';



function SongRow({ song, recommended }) {
  const [open, setOpen] = useState(false);
  const [favorite, setFavorite] = useState(true);


  function showPlaylistModal() {
    setOpen(true);
  }

  function hidePlaylistModal() {
    setOpen(false);
  }

  function playSong() {
    console.log('playing...')
  }

  function removeFavorite() {
    setFavorite(false);
    spotifyAPI.removeFromMySavedTracks([song.id])
  }


  if (!favorite) return null;

  return (
    <div className="songRow">
      <div className="songRow__playerControls">
        <span className="songRow__trackNumber"><AudiotrackIcon /></span>
        <span className="songRow__playIcon" >
          <PlayArrowIcon onClick={playSong} className="icon__playItem"/>
        </span>
      </div>
      <img src={song.album.images[0].url} className="songRow__img" />
      <div className="songRow__info">
        <div>
          <h3>{song.name}</h3>
         {getArtists(song.artists)}
        </div>
        <div className="songRow__album">
          <Link to={`/album/${song.album.id}`} className="song__link">
            {song.album.name}
          </Link>
        </div>
      </div>
      {recommended ? (
        <div className="songRow__toolbar">
          <Button className="songRow__addToPlaylist" onClick={showPlaylistModal}>
            ADD
          </Button>
        </div>
      ) : (
        <div className="songRow__toolbar">
          <Modal
            open={open}
            handleClose={hidePlaylistModal}
            songID={song.uri}
          />
          <LibraryAddIcon className="icon__addLibrary" onClick={showPlaylistModal} />
          <div>
            <FavoriteIcon className="icon__favorite" onClick={removeFavorite}/>
            <span>{() => getItemDuration(song['duration_ms'])}</span>
            <MoreHorizIcon className="icon__moreHorizon" />
          </div>
        </div>
      )}
    </div>
  );
}

export default SongRow;
