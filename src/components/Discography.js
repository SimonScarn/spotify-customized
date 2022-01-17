import "../styles/Discography.css";
import "../styles/global.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { spotifyAPI } from "../spotify";
import SearchResult from "./SearchResult";
import TopHeader from "./TopHeader";
import AlbumSection from "./AlbumSection";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import ViewModuleIcon from "@material-ui/icons/ViewModule";

function Discography() {
  const location = useLocation();
  const [path, setPath] = useState(null);
  const [artistName, setArtistName] = useState(null);
  const [artistAlbums, setArtistAlbums] = useState(null);
  const [related, setRelated] = useState([]);
  const [alignment, setAlignment] = useState("left");


  useEffect(() => {

    if (location.state.type == "related") {
      spotifyAPI
        .getArtistRelatedArtists(location.pathname.split("/")[2])
        .then((data) => {
          setRelated(data.artists);
          setPath("related");
        })
        .catch((err) => console.error(err));
    } else {
      spotifyAPI
        .getArtist(location.pathname.split("/")[2])
        .then(({ name, id }) => {
          setArtistName(name);
          setPath("albums");
          return spotifyAPI.getArtistAlbums(id);
        })
        .then(({ items }) => {
          setArtistAlbums(
            items.filter((e) => e["available_markets"].includes("PL"))
          );
        })
        .catch((err) => console.error(err));
    }
  }, [location]);

  function handleAlignment(event, newAlignment) {
    if (!newAlignment) return;
    setAlignment(newAlignment);
  }

  return (
    <div className="bodyContainer">
      <TopHeader />
      {path == "related" ? (
        <>
          <h2 style={{marginLeft: "5%"}}>You may like</h2>
          <div className="contentGrid">
            {related?.map((item) => (
              <SearchResult key={item.id} item={item} />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="discography__toolbar">
            <h3>{artistName}</h3>
            <ToggleButtonGroup
              value={alignment}
              exclusive
              onChange={handleAlignment}
              color="primary"
            >
              <ToggleButton className="discography__toggle" value="left">
                <FormatListBulletedIcon />
              </ToggleButton>
              <ToggleButton className="discography__toggle" value="right">
                <ViewModuleIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          {alignment == "left" && (
            <div className="discography__itemsList">
              {artistAlbums?.map((album) => (
                <AlbumSection key={album.id} album={album} />
              ))}
            </div>
          )}
          {alignment == "right" && (
            <div className="contentGrid">
              {artistAlbums?.map((item) => (
                <SearchResult key={item.id} item={item} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Discography;
