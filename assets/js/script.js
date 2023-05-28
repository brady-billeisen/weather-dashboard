var apiKey = 'cf33cf9f2c94399c3184c97387dc10aa';
var searchForm = document.querySelector('#search-form');
var searchInput = document.querySelector('#search-input');
var cardTitleEl = document.querySelector('.card-title');
var tempEl = document.querySelector('#temp');
var windEl = document.querySelector('#wind');
var humidityEl = document.querySelector('#humidity');
var fiveDayEl = document.querySelector('#fiveDay');
var todayContainer = document.querySelector('#today');
var currentDate = dayjs().format('MM/DD/YYYY');


function getGeo(city) {
    var geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;
    fetch(geoUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            getWeather(data[0].lat, data[0].lon, city);
            getFiveDay(data[0].lat, data[0].lon, city);
        });
}


function getWeather(lat, lon, city) {
    var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
    fetch(weatherUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            var iconUrl = 'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
            cardTitleEl.innerHTML = city + ' ' + '(' + currentDate + ')';
            cardTitleEl.innerHTML += `<img src="${iconUrl}" alt="Weather Icon">`;
            tempEl.innerHTML = 'Temp: ' + Math.floor(data.main.temp) + '°F';
            windEl.innerHTML = 'Wind: ' + Math.floor(data.wind.speed) + ' MPH';
            humidityEl.innerHTML = 'Humidity: ' + Math.floor(data.main.humidity) + '%';
        });
}


function getFiveDay(lat, lon) {
    var fiveDayUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
    fetch(fiveDayUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            for (var i = 0; i < data.list.length; i++) {
                if (i % 8 === 2) {
                    var containerEl = document.createElement('div');
                    containerEl.setAttribute('id', 'five-day-container');
                    fiveDayEl.appendChild(containerEl);
                    var cardEl = document.createElement('div');
                    cardEl.setAttribute('class', 'card');
                    cardEl.setAttribute('id', 'forecast-card');
                    cardEl.setAttribute('style', 'margin: 10px 20px 10px 20px; width: 10rem;');
                    containerEl.appendChild(cardEl);
                    var cardBodyEl = document.createElement('div');
                    cardBodyEl.setAttribute('class', 'card-body');
                    cardEl.appendChild(cardBodyEl);
                    var dateEl = document.createElement('h5');
                    dateEl.innerHTML = dayjs((data.list[i]).dt_txt.substring(0, 10)).format('MM/DD/YYYY');
                    dateEl.setAttribute('class', 'card-title text-light');
                    dateEl.setAttribute('style', 'text-align: center;');
                    var iconUrl = 'https://openweathermap.org/img/w/' + data.list[i].weather[0].icon + '.png'
                    var iconEl = document.createElement('h6');
                    iconEl.innerHTML = `<img src="${iconUrl}" alt="Weather Icon">`;
                    iconEl.setAttribute('class','card-subtitle mb-2 text-light');
                    iconEl.setAttribute('style', 'text-align: center;');
                    var fiveTempEl = document.createElement('p');
                    fiveTempEl.innerHTML = 'Temp: ' + Math.floor((data.list[i].main.temp)) + '°F';
                    fiveTempEl.setAttribute('class', 'card-text text-light');
                    fiveTempEl.setAttribute('style', 'text-align: center;');
                    var fiveWindEl = document.createElement('p');
                    fiveWindEl.innerHTML = 'Wind: ' + Math.floor((data.list[i].wind.speed)) + ' MPH';
                    fiveWindEl.setAttribute('class', 'card-text text-light');
                    fiveWindEl.setAttribute('style', 'text-align: center;');
                    var fiveHumidityEl = document.createElement('p');
                    fiveHumidityEl.innerHTML = 'Humidity ' + Math.floor((data.list[i].main.humidity)) + '%';
                    fiveHumidityEl.setAttribute('class', 'card-text text-light');
                    fiveHumidityEl.setAttribute('style', 'text-align: center; margin-bottom: 10px;');
                    cardEl.appendChild(dateEl);
                    cardEl.appendChild(iconEl);
                    cardEl.appendChild(fiveTempEl);
                    cardEl.appendChild(fiveWindEl);
                    cardEl.appendChild(fiveHumidityEl);
                }
            }
        });
}



function clearFiveDay() {
    fiveDayEl.innerHTML = '';
}


function setView(view) {
    todayContainer.style.display = view === 'START' ? null : 'none';
}


searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    clearFiveDay();

    var city = searchInput.value.trim();
    cardTitleEl.innerHTML = city + ' ' + '(' + currentDate + ')';
    getGeo(city);
    setView('START');
})