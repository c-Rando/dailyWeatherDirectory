$(document).ready(function () {
    console.log("ready");
    // prepares dom 

    // TODO: GLOBAL VARIABLES
    var dayOneContainer = $("#day-one-container");
    var currentTemperature = $('#current-temperature');
    var currentCity = $('#current-city'); // todo #current-city  make equal to 5 day
    var currentWSpeed = $('#wind-speed'); // todo add wind speed to details
    var futureWSpeed = "";
    // var holdingDiv;
    // var userEmailSpan = document.querySelector("#user-email");
    var chosenCity = $("#chosen-city")

    //*! CONFIRMED VARIABLES
    var searchCityBtnEl = $('#search-city');
    var timeDispEl = $("#time-display");
    var apiKey = "653094733b20fc02dc6f1e6e6b8bf37e";

    // *! GIVEN a weather dashboard with form inputs COMPLETED
    // *! WHEN I search for a city
    // *! THEN I am presented with current and future conditions for that city and that city is added to the search history
    // *!  WHEN I view current weather conditions for that city
    // *! THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
    // WHEN I view the UV index
    // THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
    // *! WHEN I view future weather conditions for that city
    // *! THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
    // WHEN I click on a city in the search history
    // THEN I am again presented with current and future conditions for that city

    // function appendCurrentCityToPage() {
    //     $("#chosen-city").text(city);
    //     console.log("#chosen-city");
    //     $("#chosen-city").attr("src", city);
    // };



    // *! COMPLETED gets selected city CURRENT weather
    function getCurrentWeather(event) {
        event.preventDefault();
        var city = $("#city-name").val();
        console.log("current searched was: ", city);
        $("#chosen-city").text(city);
        $("#current-city").text(city);
        var currentUrlApi = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        console.log("current day communication succeed: ", currentUrlApi);
        $.ajax({
            url: currentUrlApi,
            success: function (response) {
                console.log("object extracted: ", response);
                console.log("attempting to pull the json: ", response.weather[0].icon);
                console.log("this is the lat, then lon: ", response.coord.lat, response.coord.lon);
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
    // TODO must return null if city is invalid
    // TODO must return cities with states specified

    // *! COMPLETED gets 5 day weather forecast
    function getFiveDayWeatherApi(lat, lon) {
        var city = $("#city-name").val();
        console.log("current searched was: ", city)
        var fiveDayUrlApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,current,alerts&units=imperial&appid=${apiKey}`
        console.log("fivedayURL: ", fiveDayUrlApi)
        $.ajax({
            url: fiveDayUrlApi,
            success: function (response) {
                console.log("object extracted: ", response);
                console.log(response.daily[0].dt);
                for (var i = 0; i < 6; i++) {
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
                    console.log(uvi)
                    // TODO fetch on uv index then displays color to page

                    // if (uvi <= 2) {
                    //     document.getElementsByTagName("H1")[0].setAttribute("class", "democlass");
                    //     uvInd.css({ "background-color": "green" })
                    // } else if (uvi <= 5) {
                    //     uvInd.css({ "background-color": "yellow", "color": "black" })
                    // } else if (uvi <= 7) {
                    //     uvInd.css({ "background-color": "orange" })
                    // } else if (uvi <= 10) {
                    //     uvInd.css({ "background-color": "red" })
                    // } else if (uvi >= 11) {
                    //     uvInd.css({ "background-color": "purple" })
                    // }
                    storeObj = {
                        weather: weather,
                        icon: icon,
                        temp: temp,
                        uvi: uvi,
                    };
                    // TODO MUST REMOVE 5 day history after each search

                    //*! COMPLETED must store value entered by userinput to user storage

                    localStorage.setItem(city + " day-" + i, JSON.stringify(storeObj));
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
    //  TODO: MUST SET RENDER LOCAL STORAGE TO THE SCREEN

    // *! COMPLETED time display function
    function displayTime() {
        var rightNow = moment().format('MMM DD, YYYY [at] hh:mm:ss a');
        timeDispEl.text(rightNow);
        var present = rightNow.substring(0, 6);
        console.log(present)
    };

    $(searchCityBtnEl).click(function () {
        $("#current-weather-container").empty();
        $("#day-one-container").empty();
        $("#day-two-container").empty();
        $("#day-three-container").empty();
        $("#day-four-container").empty();
        $("#day-five-container").empty();
    });

    setInterval(displayTime, 1000);
    searchCityBtnEl.on("click", getCurrentWeather);
    // searchCityBtnEl.on("click", appendCurrentCityToPage);
});