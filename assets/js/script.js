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

$('#search-btn').on('click', function (e) {
    e.preventDefault();
    var city = $(this).siblings("#city-input").val();

    firstAPICall(city);
});

var cityBtn = $('.city-button')
cityBtn.on('click', function (e, city) {
    e.preventDefault();
    console.log(e)

    console.log(city)
    firstAPICall(city);
});




async function firstAPICall(city) {


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

};

// async function secondAPICall(cityLatitude, cityLongitude) {

//     var uvIndexAPICall = `https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}`
//     fetch(uvIndexAPICall);
// }



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
        cityButtons.attr("type", "submit");
        cityButtons.attr('id', city)

        cityList.append(cityButtons);

    }
}



function init() {
    renderCities();

}

init();