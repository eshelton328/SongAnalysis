import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Credentials from '../Credentials.js';
import SearchBar from './SearchBar.js';
import SearchResults from './SearchResults.js'
import MySong from './MySongs.js';
import SongData from './SongData.js'
import '../styles/App.css';

function App() {
  const spotify = Credentials();

  const [token, setToken] = useState('');
  const [results, setResults] = useState([]);
  const [song, setSong] = useState('');
  const [songFeats, setFeats] = useState({});
  const [mySongs, setMySongs] = useState([]);
  const [mySongIds, setMSId] = useState({});
  const [toggleMS, toggle] = useState(false);

  const getToken = () => {
    axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
    })
    .then(tokenResponse => {
      setToken(tokenResponse.data.access_token);
    });
  };

  const searchSpotify = (input) => {
    const keyWords = input.split(' ');

    let query = '';

    for (var i = 0; i < keyWords.length; i++) {
      if (i === keyWords.length - 1) {
        query = query.concat(keyWords[i]);
      } else {
        query = query.concat(keyWords[i], '%20');
      }
    }

    axios(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
      method: 'GET',
      headers: {
        'Authorization' : 'Bearer ' + token,
      },
    })
    .then(searchResponse => {
      const data = searchResponse.data.tracks.items;
      setResults(data);
    })
  };

  const selectSong = (id, songObj) => {
    setSong(songObj);
    setResults([]);

    axios(`https://api.spotify.com/v1/audio-features/${id}`, {
      method: 'GET',
      headers: {
        'Authorization' : 'Bearer ' + token,
      },
    })
    .then(songResponse => {
      const data = songResponse.data;
      setFeats(data);
    })
  };

  const getMySongs = () => {
    axios.get("http://127.0.0.1:3001/api/mysongs")
    .then((res) => {
      setMySongs(res.data);
      let songIds = {};
      res.data.forEach((song) => {
        songIds[song.songId] = song.name;
      })
      setMSId(songIds);
    });
  };

  const addToDB = (data) => {
    console.log(data);
    axios.post("http://127.0.0.1:3001/api/mysongs", data)
    .then((res) => {
      setMySongs(res.data);
    })
    .catch((error) => {
      console.log(error);
    })
  };

  const msToggle = (sw) => {
    if (sw === 1) {
      toggle(true);
    } else {
      toggle(false);
    }
  };

  useEffect(() => {
    getToken();
    getMySongs();
  }, []);

  let searchResults = '';
  if (toggleMS) {
    searchResults = <MySong data={mySongs} selectSong={selectSong} toggle={msToggle} />;
  } else if (results.length > 0) {
    searchResults = <SearchResults data={results} selectSong={selectSong} toggle={msToggle} />;
  } else if (song !== '') {
    searchResults = <SongData details={song} features={songFeats} addToDB={addToDB} />;
  }

  console.log(mySongs);

  return (
    <div>
      <Container>
        <Grid
            container
            direction="row"
            justify="center"
        >
          <Grid
            container
            item
            direction="row"
            justify="center"
          >
            <h1>Song Analysis</h1>
          </Grid>
          <Grid
            item
            xs={4}
          >
            <SearchBar token={token} searchSpotify={searchSpotify} toggle={msToggle} />
          </Grid>
          <Grid
          container
          item
          direction="row"
          justify="center"
          xs={12}
          >
            {searchResults}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
