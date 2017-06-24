$.ajaxSetup({
    type: 'GET', dataType: 'json',
    beforeSend:function(){
        $(".loader").show();
    },
    error: function (requestObject, error, errorThrown) {
    },
    complete:function(jqXHR, textStatus){
    }
})
var applicationData={
    locat:{},
    city_list:[]
}
var app_settings={
    unitsArr : ["metric","imperial","kelvin"],
    current_unit:0,
    current_city:null,
    getCurrentUnit:function(){
        return this.unitsArr[this.current_unit]
    },
    unitsSwitcher:function(){
        var app = this;
        if(app.current_unit < app.unitsArr.length-1){
            app.current_unit++;
        }else if(app.current_unit == app.unitsArr.length-1){
            app.current_unit = 0;
        }
    },
    unitsAbbr:function (ind) {
        var abbr;
        switch (this.current_unit){
            case 0: abbr=[" °C" , " meter/sec"];break;
            case 1: abbr=[" °F" , " miles/hour"];break;
            case 2: abbr=[" °K" , " meter/sec"];break;
        }
        return abbr[ind];
    }
}
var requests;
requests = {
    urls: {
        locat: "//freegeoip.net/json/",
        weather:  "https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather",
        forecast: "https://crossorigin.me/http://api.openweathermap.org/data/2.5/forecast/daily?",
        autocomplete: "https://crossorigin.me/http://AutoCompleteCity.geobytes.com/AutoCompleteCity?callback=?&sort=size&q="
    },
    getLocation: function () {
        var self = this;
        $.ajax({
            url: this.urls.locat,
            success: function (location) {
                applicationData.locat = location;
                $.when(self.getCurrentWeather(location.city)).then(function (weather) {
                    self.getForecast(weather.id);
                });
            }
        })
    },
    getCurrentWeather: function (cityName) {
        var req = this,
            data = {
                units: app_settings.getCurrentUnit(),
                appid: "8bc89e986f18ecfafae0cbe02569e0c6"
            };
        if (typeof cityName == "string") {
            data.q = cityName
        } else if (typeof cityName == "number") {
            data.id = cityName
        }
        return $.ajax({
            url: req.urls.weather,
            data: data,
            cache: false,
            success: function (weather) {
                var cities = applicationData.city_list;
                //
                app_settings.current_city = weather.id;
                if (cities[weather.id] == undefined) {
                    cities[weather.id] = {};
                }
                if (cities[weather.id].current == undefined) {
                    cities[weather.id].current = {};
                }
                cities[weather.id].current[app_settings.getCurrentUnit()] = weather;
                view.showCurrentWeather(weather);

                view.appendCityList(weather.name + ", " + weather.sys.country, weather.id);
            },
            complete:function () {
            }
        });
    },
    getForecast: function (id) {
        var data = {
            units: app_settings.getCurrentUnit(),
            appid: "8bc89e986f18ecfafae0cbe02569e0c6",
            id: id,
            cnt: 7
        };
        $.ajax({
            url: requests.urls.forecast,
            data: data,
            cache:false,
            success: function (forecast) {
                if (applicationData.city_list[id].forecast == undefined) {
                    applicationData.city_list[id].forecast = {};
                }
                applicationData.city_list[id].forecast[app_settings.getCurrentUnit()] = forecast;
                if ($("#forecast").find("tbody").is(':empty')) {
                    view.showForecast(forecast)
                } else {
                    view.updateForecastTemp(forecast)
                }
            },
            complete: function () {
                $(".loader").hide();
            }
        });
    },
    getCompleteWeather:function (location) {
        $.when(requests.getCurrentWeather(location)).then(function (weather) {
            requests.getForecast(weather.id);
        })
            appControllersEvents.weatherNowActive();
    },
    getCityList: function (cityName) {
        $.ajax({
            url: requests.urls.autocomplete + cityName,
            beforeSend: function () {
                $("#search").find(".loader").show();
            },
            success: function (cities) {
                view.showAutoCompleteCities(cities);
                view.rightSideHeight();
                $("#search").find(".loader").hide();
            }
        })
    }
};
var view = {
    showCurrentWeather:function(obj){
        console.log(obj);
        var wind_deg = "<i class='wi wi-fw wi-wind towards-"+obj.wind.deg+"-deg'></i>"
        function appendDescription(name,value,abbr){
            var val;
            if(!abbr){
                abbr="";
            }
             val = name+":"+"<span class='unit_value'><strong style='padding-left: 12px'>"+value+"</strong> "+abbr+"</span>";
            (name.split(" ").length>1)?name = name.split(" ").join("_"):false;
            if($("#"+name).length){
                $("#"+name).html(val);
            }else{
                $("#more").append($("<div>",{id:name,
                        html: val
                    })
                )
            }
        }
        $("#city_location").text(obj.name+", "+obj.sys.country);
        $("#currentTemp").text(obj.main.temp.toFixed());
        $("#tempButton").text(app_settings.unitsAbbr(0));
        $("#description").text(obj.weather[0].description);
        $("#weatherIcon").html("<i class='"+"wi wi-owm-"+obj.weather[0].id+"'></i>");
        appendDescription("humidity",obj.main.humidity, " %");
        appendDescription("clouds",obj.clouds.all, " %");
        appendDescription("visibility",obj.visibility, " meters");
        appendDescription("pressure",obj.main.pressure," hPa");
        appendDescription("wind speed",obj.wind.speed,app_settings.unitsAbbr(1));
        appendDescription("wind deg",wind_deg, this.windDegreeToDirect(obj.wind.deg));
        if(obj.wind.gust !== undefined){
            appendDescription("wind gust", obj.wind.gust, app_settings.unitsAbbr(1));
        }
    },
    showForecast:function (obj, selector) {
        var tbl = $("#forecast").find("tbody")
        var city_id = tbl.data("id");
        if(selector !== city_id || !selector){
            tbl.html("");
            for (var i = 0; i < obj.cnt; i++) {
                var fulldate = new Date(obj.list[i].dt * 1000).toString();
                var day = fulldate.split(" ")[0];
                var date = fulldate.split(" ")[2] + "/" + fulldate.split(" ")[1];
                tbl.attr("data-id",obj.city.id).append(
                    $("<tr>", {
                        id: day
                    }).append(
                        $("<td>", {
                            text: day,
                            style: "font-weight: 700"
                        }),
                        $("<td>", {
                            text: date,
                            style: "font-weight: 700"
                        }),
                        $("<td>", {
                            html: "<i class='wi wi-owm-" + obj.list[i].weather[0].id+"'></i>"
                        }),
                        $("<td>", {
                            text: obj.list[i].weather[0].description
                        }),
                        $("<td>", {
                            text: obj.list[i].temp.day.toFixed(0) + app_settings.unitsAbbr(0)
                        }),
                        $("<td>", {
                            html: "<i class='wi wi-humidity'> " + obj.list[i].humidity + "</i>"
                        })
                    )
                )
            }
        }else {
            view.updateForecastTemp();
        }
        this.rightSideHeight();
    },
    updateWeather:function (obj) {
        //local
        var app = app_settings, current = obj.current[app.getCurrentUnit()], forecast = obj.forecast[app.getCurrentUnit()];
        $("#currentTemp").text(current.main.temp.toFixed());
        $("#tempButton").text(app.unitsAbbr(0));
        $("#wind_speed").find("span").html("<strong style='padding-left: 12px'>"+current.wind.speed+"</strong>"+app.unitsAbbr(1));
        //forecast
    },
    updateForecastTemp:function(){
        var forecast = applicationData.city_list[app_settings.current_city].forecast[app_settings.getCurrentUnit(0)];
        for (var i = 0; i < forecast.cnt; i++) {
            var day = new Date(forecast.list[i].dt * 1000).toString().split(" ")[0],
                temp  = forecast.list[i].temp.day.toFixed(0);
            $("#"+day).find("td:nth-child(5)").text(temp +" "+ app_settings.unitsAbbr(0));
        }
    },
    rightSideHeight:function () {
        $(".changeable").each(function (i) {
            if($(this).height()>$("#main_ph").height()){
                $(this).css({height:$("#main_ph").height(),overflowY: "scroll"});
            }
        })
    },
    showAutoCompleteCities:function (json) {
        $("#char").html("");
        for(var i =0; i<json.length; i++){
            $("#char").append(
                $("<option>").val(json[i])
            )
        }
    },
    appendCityList:function(cityName,id){
        if($("#city_list").find("[data-city_id = "+id+"]").length==0){
            $("#city_list").append(
                $("<div>").text(cityName).addClass("city").attr("data-city_id", id)
            )
        }
    },
    windDegreeToDirect:function (degree) {
        var windCard={
            "N":[],
            "NNE":[11.25, 33.75],
            "NE":[33.75, 56.25],
            "ENE":[56.25, 78.75],
            "E":[78.75, 101.25],
            "ESE":[101.25, 123.75],
            "SE":[123.75, 146.25],
            "SSE":[146.25, 168.75],
            "S":[168.75, 191.25],
            "SSW":[191.25, 213.75],
            "SW":[213.75, 236.25],
            "WSW":[236.25, 258.75],
            "W":[258.75, 281.25],
            "WNW":[281.25, 303.75],
            "NW":[303.75, 326.25],
            "NNW":[326.25, 348.75]
        }, card;
        for(var abbr in windCard){
            if(degree > windCard[abbr][0] && degree < windCard[abbr][1]){
                card = abbr;
            }
        }
        return card;
    }
}
var appControllersEvents = {
    changeUnits:function(){
        $("#tempButton").on("click",function (e) {
            var app = app_settings, id = app.current_city, $this = $(this), cities = applicationData.city_list;
            app_settings.unitsSwitcher();
            if(cities[id].current[app.getCurrentUnit()] == undefined){
                $.when(requests.getCurrentWeather(id)).then(function () {
                    requests.getForecast(id);
                    $this.on();
                });
            }else{
                view.updateWeather(cities[id]);
                view.updateForecastTemp(cities[id].forecast[app.getCurrentUnit()])
            }
        })
    },
    iconBarEvents:function () {
        $(".icon-bar").on("click","a",function (e) {
            var direct = $(this).data("link"),
                desc = $(this).data("desc");
            if(!$(this).hasClass("active")&&direct!=="city_list"){
                $("#icons_info").text(desc);
                $(this).parent("div").find("a").removeClass("active");
                $(this).addClass("active");
                $(".changeable").hide();
                $("#"+direct).show();
            }else if(direct === "city_list"){
                $("#"+direct).animate({width:"toggle"}, 500);
            }
        })
    },
    selectCity:function () {
        $("#city_list").on("click",".city",function(){
            app_settings.current_city = $(this).data("city_id");
            var obj = applicationData.city_list[app_settings.current_city];

            if(obj.current[app_settings.getCurrentUnit()] && obj.forecast[app_settings.getCurrentUnit()]){
                view.showCurrentWeather(obj.current[app_settings.getCurrentUnit()]);
                view.showForecast(obj.forecast[app_settings.getCurrentUnit()]);
            }else{
                requests.getCompleteWeather(app_settings.current_city);
            }
            appControllersEvents.weatherNowActive();
        });
        $(document).on("click",function (e) {
            var container = $("#city_list"), bt = $(".icon-bar").find("[data-link='city_list']"), icon = bt.find(".fa-list");
            if (!container.is(e.target) && !bt.is(e.target) && !icon.is(e.target) && container.has(e.target).length === 0){
                container.animate({width:"hide"}, 500);
            }
        })
    },
    weatherNowActive:function () {
        $(".icon-bar").find(".active").removeClass("active");
        $(".icon-bar").find("[data-desc='now']").addClass("active");
        $(".changeable").hide();
        $("#more").show();
        $("#searchinput").val("");
        $("#city_list").animate({width:"hide"}, 500);
    },
    cityListClick:function () {
        $("#searchinput").on('keyup', function (e) {
            var val = this.value;
            if(e.keyCode == 13 && val.length>=3){
                var city = val.split(", ")[0],
                    index = val.split(", ")[1],
                    country = val.split(", ")[2],
                    location = city+", "+index;
                requests.getCompleteWeather(location);
            }else{
                if (val.match(/^[a-zA-Z]*$/)) {
                    $("#input_msg").hide();
                    requests.getCityList(val);
                } else {
                    $("#input_msg").show();

                }
            }
        });
        $("#search_apply").on("click",function () {
            var val = $("#searchinput").val(),
                city = val.split(", ")[0],
                index = val.split(", ")[1],
                country = val.split(", ")[2],
                location = city+", "+index;
            requests.getCompleteWeather(location)
        });
        $("#searchclear").on("click",function () {
            $("#searchinput").val("");
        })
    }
}
 function init() {
     requests.getLocation();
     appControllersEvents.changeUnits();
     appControllersEvents.iconBarEvents();
     appControllersEvents.cityListClick();
     appControllersEvents.selectCity();
}
$(document).ready(function() {

    init();
});