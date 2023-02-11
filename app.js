// Importação do módulo cors
const cors = require('cors');

// Importação do módulo express
const express = require('express');

// Importação do módulo weather-js
const weather = require('weather-js');

// Criação de uma instância da aplicação express
const app = express();

// Uso do módulo cors para lidar com requisições cross-origin
app.use(cors());

// Rota para requisições GET à raiz da aplicação
app.get('/:cidadeEstado', (req, res) => {
  // Decodificação do parâmetro cidadeEstado na URL
  const cidadeEstado = decodeURIComponent(req.params.cidadeEstado);

  // Busca do clima para a cidade e estado informados, em Celsius
  weather.find({ search: cidadeEstado, degreeType: 'C' }, (err, result) => {
    // Verificação de erros
    if (err) {
      // Retorno de status HTTP 500 e objeto com a mensagem de erro
      res.status(500).send({ error: err });
    } else {
      // Retorno dos dados da previsão do tempo
      res.json(result);
    }
  });
});

// Inicialização da API na porta 3000
app.listen(3000, () => {
  console.log('Weather API rodando na porta 3000');
});
