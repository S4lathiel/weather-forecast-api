// Importing required modules
const cors = require('cors');
const path = require('path');
const express = require('express');
const weather = require('weather-js');

// Creating an Express application
const app = express();

// Enabling CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Configuration to serve static files from the 'css' folder
app.use('/css', express.static(path.join(__dirname, 'css')));

// Configuration to serve static files from the 'js' folder
app.use('/js', express.static(path.join(__dirname, 'js')));

// Route to handle requests to the root URL and send the 'previsao.html' file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'weather-forecast.html'));
});

// Route to handle requests with city and state information
app.get('/:cityState', (req, res) => {
  const cityState = decodeURIComponent(req.params.cityState);

  // Finding weather information for the provided city and state, in Celsius
  weather.find({ search: cityState, degreeType: 'C' }, (err, result) => {
    if (err) {
      // Returning an error if it occurs
      res.status(500).send({ error: err });
    } else {
      // Sending the weather information as a JSON response
      res.json(result);
    }
  });
});

// Starting the server on port 3000
app.listen(3000, () => {
  console.log('Weather API running on localhost:3000');
});
