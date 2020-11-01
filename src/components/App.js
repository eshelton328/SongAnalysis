import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Credentials from '../Credentials.js';
import SearchBar from './SearchBar.js';
import SearchResults from './SearchResults.js'
import '../styles/App.css';

function App() {
  const spotify = Credentials();

  const [token, setToken] = useState('');
  const [results, setResults] = useState([]);
  const [song, setSong] = useState('');

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

  const selectSong = (id) => {
    setSong(id);
    setResults([]);

    axios(`https://api.spotify.com/v1/audio-features/${id}`, {
      method: 'GET',
      headers: {
        'Authorization' : 'Bearer ' + token,
      },
    })
    .then(songResponse => {
      const data = songResponse.data;
    })
  }

  useEffect(() => {
    getToken();
  }, []);

  let searchResults = '';
  if (results.length > 0) {
    searchResults = <SearchResults data={results} selectSong={selectSong} />;
  } else if (song !== '') {
    searchResults = <h3>Getting Song Data!</h3>
  }

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
            direction="row"
            justify="center"
          >
            <h1>Song Analysis</h1>
          </Grid>
          <Grid
            item
            xs={4}
          >
            <SearchBar token={token} searchSpotify={searchSpotify}/>
          </Grid>
          <Grid
            item
            xs={9}
          >
            {searchResults}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
