const axios = require('axios');
const express = require('express');
const path = require('path');
const osmtogeojson = require('osmtogeojson');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/geolocations', async (req, res) => {
  const minLong = req.query.min_long; // 52.0001 // req.query.min_long
  const maxLong = req.query.max_long; // 52.0002 // req.query.max_long
  const minLat = req.query.min_lat; // 13.0001 // req.query.min_lat
  const maxLat = req.query.max_lat; // 13.0001 // req.query.max_lat

  if (!minLat || !maxLong || !minLong || !maxLat) {
    res.sendStatus(400);
  }

  try {
    const response = await axios.get(`http://www.openstreetmap.org/api/0.6/map?bbox=${minLong},${minLat},${maxLong},${maxLat}`);
    const geoJson = osmtogeojson(response.data);

    return res.send(geoJson);
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
