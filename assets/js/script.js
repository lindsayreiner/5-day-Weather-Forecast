//API
var APIKey = "770f31b5bb9e29f326535d8549df41b6";

//User input variables


var cityList = $("#cities");
var cityUserInput = $("#city-input");
var cities = [];



var searchBtn = $("#search-btn");


$('#search-btn').on('click', async function (e) {
    e.preventDefault();

    var city = $(this).siblings("#city-input").val();

    var cityQueryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`;


    const response = await fetch(cityQueryURL);

    const data = await response.json()
        .then(data => {
            var nameResponse = data['name'];
            var tempResponse = data['main']['temp'];
            var windResponse = data['wind']['speed'];
            var humidityResponse = data['main']['humidity'];
            var cityLatitude = data['coord']['lat']
            var cityLongitude = data['coord']['lon']
            console.log(tempResponse);
            console.log(windResponse);
            console.log(humidityResponse);
            console.log(cityLatitude);
            console.log(cityLongitude);
            console.log(data);

        })

    addCity(city);
    renderCities();
    secondAPICall();

});

function secondAPICall() {

    // var uvIndexAPICall = `https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}`
    // fetch(uvIndexAPICall);
}

$(".city-button").on('click', function (e) {
    e.preventDefault();


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