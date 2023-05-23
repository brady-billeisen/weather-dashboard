var apiKey = 'cf33cf9f2c94399c3184c97387dc10aa';
var searchHistory = [];

function fetchWeatherData(city) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    console.log('API URL', apiUrl);
    fetch(apiUrl).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log('DATA', data);
    });
}