$(document).ready(function() {
    console.log("ready");

// TODO: GLOBAL VARIABLES
// var city = "";

var searchButton = $('#search-button');
var currentTemperature = $('#current-temperature');
var currentCity = $('#current-city');
var currentHumidity = $('#humidity');
var currentWSpeed = $('#wind-speed');
var currentUvIndex = $('#uv-index');
var currentWeather = $('#current-weather');
var apiKey = "653094733b20fc02dc6f1e6e6b8bf37e";
var futureWeather = "";
var futureHumidity = "";
var futureTemperature = "";
var futureWSpeed = "";
var futureUvIndex = "";
var timeDispEl = $("#time-display");
var testButtonEl = $("#testButton")

//*! CONFIRMED VARIABLES
var searchCity = $('#search-city');

var fiveDayUrlApi = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`

var currentUrlApi ; `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`


function displayTime() {
    
};

// todo: ALL FUNCTIONS






// todo city search
function cityLookup() {

};

// todo gets selected city CURRENT weather
function getCurrentWeather() {

};

// todo get future weather
function getFutureWeather() {

};

// todo gets 5 day weather forecast
function get5DayWeatherApi() {

};


// todo must store value entered by userinput to user storage
function storeHistory() {

    // localStorage.setItem(city);
};

var searchedState = localStorage.getItem("state");

//*!
state.textContent = searchedState;
//*!


    searchedState.addEventListener("click", function() {
    localStorage.setItem("state", searchedState);
    console.log(searchedState)
});







// TODO: generate current date
function displayTime() {
    var rightNow = moment().format('MMM DD, YYYY [at] hh:mm:ss a');
    timeDispEl.text(rightNow);
    var present = rightNow.substring(0,6);
    console.log(present)
};



function generateLocalDate() {
    $("#search-button").on("click", function () {

        var value = $(this).siblings("userInput").val()
        console.log(value)
        // var date = moment().format('L');    // 05/18/2021
        console.log()
    })
};

generateLocalDate();


setInterval(displayTime, 1000)

});

