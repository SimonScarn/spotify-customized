import Sidebar from "./Sidebar";
import Home from "./Home";
import Footer from "./Footer";
import Album from "./Album";
import Playlist from "./Playlist";
import Show from "./Show";
import Artist from "./Artist";
import Search from "./Search";
import Discography from "./Discography";
import Library from "./Library";
import {
  Switch,
  Route,
  HashRouter,
} from "react-router-dom";

export default function Player() {
  return (
    <HashRouter>
      <div className="player">
        <div className="player__body">
          <Sidebar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/search" component={Search} />
            <Route path="/search/:id" component={Search} />
            <Route path="/album" component={Album} />
            <Route path="/album/:id" component={Album} />
            <Route path="/playlist" component={Playlist} />
            <Route path="/playlist/:id" component={Playlist} />
            <Route path="/show" component={Show} />
            <Route path="/show/:id" component={Show} />
            <Route exact path="/artist" component={Artist} />
            <Route exact path="/artist/:id" component={Artist} />
            <Route
              exact
              path="/artist/:id/discography/album"
              component={Discography}
            />
            <Route exact path="/artist/:id/related" component={Discography} />
            <Route exact path="/collection" component={Library} />
            <Route exact path="/collection/:category" component={Library} />
          </Switch>
          <Footer />
        </div>
      </div>
    </HashRouter>
  );
}
