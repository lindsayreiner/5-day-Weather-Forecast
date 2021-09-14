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
var todayUVIndex = $('#today-uv-index')

//Current weather and future weather containers

var todayWeather = $('#current-weather-container');
var futureWeather = $('#future-weather');

//Five day forecast card variables


var searchBtn = $("#search-btn");
$('#search-btn').on('click', function (e) {
    e.preventDefault();
    var city = $(this).siblings("#city-input").val();

    todayWeather.removeClass('not-visible')
    futureWeather.removeClass('hidden')

    firstAPICall(city);
});

var cityBtn = $('.city-button')
$('#cities').on('click', 'button', function (e) {
    e.preventDefault();

    todayWeather.removeClass('not-visible')
    futureWeather.removeClass('hidden')

    firstAPICall($(this)[0].innerHTML);
});

var clearBtn = $('#clear-btn');
clearBtn.on('click', function () {
    localStorage.clear();
    location.reload();
})



async function firstAPICall(city) {


    var cityQueryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`;

    const response = await fetch(cityQueryURL);

    const data = await response.json()
    console.log(data)

    var nameResponse = data['name'];
    var dateResponse = data['']
    var tempResponse = data['main']['temp'];
    var windResponse = data['wind']['speed'];
    var humidityResponse = data['main']['humidity'];
    var cityLat = data['coord']['lat'];
    var cityLon = data['coord']['lon'];
    var weatherDescription = data['weather'][0]['description'];
    var weatherIcon = data['weather'][0]['icon'];


    todayCity.text(nameResponse);
    todayDescription.html('<strong>Forecast:&nbsp</strong>' + weatherDescription);
    todayTemp.html('<strong>Temp:&nbsp</strong>' + tempResponse + ' F');
    todayWind.html('<strong>Wind:&nbsp</strong> ' + windResponse + ' m.p.h.');
    todayHumidity.html('<strong>Humidity:&nbsp</strong> ' + humidityResponse + '%');

    var todayIcon = $('<img>').attr('src', `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`);
    todayIcon.addClass('icon-style');
    todayCity.append(todayIcon);






    addCity(nameResponse);
    renderCities();
    secondAPICall(cityLat, cityLon);

};

async function secondAPICall(cityLat, cityLon) {

    var uvIndexAPICall = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&units=imperial&appid=${APIKey}`

    const response = await fetch(uvIndexAPICall);

    const data = await response.json();

    console.log(data);

    var uvIndexResponse = data['current']['uvi'];

    var uvSpan = $('<span>').text(uvIndexResponse);

    todayUVIndex.html('<strong>UV-Index:&nbsp</strong>');
    todayUVIndex.append(uvSpan);


    if (uvIndexResponse >= 8) {
        uvSpan.addClass('uv-extreme-zone');
        console.log('extreme')
    } else if (uvIndexResponse < 8 && uvIndexResponse >= 6) {
        uvSpan.addClass('uv-red-zone');
        console.log('red')
    } else if (uvIndexResponse < 6 && uvIndexResponse >= 3) {
        uvSpan.addClass('uv-yellow-zone');
        console.log('yellow')
    } else {
        uvSpan.addClass('uv-green-zone');
        console.log('green')
    }

}



function addCity(city) {

    cities = getCities();

    if (cities.includes(city)) {
        return;
    }

    cities.push(city);
    cityUserInput.text('');


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