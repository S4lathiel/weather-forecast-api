const cors = require('cors');
const express = require('express');
const weather = require('weather-js')


const app = express();

app.use(cors());

app.get('/:cidadeEstado', (req, res) => {
  const cidadeEstado = decodeURIComponent(req.params.cidadeEstado);
  weather.find({ search: cidadeEstado, degreeType: 'C' }, (err, result) => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      res.json(result);
    }
  });
});

app.listen(3000, () => {
  console.log('Weather API rodando na porta 3000');
});
