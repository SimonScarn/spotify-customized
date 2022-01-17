import "../styles/Discography.css";
import { useState, useEffect } from "react";
import { spotifyAPI } from "../spotify";
import { getReleaseDate } from "../utils/ApiData";
import AlbumRow from "./AlbumRow";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

function AlbumSection({ album }) {
  const [favorite, setFavorite] = useState(false);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    spotifyAPI
      .getAlbumTracks(album.id)
      .then((data) => setTracks(data.items))
      .catch((err) => console.error(err));
    spotifyAPI
      .containsMySavedAlbums([album.id])
      .then((data) => setFavorite(data[0]))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <div className="discography__albumHeader">
        <img src={album?.images[0].url} className="discography__albumCover" />
        <div className="discography__albumDetails">
          <h3>{album?.name}</h3>
          <p>{album?.type}</p>
          <span>{() => getReleaseDate(album?.["release_date"])}</span>
          <p>
            <span>{album?.["total_tracks"]}</span> tracks
          </p>
        </div>
        <div className="discography__albumIcons">
          <PlayCircleFilledIcon />
          {favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          <MoreHorizIcon />
        </div>
      </div>
      <div className="discography__albumBody">
        {tracks.map((track) => (
          <AlbumRow key={track.id} item={track} />
        ))}
      </div>
    </div>
  );
}

export default AlbumSection;
