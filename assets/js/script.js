var apiKey = 'cf33cf9f2c94399c3184c97387dc10aa';
var searchForm = document.querySelector('#search-form');
var searchInput = document.querySelector('#search-input');
var cardTitleEl = document.querySelector('.card-title')
var currentDate = dayjs().format('MM/DD/YYYY');


function getGeo(city) {
    var geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;
    fetch(geoUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data[0]);
            getWeather(data[0].lat, data[0].lon);
        });
}


function getWeather(lat, lon) {
    var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
    fetch(weatherUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
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