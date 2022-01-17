import "../styles/Sidebar.css";
import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../GlobalContext";
import { NavLink, Link } from "react-router-dom";
import SidebarOption from "./SidebarOption";
import Home from "@material-ui/icons/Home";
import Search from "@material-ui/icons/Search";
import LibraryMusic from "@material-ui/icons/LibraryMusic";
import AddBox from "@material-ui/icons/AddBox";
import Favorite from "@material-ui/icons/Favorite";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import AddIcon from "@material-ui/icons/Add";

export default function Sidebar() {
  const { userInfo, dispatch } = useContext(GlobalContext);
  const [query, setQuery] = useState("");
  const [searchedPlaylists, setSearchedPlaylists] = useState([]);
  const [filterQuery, setFilterQuery] = useState("");
  const [sortOption, setSortOption] = useState("ascending");

  useEffect(() => {
    setSearchedPlaylists(userInfo.playlists);
  }, [userInfo.playlists]);

  useEffect(() => {
    if (query == "") {
      setSearchedPlaylists(userInfo.playlists);
    } else {
      const items = [...userInfo.playlists].filter((e) =>
        e.name.toLowerCase().includes(query)
      );
      setSearchedPlaylists(items);
    }
  }, [query]);



  function addSong() {
    console.log("coming soon");
  }

  function togglePlaylist(id) {
    dispatch({ type: "SET_PLAYER_TRACK", payload: [`spotify:playlist:${id}`] });
  }

  return (
    <div className="sidebar">
      <NavLink
        to="/"
        exact={true}
        activeClassName="sidebar__navLink--selected"
        className="sidebar__navLink"
      >
        <SidebarOption title="Home" Icon={Home} />
      </NavLink>
      <NavLink
        to="/search"
        activeClassName="sidebar__navLink--selected"
        className="sidebar__navLink"
      >
        <SidebarOption title="Search" Icon={Search} />
      </NavLink>
      <NavLink
        to="/collection"
        activeClassName="sidebar__navLink--selected"
        className="sidebar__navLink"
      >
        {" "}
        <SidebarOption title="Library" Icon={LibraryMusic} />
      </NavLink>
      <br />
      <NavLink to="/" className="sidebar__navLink">
        <SidebarOption title="Create new playlist" Icon={AddBox} />
      </NavLink>
      <NavLink to="/collection/tracks" className="sidebar__navLink">
        <SidebarOption title="Liked songs" Icon={Favorite} />
      </NavLink>
      <NavLink to="/collection/episodes" className="sidebar__navLink">
        <SidebarOption title="My episodes" Icon={EqualizerIcon} />
      </NavLink>
      <hr />

      <div className="sidebar__search">
        <input
          className="sidebar__input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search for a playlist..."
        ></input>
      </div>
      <div className="sidebar__playlistsContainer">
        {searchedPlaylists &&
          searchedPlaylists.map((playlist) => {
            return (
              <Link
                to={`/playlist/${playlist.id}`}
                style={{ cursor: "default" }}
                className="sidebar__navLink"
              >
                <div
                  className="sidebar__playlist"
                  key={playlist.id}
                >
                  <p style={{ margin: "0", padding: "0" }}>{playlist.name}</p>
                  <div>
                    <AddIcon className="icon__sidebar" onClick={addSong} />
                    <PlayArrowIcon
                      className="icon__sidebar"
                      onClick={() => togglePlaylist(playlist.id)}
                    />
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}
