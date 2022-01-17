import "../styles/ListItem.css";
import { useState } from "react";
import { spotifyAPI } from "../spotify";

function ListItem({ item, itemID }) {
  const [open, setOpen] = useState(false);

  function hidePlaylistModal() {
    setOpen(false);
  }

  function showTracksModal(e) {
    e.stopPropagation();
    setOpen(true);
  }

  function addToPlaylist() {

    spotifyAPI
      .addTracksToPlaylist({ playlistId: item.id, uris: [itemID] })
      .then(() => {
        console.log("coming soon with server")
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className="listItem" onClick={addToPlaylist}>
      <img src={item?.images[0]?.url} className="listItem__img" />
      <p className="listItem__name">{item.name}</p>
      <p>
        <span> {item.tracks.total} </span>tracks
      </p>
    </div>
  );
}

export default ListItem;
