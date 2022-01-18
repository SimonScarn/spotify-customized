import "../styles/Login.css";
import { loginURL } from "../spotify.js";
import { Button } from "@material-ui/core";
import GitHubIcon from "@mui/icons-material/GitHub";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

export default function Login() {
  return (
    <div className="login">
      <img src="data:image/jpeg;base64,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" />
      <div className="login__top">
        <h2>If you have a Spotify account</h2>
        <div className="login__section">
          <Button className="login__loginBtn" href={loginURL}>
            Login
          </Button>
          <Button
            className="login__codeBtn"
            href="https://github.com/SimonScarn/spotify-customized"
            target="blank"
            endIcon={<GitHubIcon />}
          >
            code
          </Button>
        </div>
      </div>

      <div className="login__bottom">
        <h2>If you don't have a Spotify account</h2>
        <div className="login__section">
          <Button
            className="login__appBtn"
            href="https://spotify-customized-demo.netlify.app/"
            target="blank"
            startIcon={<ExitToAppIcon />}
          >
            demo
          </Button>
          <Button
            className="login__codeBtn--custom"
            href="https://github.com/SimonScarn/spotify-client"
            target="blank"
            endIcon={<GitHubIcon />}
          >
            code
          </Button>
        </div>
        <br/>
        <div className="login__info">
          <p>
            This demo app uses my personal Spotify account. Feel free to (dis)like
            songs, (un)follow artists/shows etc. to test app funcionalities.
          </p>
          <p>
            If you see login button in the demo app don't click it - wait until the app
            loads and then until playlists names on the left bottom sidebar
            appear. There may be no content on the Home page on initial render but
            it will appear after re-entering this view.
          </p>
        </div>
      </div>
    </div>
  );
}
