//API
var APIKey = "770f31b5bb9e29f326535d8549df41b6";

//User input variables

var cityList = $("#cities");
var cityUserInput = $("#city-input");
var cities = [];

//Today weather forecast card variables

var todayCity = $('#today-city');
var todayDate = $('#today-date');
var todayTemp = $('#today-temp');
var todayWind = $('#today-wind');
var todayHumidity = $('#today-humidity');
var todayDescription = $('#today-description');
var todayIcon = $('#weather-icon');

//Five day forecast card variables




var searchBtn = $("#search-btn");


$('#search-btn').on('click', async function (e) {
    e.preventDefault();

    var city = $(this).siblings("#city-input").val();

    var cityQueryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`;


    const response = await fetch(cityQueryURL);

    const data = await response.json()
        .then(data => {
            var nameResponse = data['name'];
            var dateResponse = data['']
            var tempResponse = data['main']['temp'];
            var windResponse = data['wind']['speed'];
            var humidityResponse = data['main']['humidity'];
            var cityLatitude = data['coord']['lat'];
            var cityLongitude = data['coord']['lon'];
            var weatherDescription = data['weather'][0]['description'];
            var weatherIcon = data['weather'][0]['main'];

            console.log(nameResponse);
            console.log(tempResponse);
            console.log(humidityResponse);
            console.log(weatherDescription);
            console.log(windResponse);
            console.log(data);


            todayCity.text(nameResponse);
            todayDescription.text('Forecast: ' + weatherDescription);
            todayTemp.text('Temp: ' + tempResponse + ' F');
            todayWind.text('Wind (mph): ' + windResponse + ' m.p.h.');
            todayHumidity.text('Humidity: ' + humidityResponse + '%');


            if (weatherDescription === 'sunny') {
                todayIcon.text('<i class="fas fa-sun"></i>');
            }

            if (weatherDescription === 'clouds') {
                todayIcon.text('<i class="fas fa-cloud-sun"></i>');
            }

            if (weatherDescription === 'rain') {
                todayIcon.text('<i class="fas fa-cloud-rain"></i>');
            }

            if (weatherDescription === 'wind') {
                todayIcon.text('<i class="fas fa-wind"></i>');
            }


        })

    addCity(city);
    renderCities();
    // secondAPICall();

});

// function secondAPICall() {

//     var uvIndexAPICall = `https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}`
//     fetch(uvIndexAPICall);
// }

$(".city-button").on('click', function (e) {
    e.preventDefault();
    // firstAPICall();


})

function addCity(city) {
    var cityText = cityUserInput.value;

    console.log(cityText);

    cities = getCities();

    cities.push(city);
    city.value = "";


    localStorage.setItem('city-history', JSON.stringify(cities))
}

function getCities() {

    return (JSON.parse(localStorage.getItem('city-history')) || []);

}

function renderCities() {

    cities = getCities();

    cityList.empty();

    for (var i = 0; i < cities.length; i++) {
        var city = cities[i];

        var cityButtons = $("<button>")
        cityButtons.text(city);
        cityButtons.attr("data-index", i);
        cityButtons.addClass("city-button btn btn-primary w-100 mt-2");
        cityButtons.attr("type", "button");

        cityList.append(cityButtons);

    }
}

function init() {
    renderCities();

}

init();