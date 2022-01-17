import "../styles/SongRow.css";
import "../styles/global.css";
import  {useState, useEffect, useContext } from "react";
import { spotifyAPI } from "../spotify";
import { useParams, useHistory } from "react-router-dom";
import { GlobalContext } from "../GlobalContext";
import TopHeader from "./TopHeader";
import SearchResult from "./SearchResult";
import FavoritesTracks from "./FavoritesTracks";

function Library() {
  const { userInfo, dispatch } = useContext(GlobalContext);
  const { category } = useParams() || "playlists";
  const history = useHistory();
  const [items, setItems] = useState([]);

  useEffect(() => {
    switch (category) {
      case "artists":
        spotifyAPI.getFollowedArtists().then((data) => {
          setItems(data.artists.items);
        });
        break;
      case "albums":
        spotifyAPI.getMySavedAlbums().then((data) => {
          setItems(data.items.map((e) => e.album));
        });
        break;
      case "shows":
        spotifyAPI.getMySavedShows().then((data) => {
          setItems(data.items.map((e) => e.show));
        });
        break;
      case "playlists":
        spotifyAPI.getUserPlaylists().then((data) => {
          setItems(data.items);
        });
        break;
      case "episodes":
        break;
      case undefined:
        history.push("/collection/playlists");
        spotifyAPI.getUserPlaylists().then((data) => {
          setItems(data.items);
        });
        break;
      default:
        break;
    }
  }, [category]);

  return (
    <div className="bodyContainer">
      <TopHeader />
      {category == "tracks" ? (
        <FavoritesTracks />
      ) : category == "episodes" ? (
        <>
          <p style={{ marginLeft: "5%" }}>coming soon</p>
        </>
      ) : (
        <div className="contentGrid">
          {items?.map((item) => {
            return <SearchResult key={item.id} item={item} view="collection" />;
          })}
        </div>
      )}
    </div>
  );
}

export default Library;
