const cors = require('cors');
const path = require('path');
const express = require('express');
const weather = require('weather-js');

const app = express();

app.use(cors());

// Configuração para servir arquivos estáticos da pasta 'css'
app.use('/css', express.static(path.join(__dirname, 'css')));

// Configuração para servir arquivos estáticos da pasta 'css'
app.use('/js', express.static(path.join(__dirname, 'js')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'previsao.html'));
});

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
  console.log('Weather API rodando na porta localhost:3000');
});
