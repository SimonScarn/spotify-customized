import { spotifyAPI } from "../spotify";
import { filterAlbums } from "./ApiData";

export function getAlbums(query, setAlbums) {
  return spotifyAPI
    .searchAlbums(query)
    .then((data) => {
      setAlbums(filterAlbums(data.albums.items));
    })
    .catch((err) => console.error(err));
}

export function getArtists(query, setArtists) {
  return spotifyAPI.searchArtists(query).then((data) => {
    setArtists(data.artists.items);
  });
}

export function getPlaylists(query, setPlaylists) {
  return spotifyAPI.searchPlaylists(query).then((data) => {
    setPlaylists(data.playlists.items);
  });
}

export function getShows(query, setShows) {
  return spotifyAPI.searchShows(query).then((data) => {
    setShows(data.shows.items);
  });
}

export function getEpisodes(query, setEpisodes) {
  return spotifyAPI.searchEpisodes(query).then((data) => {
    setEpisodes(data.episodes.items);
  });
}

export function getTracks(query, setTracks) {
  return spotifyAPI.searchTracks(query).then((data) => {
    setTracks(data.tracks.items);
  });
}

export async function getUserPlaylists() {
  let playlists = [];
  const body = await spotifyAPI.getUserPlaylists();
  if (body.total > 20) {
    for (let i = 0; i < Math.ceil(body.total / 20); i++) {
      const add = await spotifyAPI.getUserPlaylists({ offset: 20 * i });
      playlists = [...playlists, ...add.items];
    }
  }
  return playlists;
}

