var btnConsultar = document.querySelector("#consultar"),
    cityTxt = document.querySelector("#cityTxt"),
    weatherContainer = document.querySelector(".weather-container");

btnConsultar.addEventListener("click", function (event) {
    event.preventDefault();
    consultar();
});

function criarCartao(titulo, valor, clima) {
    var emoji = getEmoji(titulo, valor);
    var card = `
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title weather-title">${emoji} ${titulo}</h5>
            <p class="card-text weather-detail">${valor}</p>
          </div>
        </div>
      </div>
    `;
    weatherContainer.innerHTML += card;
  }
  
  function getEmoji(titulo, valor) {
    if (titulo.includes('Temp. Atual')) return '🌡️';
    if (titulo.includes('Ventania')) return '💨';
    if (titulo.includes('Humidade')) {
      var humidity = parseFloat(valor.split(' ')[1]);
      if (humidity < 30) return '🌵';
      if (humidity >= 30 && humidity < 60) return '🌦️';
      return '💧';
    }
    if (titulo.includes('Temp. Mínima')) return '❄️';
    if (titulo.includes('Temp. Máxima')) return '🔥';
    if (titulo.includes('Amanhã')) return '📅';
    if (titulo.includes('Depois de amanhã')) return '📆';
    return '';
  }
  

function getWeatherIcon(condition) {
    condition = condition.toLowerCase();
    if (condition.includes('rain')) return 'fas fa-cloud-showers-heavy';
    if (condition.includes('snow')) return 'fas fa-snowflake';
    if (condition.includes('sunny') || condition.includes('clear')) return 'fas fa-sun';
    if (condition.includes('cloud')) return 'fas fa-cloud';
    if (condition.includes('wind')) return 'fas fa-wind';
    if (condition.includes('fog')) return 'fas fa-smog';
    if (condition.includes('haze')) return 'fas fa-smog';
    return 'fas fa-cloud'; // Ícone padrão para outras condições
}

function consultar() {
    var cidadeEstado = cityTxt.value;
    weatherContainer.innerHTML = '';

    fetch(`http://localhost:3000/${cidadeEstado}`)
        .then(response => response.json())
        .then(resultado => {
            var climaAtual = resultado[0]["current"]["skytext"];

            criarCartao('Temp. Atual', `${resultado[0]["current"]["temperature"]} C°`, climaAtual);
            criarCartao('Ventania', `${resultado[0]["current"]["winddisplay"].split(" ")[0]} km/h`, climaAtual);
            criarCartao('Humidade', `${resultado[0]["current"]["humidity"]} %`, climaAtual);
            criarCartao('Temp. Mínima', `${resultado[0]["forecast"][0]["low"]} C°`, climaAtual);
            criarCartao('Temp. Máxima', `${resultado[0]["forecast"][0]["high"]} C°`, climaAtual);
            criarCartao('Amanhã', `Mínima: ${resultado[0]["forecast"][1]["low"]} C°\nMáxima: ${resultado[0]["forecast"][1]["high"]} C°`, climaAtual);
            criarCartao('Depois de amanhã', `Mínima: ${resultado[0]["forecast"][2]["low"]} C°\nMáxima: ${resultado[0]["forecast"][2]["high"]} C°`, climaAtual);
        })
        .catch(error => {
            console.error(error);
        });
}