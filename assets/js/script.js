var apiKey = 'cf33cf9f2c94399c3184c97387dc10aa';
var searchForm = document.querySelector('#search-form');
var searchInput = document.querySelector('#search-input');
var cardTitleEl = document.querySelector('.card-title');
var tempEl = document.querySelector('#temp');
var windEl = document.querySelector('#wind');
var humidityEl = document.querySelector('#humidity');
var currentDate = dayjs().format('MM/DD/YYYY');


function getGeo(city) {
    var geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;
    fetch(geoUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data[0]);
            getWeather(data[0].lat, data[0].lon, city);
        });
}


function getWeather(lat, lon, city) {
    var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
    fetch(weatherUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            var iconUrl = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
            cardTitleEl.innerHTML = city + ' ' + '(' + currentDate + ')';
            cardTitleEl.innerHTML += `<img src="${iconUrl}" alt="Weather Icon">`;
            tempEl.innerHTML = 'Temp: ' + Math.floor(data.main.temp) + '°F';
            windEl.innerHTML = 'Wind: ' + Math.floor(data.wind.speed) + ' MPH';
            humidityEl.innerHTML = 'Humidity: ' + Math.floor(data.main.humidity) + '%';
        });
}


searchForm.addEventListener('submit', function(event) {
    event.preventDefault();

    var city = searchInput.value.trim();
    cardTitleEl.innerHTML = city + ' ' + '(' + currentDate + ')';
    console.log(city);
    getGeo(city);
})


// getGeo('Nashville');