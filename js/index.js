// Page elements
var btnConsult = document.querySelector("#consultar"),
    cityTxt = document.querySelector("#cityTxt"),
    weatherContainer = document.querySelector(".weather-container");

// Adding click event to the consult button
btnConsult.addEventListener("click", function (event) {
    event.preventDefault();
    consult();
});

// Function to create a card with weather information
function createCard(title, value, weather) {
    var emoji = getEmoji(title, value);
    var card = `
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title weather-title">${emoji} ${title}</h5>
            <p class="card-text weather-detail">${value}</p>
          </div>
        </div>
      </div>
    `;
    weatherContainer.innerHTML += card;
}

// Function to get the corresponding emoji for weather information
function getEmoji(title, value) {
    if (title.includes('Temp. Atual')) return '🌡️';
    if (title.includes('Ventania')) return '💨';
    if (title.includes('Humidade')) {
        var humidity = parseFloat(value.split(' ')[1]);
        if (humidity < 30) return '🌵';
        if (humidity >= 30 && humidity < 60) return '🌦️';
        return '💧';
    }
    if (title.includes('Temp. Mínima')) return '❄️';
    if (title.includes('Temp. Máxima')) return '🔥';
    if (title.includes('Amanhã')) return '📅';
    if (title.includes('Depois de amanhã')) return '📆';
    return '';
}

// Function to get the corresponding icon for weather conditions
function getWeatherIcon(condition) {
    condition = condition.toLowerCase();
    if (condition.includes('rain')) return 'fas fa-cloud-showers-heavy';
    if (condition.includes('snow')) return 'fas fa-snowflake';
    if (condition.includes('sunny') || condition.includes('clear')) return 'fas fa-sun';
    if (condition.includes('cloud')) return 'fas fa-cloud';
    if (condition.includes('wind')) return 'fas fa-wind';
    if (condition.includes('fog')) return 'fas fa-smog';
    if (condition.includes('haze')) return 'fas fa-smog';
    return 'fas fa-cloud'; // Default icon for other conditions
}

// Consultation function to fetch weather information for the city
function consult() {
    var cityState = cityTxt.value;
    weatherContainer.innerHTML = '';

    fetch(`http://localhost:3000/${cityState}`)
        .then(response => response.json())
        .then(result => {
            var currentWeather = result[0]["current"]["skytext"];

            createCard('Temp. Atual', `${result[0]["current"]["temperature"]} C°`, currentWeather);
            createCard('Ventania', `${result[0]["current"]["winddisplay"].split(" ")[0]} km/h`, currentWeather);
            createCard('Humidade', `${result[0]["current"]["humidity"]} %`, currentWeather);
            createCard('Temp. Mínima', `${result[0]["forecast"][0]["low"]} C°`, currentWeather);
            createCard('Temp. Máxima', `${result[0]["forecast"][0]["high"]} C°`, currentWeather);
            createCard('Amanhã', `Mínima: ${result[0]["forecast"][1]["low"]} C°\nMáxima: ${result[0]["forecast"][1]["high"]} C°`, currentWeather);
            createCard('Depois de amanhã', `Mínima: ${result[0]["forecast"][2]["low"]} C°\nMáxima: ${result[0]["forecast"][2]["high"]} C°`, currentWeather);
        })
        .catch(error => {
            console.error(error);
        });
}
