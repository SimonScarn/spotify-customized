import "../styles/Album.css";
import "../styles/global.css";
import { useEffect, useState, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import { GlobalContext } from "../GlobalContext";
import { spotifyAPI } from "../spotify";
import { getAlbumDuration, getReleaseDate } from "../utils/ApiData";
import AlbumRow from "./AlbumRow";
import TopHeader from "./TopHeader";
import { IconButton } from "@material-ui/core";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import TimerIcon from "@material-ui/icons/Timer";
import PauseIcon from "@material-ui/icons/Pause";

function Album() {
  const { userInfo, dispatch } = useContext(GlobalContext);
  const location = useLocation();
  const [album, setAlbum] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [albumDuration, setAlbumDuration] = useState(0);
  const [releaseDate, setReleaseDate] = useState("");
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const albumID = location.pathname.split("/")[2];
    spotifyAPI
      .getAlbum(albumID)
      .then((data) => {
        setAlbum(data);
        setAlbumDuration(() => getAlbumDuration(data.tracks));
        setReleaseDate(() => getReleaseDate(data["release_date"]));
      })
      .catch((err) => console.error(err));
    spotifyAPI
      .containsMySavedAlbums([albumID])
      .then((data) => setFavorite(data[0]))
      .catch((err) => console.error(err));
  }, [location]);

  function addFavorite() {
    spotifyAPI
      .addToMySavedAlbums([album.id])
      .then(() => setFavorite(true))
      .catch((err) => console.log(err));
  }

  function removeFavorite() {
    spotifyAPI
      .removeFromMySavedAlbums([album.id])
      .then(() => setFavorite(false))
      .catch((err) => console.log(err));
  }

  function playAlbum() {
    if (isPlaying) {
      setIsPlaying(false);
      dispatch({ type: "SET_PLAYING_STATE", payload: false });
    } else {
      setIsPlaying(true);
      dispatch({
        type: "SET_PLAYER_TRACK",
        payload: [`spotify:album:${album.id}`],
      });
      dispatch({ type: "SET_PLAYING_STATE", payload: true });
    }
  }

  return (
    <div className="album">
      <TopHeader />
      <div className="album__header">
        <img alt="album cover" src={album?.images[1].url} />
        <div>
          <p style={{ textTransform: "uppercase" }}>{album?.["album_type"]}</p>
          <div className="album__albumDetails">
            <h1 className="album__albumTitle">{album?.name}</h1>
            <div>
              <div>
                <MusicNoteIcon />
                <span>{album?.tracks.total}</span>
                {album?.tracks.total > 1 ? "tracks" : "track"}
              </div>
              <div>
                <TimerIcon />
                <span>{albumDuration}</span>
              </div>
            </div>
          </div>
          <div className="album__artistInfo">
            {album?.artists.map((artist) => (
              <Link to={`/artist/${artist.id}`} className="itemLink">
                <span className="album__artistName">{artist.name}</span>
              </Link>
            ))}
          </div>
          <div className="album__albumInfo">
            <span>{releaseDate}</span>
            <span>{album?.label}</span>
          </div>
        </div>
      </div>
      <div className="album__toolbar">
        <IconButton onClick={playAlbum}>
          {isPlaying ? <PauseIcon /> : <PlayCircleFilledIcon />}
        </IconButton>
        {favorite ? (
          <FavoriteIcon onClick={removeFavorite} />
        ) : (
          <FavoriteBorderIcon onClick={addFavorite} />
        )}

        <MoreHorizIcon />
      </div>
      <div className="album__body">
        {album?.tracks.items.map((item) => {
          return <AlbumRow key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
}

export default Album;
