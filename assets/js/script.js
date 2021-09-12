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

    var cityQueryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;

    const response = await fetch(cityQueryURL);

    const data = await response.json();
    console.log(data)

    addCity(city);


    renderCities();

});

$(".city-button").on('click', function (e) {
    e.preventDefault();


})

function addCity(city) {
    var cityText = cityUserInput.value;

    console.log(cityText);

    cities = getCities();
    console.log(cities);

    // if (savedCities === "") {
    //     return;
    // }

    cities.push(city);
    city.value = "";

    console.log(cities);

    localStorage.setItem('city-history', JSON.stringify(cities))
}

function getCities() {

    return JSON.parse(localStorage.getItem('city-history')) || [];

}

function renderCities() {

    cities = getCities();
    console.log(cities)

    cityList.empty();

    for (var i = 0; i < cities.length; i++) {
        var city = cities[i];
        console.log(city)

        var cityButtons = $("<button>")
        cityButtons.text(city);
        cityButtons.attr("data-index", i);
        cityButtons.addClass("city-button");
        cityButtons.attr("type", "button");

        cityList.append(cityButtons);

    }
}

function init() {
    renderCities();

}

init();