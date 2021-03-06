import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import Time from './Time.js';
import timeConverter from '../timeConverter.js';

const SearchResults = ({ data, selectSong }) => {
  console.log(data);

  return (
    <div>
      <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell> </TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Album</TableCell>
            <TableCell align="right">Artist</TableCell>
            <TableCell align="right">Length</TableCell>
            <TableCell align="right"> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                <img src={row.album.images[2].url}/>
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.album.name}</TableCell>
              <TableCell align="right">{row.album.artists[0].name}</TableCell>
              <TableCell align="right"><Time ms={row.duration_ms} /></TableCell>
              <TableCell align="right"><AddIcon onClick={() => {
                selectSong(row.id, {
                  id: row.id,
                  name: row.name,
                  album: row.album.name,
                  artist: row.album.artists[0].name,
                  img: row.album.images[1],
                  imgSm: row.album.images[2]
                });
              }}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};

export default SearchResults;