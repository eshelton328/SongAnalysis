import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { TextField, Button } from '@material-ui/core'

const SearchBar = ({ token, searchSpotify, toggle }) => {

  const [search, setSearch] = useState('');

  return (
    <div className="search-bar">
      <Grid
        container
        direction="row"
        justify="center"
      >
        <Grid
          container
          direction="column"
        >
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
          </form>
        </Grid>
        <Grid
          container
          direction="column"
        >
          <Button
          classes={{ label: 'submit-btn' }}
            variant="contained"
            size="small"
            onClick={() => {
              searchSpotify(search);
              setSearch('')
              toggle(0);
            }}
          >
            Search
          </Button>
        </Grid>
        <Grid
          container
          direction="column"
        >
          <Button
          classes={{ label: 'submit-btn' }}
            variant="contained"
            size="small"
            onClick={() => {
              toggle(1);
            }}
          >
            My Songs
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default SearchBar;