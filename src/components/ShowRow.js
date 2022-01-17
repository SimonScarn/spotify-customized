import "../styles/ShowRow.css";
import { useState, useEffect } from "react";
import { getReleaseDate } from "../utils/ApiData";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

function ShowRow({ item }) {
  const [favorite, setFavorite] = useState(false);

  return (
    <div className="showRow">
      <img src={item?.images[1].url} />
      <div>
        <div className="showRow__episodeInfo">
          <h4>{item?.name}</h4>
          <p className="showRow__episodeDescription">{item?.description}</p>
        </div>
        <div className="showRow__episodeToolbar">
          <PlayCircleFilledWhiteIcon />
          <p>{() => getReleaseDate(item["release_date"])}</p>
          <AddCircleOutlineIcon />
        </div>
      </div>
    </div>
  );
}

export default ShowRow;
