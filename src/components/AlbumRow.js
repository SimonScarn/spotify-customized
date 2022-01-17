import "../styles/AlbumRow.css";
import { useState, useEffect, useContext, useReducer } from "react";
import { Link } from "react-router-dom";
import { spotifyAPI } from "../spotify";
import { GlobalContext } from "../GlobalContext";
import { getItemDuration, getArtists } from "../utils/ApiData";
import Modal from "./Modal";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";

function AlbumRow({ item, popular }) {
  const [favorite, setFavorite] = useState(false);
  const { userInfo, dispatch } = useContext(GlobalContext);
  const [state, setState] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    spotifyAPI
      .containsMySavedTracks([item.id])
      .then((data) => setFavorite(data[0]))
      .catch((err) => console.error(err));
  }, [state]);

  
  function addFavorite() {
    spotifyAPI
      .addToMySavedTracks([item.id])
      .then(() => {
        setState((prev) => !prev);
      })

      .catch((err) => console.error(err));
  }

  function removeFavorite() {
    spotifyAPI
      .removeFromMySavedTracks([item.id])
      .then(() => {
        setState((prev) => !prev);
      })
      .catch((err) => console.error(err));
  }

  function showPlaylistModal() {
    setOpen(true);
  }

  function hidePlaylistModal() {
    setOpen(false);
  }

  function playItem() {
    if (isPlaying) {
      setIsPlaying(false);
      dispatch({ type: "SET_PLAYING_STATE", payload: false });
    } else if (!isPlaying) {
      dispatch({
        type: "SET_PLAYER_TRACK",
        payload: [`spotify:track:${item.id}`],
      });
      setIsPlaying(true);
      dispatch({ type: "SET_PLAYING_STATE", payload: true });
    } else {
      setIsPlaying(false);
    }
  }


  return (
    <div className="albumRow">
      {popular ? (
        <div>
          <img className="albumRow__img" src={item.album.images[0].url} />
        </div>
      ) : (
        <p className="albumRow__trackNum">
          {item["track_number"]}
          {isPlaying ? (
            <PauseIcon onClick={playItem} className="albumRow__playIcon" />
          ) : (
            <PlayArrowIcon onClick={playItem} className="albumRow__playIcon" />
          )}
        </p>
      )}
      <div className="albumRow__trackInfo">
        <h3>{item.name}</h3>
        <p className="albumRow__artists">{getArtists(item.artists)}</p>
      </div>
      <div className="albumRow__toolbar">
        <Modal open={open} handleClose={hidePlaylistModal} songID={item.uri} />
        <LibraryAddIcon
          className="icon__addLibrary "
          onClick={showPlaylistModal}
        />
        {favorite ? (
          <FavoriteIcon className="icon__favorite" onClick={removeFavorite} />
        ) : (
          <FavoriteBorderIcon
            className="icon__favorite icon__favorite--remove"
            onClick={addFavorite}
          />
        )}
        <span>{getItemDuration(item["duration_ms"])}</span>
        <MoreHorizIcon className="icon__moreHorizon" />
        {popular && (
          <p>
            <ArrowCircleUpIcon />
            <span>{item.popularity}</span>
          </p>
        )}
      </div>
    </div>
  );
}

export default AlbumRow;
