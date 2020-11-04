const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db/queries.js');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.get('/api/mysongs', (req, res) => {
  db.getMySongs((error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.send(data);
    }
  })
})

app.post('/api/mysongs', (req, res) => {
  db.addMySongs(req.body.id, req.body.name, req.body.album, req.body.artist, req.body.length, req.body.imgSm.url, req.body.img.url, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      db.getMySongs((error, data) => {
        if (error) {
          res.send(error);
        } else {
          res.send(data);
        }
      })
    }
  })
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});