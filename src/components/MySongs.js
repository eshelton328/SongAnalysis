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

const MySongs = ({ data, selectSong, toggle }) => {
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
                <img src={row.img}/>
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.album}</TableCell>
              <TableCell align="right">{row.artist}</TableCell>
              <TableCell align="right"><Time ms={row.length} /></TableCell>
              <TableCell align="right"><AddIcon onClick={() => {
                toggle(0);
                selectSong(row.songId, {
                  id: row.songId,
                  name: row.name,
                  album: row.album,
                  artist: row.artist,
                  img: {
                    url: row.imgLG,
                  },
                  imgSm: row.img
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

export default MySongs;