import "../styles/SongRow.css";
import { useEffect, useState, useRef, useCallback } from "react";
import { useHistory } from "react-router-dom";
import useFavoriteTracks from "../hooks/useFavoriteTracks";
import SongRow from "../components/SongRow";

function FavoritesTracks() {
  const history = useHistory();
  const [offset, setOffset] = useState(0);
  const { favoritesTracks, loading } = useFavoriteTracks(offset);

  const observer = useRef();
  const lastTrackRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setOffset((prev) => prev + 20);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  return (
    <>
      <h2 style={{ marginLeft: "5%" }}>Your favorite tracks</h2>
      <div className="section__Rows">
        {favoritesTracks?.map((item, idx) => {
          if (favoritesTracks.length === idx + 1) {
            return (
              <div ref={lastTrackRef} className="songRow">
                <p>loading...</p>
              </div>
            );
          } else {
            return <SongRow key={item.track.id} song={item.track} />;
          }
        })}
      </div>
    </>
  );
}

export default FavoritesTracks;
