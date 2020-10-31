import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button } from '@material-ui/core'
import Credentials from '../Credentials.js';

const SearchBar = () => {

  const spotify = Credentials();

  const [token, setToken] = useState('');
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

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

  useEffect(() => {
    getToken();
  }, []);

  let searchResults;
  if (results.length > 0) {
    searchResults = 'Making progress!';
  }

  return (
    <div>
      <form noValidate autoComplete="off">
        <TextField
          id="standard-basic"
          label="Search"
          placeholder="artist, album, track, etc."
          value={search}
          fullWidth
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <Button
          variant="contained"
          onClick={() => {
            searchSpotify(search);
            setSearch('')
          }}
        >
          Search
        </Button>
      </form>
      {searchResults}
    </div>
  );
};

export default SearchBar;