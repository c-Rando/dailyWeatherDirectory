$(document).ready(function () {
    console.log("ready");
    // prepares dom 


    // TODO: GLOBAL VARIABLES
    var dayOneContainer = $("#day-one-container");
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

    //*! CONFIRMED VARIABLES
    var searchCityBtnEl = $('#search-city');


    // GIVEN a weather dashboard with form inputs
    // WHEN I search for a city
    // THEN I am presented with current and future conditions for that city and that city is added to the search history
    // WHEN I view current weather conditions for that city
    // THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
    // WHEN I view the UV index
    // THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
    // WHEN I view future weather conditions for that city
    // THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
    // WHEN I click on a city in the search history
    // THEN I am again presented with current and future conditions for that city


    // todo gets selected city CURRENT weather
    function getCurrentWeather(event) {
        event.preventDefault();
        var city = $("#city-name").val();

        $("#current-city").text(city)

        console.log(city)
        var currentUrlApi = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        console.log("current day communication succeed: ", currentUrlApi)
        $.ajax({
            url: currentUrlApi,
            success: function (response) {
                console.log(response);
                var weatherIcon = response.weather[0].icon
                console.log("attempting to pull the json: ", response.weather[0].icon);
                console.log(response.coord.lat, response.coord.lon);
                getFiveDayWeatherApi(response.coord.lat, response.coord.lon);
            },
            error: function (xhr, status, error) {
                console.log("status: ", status)
                console.log("error: ", error)
            },
            complete: function (xhr, status) {
                console.log("complete: ", status)
            }

        })
    };


    // todo gets 5 day weather forecast
    function getFiveDayWeatherApi(lat, lon) {
        var city = $("#city-name").val();

        console.log(city)
        var fiveDayUrlApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,current,alerts&units=imperial&appid=${apiKey}`
        console.log("fivedayURL: ", fiveDayUrlApi)
        $.ajax({
            url: fiveDayUrlApi,
            success: function (response) {
                console.log(response);
                console.log(response.daily[0].dt);
                for (var i = 0; i < 6; i++) {
                    console.log(response.daily[i].weather[0].description)
                    console.log(response.daily[i].weather[0].main)
                    var weather = response.daily[i].weather[0].description;
                    var icon = response.daily[i].weather[0].icon;
                    var temp = response.daily[i].temp.day;
                    var uvi = response.daily[i].uvi;
                    var iconImage = $("<img>").attr("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);
                    console.log(iconImage)
                    console.log(response.daily[i].temp.day);
                    console.log("div" + '[data-index="' + i + '"]')
                    $("div" + '[data-index="' + i + '"]').append(
                        " weather: " + weather,
                        iconImage, "<br>",
                        " temp: " + temp, "<br>",
                        " uv index: " + uvi
                    );
                    storeObj = {
                        weather: weather,
                        icon: icon,
                        temp: temp,
                        uvi: uvi
                    }
                    localStorage.setItem("day-" + i, JSON.stringify(storeObj));
                };

            },
            error: function (xhr, status, error) {
                console.log("status: ", status)
                console.log("error: ", error)
            },
            complete: function (xhr, status) {
                console.log("complete: ", status)
            }
        })
    };

    // todo must store value entered by userinput to user storage
    function storeHistory() {

    };

    function displayTime() {
        var rightNow = moment().format('MMM DD, YYYY [at] hh:mm:ss a');
        timeDispEl.text(rightNow);
        var present = rightNow.substring(0, 6);
        console.log(present)
    };

    setInterval(displayTime, 1000);
    searchCityBtnEl.on("click", getCurrentWeather);
});