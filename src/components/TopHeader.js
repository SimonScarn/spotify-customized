import "../styles/TopHeader.css";
import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import { GlobalContext } from "../GlobalContext";
import { Avatar, IconButton } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

function TopHeader({ changeQuery }) {
  const { userInfo, dispatch } = useContext(GlobalContext);

  const history = useHistory();
  const { state } = useLocation();
  const [prevPath, setPrevPath] = useState(null);

  useEffect(() => {
    if (state?.prevPath) {
      setPrevPath(state.prevPath);
    }
  }, [state]);

  function goBack() {
    if (prevPath) {
      history.replace(prevPath);
    } else {
      history.goBack();
    }
  }

  return (
    <div className="topHeader">
      <div>
        <IconButton onClick={goBack} className="topHeader__navControl">
          <ArrowBackIosIcon />
        </IconButton>
        <IconButton
          onClick={() => history.goForward()}
          className="topHeader__navControl"
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </div>

      {changeQuery ? (
        <input
          onChange={(e) => changeQuery(e.target.value)}
          placeholder="Search for a song etc. ..."
        />
      ) : (
        <div className="topHeader__libraryOptions">
          <NavLink
            to="/collection/playlists"
            activeClassName="topHeader__navLink--selected"
            className="topHeader__navLink"
          >
            Playlists
          </NavLink>
          <NavLink
            to="/collection/albums"
            activeClassName="topHeader__navLink--selected"
            className="topHeader__navLink"
          >
            Albums
          </NavLink>

          <NavLink
            to="/collection/artists"
            activeClassName="topHeader__navLink--selected"
            className="topHeader__navLink"
          >
            Artists
          </NavLink>
          <NavLink
            to="/collection/shows"
            activeClassName="topHeader__navLink--selected"
            className="topHeader__navLink"
          >
            Shows
          </NavLink>
        </div>
      )}

      <div className="topHeader__userInfo">
        <Avatar>{userInfo?.user?.["display_name"][0]}</Avatar>
        <h4>{userInfo?.user?.["display_name"]}</h4>
        <ArrowDropDownIcon />
      </div>
    </div>
  );
}

export default TopHeader;
