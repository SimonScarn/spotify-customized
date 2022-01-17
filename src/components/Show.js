import "../styles/Show.css";
import ShowRow from './ShowRow'
import TopHeader from './TopHeader'
import { useLocation } from "react-router";
import { useState, useEffect } from "react";
import { spotifyAPI } from "../spotify";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Button } from '@material-ui/core'



function Show() {
  const { pathname } = useLocation();
  const [show, setShow] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const showID = pathname.split("/")[2];
  

  useEffect(() => {
    spotifyAPI
      .getShow(showID)
      .then((data) => {
        setShow(data);
        return spotifyAPI.containsMySavedShows([showID])
      })
      .then(data => setIsFollowing(data[0]))
      .catch((err) => console.error(err));
  }, []);


  function followShow() {
    spotifyAPI.containsMySavedShows([showID]).then((data) => {
      if (data[0]) {
        setIsFollowing(false);
        return spotifyAPI.removeFromMySavedShows([showID]);
      }
      setIsFollowing(true);
      return spotifyAPI.addToMySavedShows([showID]);
    });
  }



  return (
    <div className="show">
      <TopHeader/>
      <div className="show__header">
        <div><img alt="show cover" src={show?.images[1].url} /></div>
        <div className="show__showDetails">
          <p style={{textTransform: 'uppercase'}}>{show?.type}</p>
          <h1 className="show__title">{show?.name}</h1>
          <h2 className="show__publisher">{show?.publisher}</h2>
          <p>{show?.["total_episodes"]} episodes</p>
        </div>
      </div>
      <div className="view__toolbar">
      <Button className="followBtn" onClick={followShow}>
          {isFollowing ? "UNFOLLOW" : "FOLLOW"}
        </Button>
        <MoreHorizIcon />
      </div>
      <div className="show__body">
        <div className="show__bodyLeft">
          <p className="show__bodyTitle">All episodes</p>
          <hr />
          <div className="show__episodesList">
          {show?.episodes.items.map(item => {
          return <ShowRow key={item.id} item={item} />
        })}
          </div>
        </div>
        <div className="show__bodyRight">
          <p className="show__bodyTitle">About</p>
          <p className="show__description">{show?.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Show;
