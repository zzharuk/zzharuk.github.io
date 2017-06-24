/**
 * Created by zhalex on 18.02.2016.
 */

$(document).ready(function() {
    $("#openClose").hide();
    function LocalWeather(value) {
        $.ajax({
            url: '//freegeoip.net/json/',
            type: 'GET',
            dataType: 'jsonp',
            success: function (location) {
                getWeather(location,value,function (data) {
                    console.log(location);
                    console.log(data);
                    $("#currentLoc").text(location.region_name);
                    var description = data.weather[0].description;
                    description = description.charAt(0).toUpperCase() + description.slice(1);
                    $("#currentTemp").html(data.main.temp);
                    var icon = data.weather[0].icon;
                    var sunRise = data.sys.sunrise;
                    var sunset = data.sys.sunset;
                    $("#weatherIcon").attr("src", "http://openweathermap.org/img/w/" + icon + ".png");
                    $("#humidity").html("Humidity: " + data.main.humidity + "%");
                    $("#description").html(description);
                    $("#sun").html(sunRise + " " + sunset)
                })
            }
        })
    }
    function getWeather(location, value, callback) {
        var url = "https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?";
        $.ajax({
            dataType: "jsonp",
            url: url,
            jsonCallback: 'jsonp',
            data: {
                appid:"3556435b983a95646ad9cab4a5ee0943",
                units: value,
                lat:location.latitude,
                lon:location.longitude
            },
            cache: false,
            success: function (data) {
                callback(data);
            }
        });
    }
    LocalWeather("metric");
    $('#tempButton').on('click', function() {
        if ($(this).text() === " °C") {
            LocalWeather("imperial");
            $(this).html(" °F");
        } else {
            LocalWeather("metric");
            $(this).html(" °C");
        }
    });
    var fullDate = new Date();
    var twoDigitMonth = ((fullDate.getMonth()+1)<10) ? '0'+fullDate.getMonth()+1 : (fullDate.getMonth()+1);
    var currentDate = fullDate.getDate() + "." + twoDigitMonth + "." + fullDate.getFullYear();
    $('#currentDate').text(currentDate);
    function time() {
        var today = new Date();
        var day_of_week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var day_ = day_of_week[today.getDay()];
        var hours_ = today.getHours();
        var min_ = today.getMinutes();
        var sec_ = today.getSeconds();
        var zerom = '';
        if (min_ < 10) zerom = '0';
        $("#currentTime").html(day_ + '<br>' + hours_ + ':' + zerom + min_);
    }
    setInterval(time, 1);
    $("#mainButton").click(function() {
        $("#openClose").slideToggle('slow');
    });
    $('[data-toggle="tooltip"]').tooltip();
});
