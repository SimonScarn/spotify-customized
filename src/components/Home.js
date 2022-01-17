import "../styles/global.css";
import { useState, useEffect, useContext } from "react";
import { spotifyAPI } from "../spotify";
import { GlobalContext } from "../GlobalContext";
import SearchResult from "./SearchResult";
import TopHeader from "./TopHeader";
import Item from "./Item";

function Home() {
  const [topArtists, setTopArtists] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [newReleases, setNewReleases] = useState({ albums: [], singles: [] });
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);

  const { userInfo, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    spotifyAPI.getMyTopArtists().then((data) => {
      setTopArtists(data.items);
    })
    .catch((err) => console.error(err));

    spotifyAPI
      .getMyRecentlyPlayedTracks()
      .then((data) => {
        data.items.map((e) => {});
        setRecentlyPlayed(removeDuplicates(data));
      })
      .catch((err) => console.error(err));


    spotifyAPI
      .getMyTopTracks()
      .then((data) => {
        setTopTracks(data.items);
      })
      .catch((err) => console.error(err));

    spotifyAPI
      .getNewReleases()
      .then((data) => {
        const albums = data.albums.items.filter(
          (e) => e["album_type"] == "album"
        );
        const singles = data.albums.items.filter(
          (e) => e["album_type"] == "single"
        );

        setNewReleases({ ...newReleases, singles: singles, albums: albums });
      })
      .catch((err) => console.error(err));
    spotifyAPI.getFeaturedPlaylists().then((data) => {
      setFeaturedPlaylists(data.playlists.items);
    });
  }, [userInfo.token]);

  function removeDuplicates(data) {
    const items = data.items.map((e) => e.track);
    return Array.from(new Set(items.map((e) => e.id))).map((id) =>
      items.find((e) => e.id === id)
    );
  }

  return (
    <div className="bodyContainer">
      <TopHeader />
      <div className="contentSection">
        <h2>Top Artists</h2>
        <div className="contentRow">
          {topArtists?.map((artist) => {
            return <SearchResult key={artist.id} item={artist} view={"home"} />;
          })}
        </div>
      </div>
      <div className="contentSection">
        <h2>Recently played</h2>
        <div style={{ gridTemplateRows: "1fr 1fr" }}>
          {recentlyPlayed?.map((item) => {
            return <Item key={item.id} item={item} />;
          })}
        </div>
      </div>
      <div className="contentSection">
        <h2>Your top tracks</h2>
        <div style={{ gridTemplateRows: "1fr 1fr" }}>
          {topTracks?.map((item) => {
            return <Item key={item.id} item={item} />;
          })}
        </div>
      </div>
      <div className="contentSection">
        <h2>New releases</h2>
        <h3>New singles</h3>
        <div className="itemsRow">
          {newReleases?.singles.map((item) => {
            return <Item key={item.id} item={item} />;
          })}
        </div>
        <br />
        <h3>New albums</h3>

        <div className="contentRow">
          {newReleases?.albums.map((item) => {
            return <SearchResult key={item.id} item={item} view={"home"} />;
          })}
        </div>
      </div>
      <div className="contentSection">
        <h2>Featured playlists</h2>
        <div className="contentRow">
          {featuredPlaylists?.map((item) => {
            return <SearchResult key={item.id} item={item} view={"home"} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
