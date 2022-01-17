import "../styles/Item.css";
import "../styles/global.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getArtists } from "../utils/ApiData";
import { IconButton } from "@material-ui/core";
import PlayCircleIcon from "@material-ui/icons/PlayArrow";

function Item({ item }) {
  function playItem(e) {
    e.preventDefault();
  }


  return (
    <Link
      to={`/album/${item.album ? item.album.id : item.id}`}
      className="item__link"
    >
      <div className="item">
        <img src={item.album ? item.album.images[0].url : item.images[0].url} />
        <div className="item__details">
          <h3>{item.name}</h3>
          <p>{getArtists(item.artists)}</p>
        </div>
        <IconButton onClick={playItem} className="item__playBtn">
          <PlayCircleIcon className="item__playIcon" />
        </IconButton>
      </div>
    </Link>
  );
}

export default Item;
