import React from 'react';
import Grid from '@material-ui/core/Container'
import { HorizontalBar } from 'react-chartjs-2';
import Paper from '@material-ui/core/Paper';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext'
import AddIcon from '@material-ui/icons/Add';
import Time from './Time.js';
import timeConverter from '../timeConverter.js';
import axios from 'axios';

const SongData = ({ details, features, addToDB }) => {
  const time = timeConverter(features.duration_ms);

  console.log(details);

  let obj = details;
  obj.length = JSON.stringify(features.duration_ms);

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      height: 300,
      width: 720
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 300,
    },
    controls: {
      display: 'flex',
      alignItems: 'left',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 10,
      width: 10,
    },
  }));

  const chartData = {
    labels: ['danceability', 'energy', 'valence', 'speechiness', 'liveness', 'acousticness', 'instrumentalness'],
    datasets: [
      {
        label: details.name,
        data: [
          features.danceability * 100,
          features.energy * 100,
          features.valence * 100,
          features.speechiness * 100,
          features.liveness * 100,
          features.acousticness * 100,
          features.instrumentalness * 100,
        ],
        backgroundColor: [
          'rgba(159, 43, 138, 0.6)',
          'rgba(24, 74, 125, 0.6)',
          'rgba(254, 239, 66, 0.6)',
          'rgba(141, 209, 200, 0.6)',
          'rgba(5, 174, 239, 0.6)',
          'rgba(44, 168, 144, 0.6)',
          'rgba(247, 185, 211, 0.6)'
        ],
      }
    ]
  };

  const classes = useStyles();
  const theme = useTheme();

  let mode;
  if (features.mode === 0) {
    mode = 'Minor';
  } else {
    mode = 'Major';
  }

  let keys = {
    0: 'C',
    1: 'C#',
    2: 'D',
    3: 'D#',
    4: 'E',
    5: 'F',
    6: 'F#',
    7: 'G',
    8: 'G#',
    9: 'A',
    10: 'A#',
    11: 'B'
  }

  let key;
  if (features.key in keys) {
    key = keys[features.key];
  } else {
    key = 'No Key Detected'
  }

  return (
    <div>
      <Grid container spacing={3} direction="row">
        <Grid item xs={12 }>
          <Card className={classes.root}>
            <CardMedia
              className={classes.cover}
              image={details.img.url}
              title="Live from space album cover"
            />
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  {details.name}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Artist: {details.artist}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Album: {details.album}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Length: {time}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Time Signature: {features.time_signature}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Key: {key}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Mode: {mode}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Tempo: {features.tempo}
                </Typography>
              </CardContent>
              <div className={classes.controls}>
                <IconButton aria-label="play/pause" onClick={() => {
                  addToDB(obj);
                }}>
                  <AddIcon /> Add Song
                </IconButton>
              </div>
            </div>
          </Card>
        </Grid>
      </Grid>
      <div className="chart">
        <Paper>
          <div>
            <HorizontalBar
                  data={chartData}
                  options={{
                    title: {
                      display: true,
                      text: 'Audio Features',
                      fontSize: 25,
                    },
                    legend: {
                      display: false
                    }
                  }}
            />
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default SongData;