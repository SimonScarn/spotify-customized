import "../styles/Modal.css";
import ReactDom from "react-dom";
import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../GlobalContext";
import { Modal as MUIModal } from "@material-ui/core";
import ListItem from "./ListItem";

function Modal({ open, handleClose, songID }) {
  const { userInfo, dispatch } = useContext(GlobalContext);
  const [query, setQuery] = useState("");
  const [userPlaylists, setUserPlaylists] = useState([]);

  useEffect(() => {
    setUserPlaylists(sortPlaylists(userInfo.playlists));
  }, []);

  function searchPlaylists(e) {
    setQuery(e.target.value);
  }

  function sortPlaylists(playlists) {
    return playlists.sort((a, b) =>
      a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
    );
  }

  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <MUIModal open={open} onClose={handleClose}>
        <div className="modal__body">
          <input
            placeholder="Search playlists..."
            value={query}
            onChange={searchPlaylists}
          />
          <div className="modal__bodyList">
            <hr />
            <h2 style={{ marginLeft: "30px" }}>Your playlists:</h2>
            <hr />
            <div className="modal__bodyListContainer">
              {userPlaylists?.map((item) => (
                <ListItem key={item.id} item={item} itemID={songID} />
              ))}
            </div>
          </div>
        </div>
      </MUIModal>
    </>,
    document.getElementById("portalPlaylists")
  );
}

export default Modal;
