// Variáveis que representam os elementos HTML
var btnConsultar = document.querySelector("#consultar"),
cityTxt = document.querySelector("#cityTxt"),
weatherInfo = document.querySelector("#weather-info"),
ventania = document.querySelector("#ventania"),
humidade = document.querySelector("#humidade"),
tempMin = document.querySelector("#tempMin"),
tempMax = document.querySelector("#tempMax"),
proximoDia = document.querySelector("#proximoDia"),
proximoDia2 = document.querySelector("#proximoDia2");

// Adiciona um evento ao botão "consultar" para chamar a função "consultar"
btnConsultar.addEventListener("click", function (event) {
    event.preventDefault();
    consultar();
});

// Função que faz uma requisição para a API com a cidade e estado informados
function consultar() {
    // Obtém a cidade e estado informados pelo usuário
    var cidadeEstado = cityTxt.value;

    // Faz uma requisição para a API, espera a resposta, a transforma em JSON
    // e, em seguida, preenche os elementos HTML com as informações da previsão do tempo
    fetch(`http://localhost:3000/${cidadeEstado}`)
        .then(response => response.json())
        .then(resultado => {
            weatherInfo.innerHTML = `Temp. Atual: ${resultado[0]["current"]["temperature"]} C°`
            ventania.innerHTML = `Ventania: ${resultado[0]["current"]["winddisplay"].split(" ")[0]} km/h`
            humidade.innerHTML = `Humidade: ${resultado[0]["current"]["humidity"]} %`
            tempMin.innerHTML = `Temp. Mínima: ${resultado[0]["forecast"][0]["low"]} C°`
            tempMax.innerHTML = `Temp. Máxima: ${resultado[0]["forecast"][0]["high"]} C°`
            proximoDia.innerHTML = `Amanhã:<br>Temp. Mínima: ${resultado[0]["forecast"][1]["low"]} C°<br>Temp Máxima: ${resultado[0]["forecast"][1]["high"]} C°`
            proximoDia2.innerHTML = `Depois de amanhã:<br>Temp. Mínima: ${resultado[0]["forecast"][2]["low"]} C°<br>Temp Máxima: ${resultado[0]["forecast"][2]["high"]} C°`
            })
        .catch(error => {
            console.error(error);
        });
}
