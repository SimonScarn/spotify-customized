import { useState, useEffect, useRef, useContext } from "react";
import "../styles/Search.css";
import "../styles/global.css";
import { spotifyAPI } from "../spotify";
import { useHistory, useParams, Link } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
import { GlobalContext } from "../GlobalContext";
import {
  getAlbums,
  getArtists,
  getPlaylists,
  getShows,
  getEpisodes,
  getTracks,
} from "../utils/ApiCalls";
import TopHeader from "./TopHeader";
import SearchResult from "./SearchResult";
import Item from "./Item";

function Search() {
  const { userInfo: token } = useContext(GlobalContext);

  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const history = useHistory();
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [shows, setShows] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [tracks, setTracks] = useState([]);

  const defaultImgUrl =
    "data:image/jpeg;base64,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";
  //?-----------------------------

  //!
  useEffect(() => {
    spotifyAPI.getCategories().then((data) => {
      setCategories(data.categories.items);
    });
  }, []);

  useEffect(() => {
    searchItem(query);
  }, [query]);

  useDebounce(
    () => {
      if (query !== undefined) {
        fetchSearchResults();
      }
    },
    1000,
    [query]
  );

  function fetchSearchResults() {
    if (query === "") return;

    getAlbums(query, setAlbums);
    getArtists(query, setArtists);
    getPlaylists(query, setPlaylists);
    getShows(query, setShows);
    getEpisodes(query, setEpisodes);
    getTracks(query, setTracks);
  }

  function searchItem(query) {
    history.push(`/search/${query}`);
  }

  return (
    <div className="bodyContainer">
      <TopHeader changeQuery={(query) => setQuery(query)} />
      {query ? (
        <div className="search__results">
          {/*-----------tracks-----------*/}
          {tracks.length > 0 && (
            <>
              <div style={{ display: "flex" }}>
                <h2>Tracks</h2>
              </div>
              <div className="itemsRow">
                {tracks?.map((track) => {
                  return <Item key={track.id} item={track} />;
                })}
                //
              </div>
            </>
          )}

          {/*-----------albums-----------*/}
          {albums.length > 0 && (
            <>
              <div
                style={{
                  display: "flex",
                }}
              >
                <h2>Albums</h2>
              </div>
              <div className="contentRow">
                {albums?.map((album) => {
                  return (
                    <SearchResult key={album.id} item={album} view={"search"} />
                  );
                })}
              </div>
            </>
          )}
          {/*-----------artists-----------*/}
          {artists.length > 0 && (
            <>
              <div style={{ display: "flex" }}>
                <h2>Artists</h2>
              </div>

              <div className="contentRow">
                {artists?.map((artist) => {
                  return <SearchResult key={artist.id} item={artist} />;
                })}
              </div>
            </>
          )}
          {/*-----------playlists-----------*/}
          {playlists.length > 0 && (
            <>
              <div style={{ display: "flex" }}>
                <h2>Playlists</h2>
              </div>

              <div className="contentRow">
                {playlists?.map((playlist) => {
                  return <SearchResult key={playlist.id} item={playlist} />;
                })}
              </div>
            </>
          )}
          {/*-----------shows-----------*/}
          {shows.length > 0 && (
            <>
              <div style={{ display: "flex" }}>
                <h2>Shows</h2>
              </div>

              <div className="contentRow">
                {shows?.map((show) => {
                  return <SearchResult key={show.id} item={show} />;
                })}
                //
              </div>
            </>
          )}
          {/*-----------episodes-----------*/}
          {/*           {episodes.length > 0 && (
            <>
              <div style={{ display: "flex" }}>
                <h2>Episodes</h2>
              </div>
                
              <div className="contentRow">
                {episodes?.map((episode) => {
                  return <SearchResult key={episode.id} item={episode} />;
                })}
                //
              </div>
            </>
          )} */}
        </div>
      ) : (
        <div className="search__categories">
          <h2>Categories</h2>
          {/*         {categories.map((category) => {
              return <CategoryItem category={category} />;
            })} */}
          <p>categories & recommendations coming soon</p>
        </div>
      )}
    </div>
  );
}

export default Search;
