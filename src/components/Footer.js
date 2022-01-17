import { useContext } from "react";
import "../styles/Footer.css";
import FooterPlayer from "./SpotifyPlayer";
import { GlobalContext } from "../GlobalContext";

export default function Footer() {
  const { userInfo, dispatch } = useContext(GlobalContext);

  return (
    <div className="footer">
      <FooterPlayer />
      <span className="footer__player footer__player--currentTime">0:00</span>
      <span className="footer__player footer__player--totalTime">3:33</span>
    </div>
  );
}
