var Cities={}, locat,
    stat = {
        id:0,
        metric : true,
        sys : function(){
            return (this.metric)?"metric":"imperial"
        },
        tempAbbr:function () {
            return (this.metric) ? " °C" : " °F"
        },
        windAbbr:function () {
            return (this.metric) ? " m/s" : " mph"
        }
    };
function CityWeather (json,cityName){
    if(!Cities[json.id]) {
        Cities[json.id] = {
            name: (typeof cityName != 'undefined' ) ? cityName : json.name + ", " + json.sys.country
        };
    }
    if(!Cities[json.id].weather){
        Cities[json.id].weather={
            icon : json.weather[0].id,
            humidity : json.main.humidity,
            pressure : json.main.pressure,
            desc : json.weather[0].description,
            clouds : json.clouds.all,
            wind_deg: json.wind.deg
        }
    }
        if(!Cities[json.id].forecast){
            Cities[json.id].forecast = {}
        }
        Cities[json.id].weather[stat.sys()]={
            temp : json.main.temp.toFixed(0),
            wind_speed : json.wind.speed
        };
        stat.id=json.id;
    console.log(Cities[json.id]);
    view.displayWeather(Cities[stat.id].weather);
    return Cities[json.id];
}
var requests = {
    urls: {
        locat: '//freegeoip.net/json/',
        weather: "https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather",
        forecast: "https://crossorigin.me/http://api.openweathermap.org/data/2.5/forecast/daily?",
        autocomplete:"https://crossorigin.me/http://AutoCompleteCity.geobytes.com/AutoCompleteCity?callback=?&sort=size&q="
    },
    getLocation: function () {
        $.ajax({
            url:this.urls.locat, type: 'GET', dataType: 'json',
            beforeSend: function(){
                $("#loader").show();
                $("#icons_info").text("Loading");
            },
            success: function (location) {
                /*$("#icons_info").text(control.icons.local.desc);*/
                console.log(location);
                $("#loader").hide();
                locat = location;
                requests.getCurrentWeather(requests.urls.weather);
            },
            error: function () {
                locat.error = setTimeout(function () {
                    getLocation()
                },3000)
            }
        })
    },
    getCurrentWeather:function (url, cityName) {
        var data = {
            units: stat.sys(),
            appid: "8bc89e986f18ecfafae0cbe02569e0c6"
        };
        if(cityName){
            data.q = cityName;
        }else{
            data.lat = locat.latitude;
            data.lon = locat.longitude
        }
        $.ajax({
            url:url, type: 'GET', dataType: 'json',
            data: data,
            beforeSend: function(){
                $("#loader").show();
                $("#icons_info").text("Loading");

            },
            success: function (weather) {
                $("#loader").hide();
                CityWeather(weather, cityName);
                requests.getForecast(weather.id);
            }
        });
    },
    getForecast:function (id) {
        var data = {
            units: stat.sys(),
            appid: "8bc89e986f18ecfafae0cbe02569e0c6",
            id: id,
            cnt:5
        };
        $.ajax({
            url:requests.urls.forecast,
            type: 'GET', dataType: 'json',
            data: data,
            success: function (forecast) {
                Cities[stat.id].forecast[stat.sys()]= forecast;
                view.displayWeather(Cities[stat.id].weather);
                view.showForecast(forecast);
                console.log(forecast);
            }
        });
    },
    getSearchCityWeather:function (cityName) {
        $.ajax({
            url:  requests.urls.autocomplete+ cityName,
            type: 'GET',
            dataType: 'json',
            success: function (json) {
                console.log(json);
                if(json[0]!="%s"){
                    $("#search_content").html("");
                    for(var i =0; i<json.length; i++){
                        $("#search_content").append(
                            $("<div>").text(json[i]).addClass("city")
                        )
                    }
                }
                control.showSearchCityWeather()
            }
        })
    }
};
var view = {
    displayWeather:function (obj) {
        console.log(obj);
        var wind_deg = "<i class='wi wi-fw wi-wind towards-"+obj.wind_deg+"-deg'></i>"
        function appendDescription(name,value, abbr){
            var val = name+":"+"<strong style='padding-left: 12px'>"+value+"</strong> "+abbr
            console.log(name+": "+ $("#"+name).length);
            if($("#"+name).length){
                $("#"+name).html(val);
            }else{
                $("#more").append($("<div>",{id:name,
                        html: val
                    })
                )
            }
//<div id="currentLoc"></div>
        }
        $("#currentTemp").text(obj[stat.sys()].temp);
        $("#tempButton").text(stat.tempAbbr());
        $("#weatherIcon").find("i").addClass("wi wi-owm-"+obj.icon);
        $("#description").text(obj.desc);
        $("#more").append(
            appendDescription("humidity",obj.humidity, " %"),
            appendDescription("clouds",obj.clouds, " %"),
            appendDescription("pressure",obj.pressure," hPa"),
            appendDescription("wind speed",obj[stat.sys()].wind_speed, stat.windAbbr()),
            appendDescription("wind deg",wind_deg,"")
        )
        $(".city_location")
    },
    showForecast:function (obj) {
            for (var i = 0; i < obj.cnt; i++) {
                var fulldate = new Date(obj.list[i].dt * 1000).toString();
                var day = fulldate.split(" ")[0];
                var date = fulldate.split(" ")[2] + "/" + fulldate.split(" ")[1];
                if($("#"+day).length){

                }else{
                    $("#forecast").find("tbody").append(
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
                                    text: obj.list[i].temp.day.toFixed(0) + (stat.tempAbbr())
                                }),
                                $("<td>", {
                                    html: "<i class='wi wi-humidity'> " + obj.list[i].humidity + "</i>"
                                })
                            )
                    )
                }
        }
    },
    displayCityList:function () {
        $("#city_list").html("");
            for (var p in Cities){
                $("#city_list").append(
                    $("<div>",{
                        id:p,
                        text:Cities[p].name,
                        class:"citylist"
                    })
                )
            }
    },
    displayDate:function(){
        var fullDate = new Date();
        var twoDigitMonth = ((fullDate.getMonth()+1)<10) ? '0'+fullDate.getMonth()+1 : (fullDate.getMonth()+1);
        var currentDate = fullDate.getDate() + "." + twoDigitMonth + "." + fullDate.getFullYear();
        $('#currentDate').text(currentDate);
        function time() {
            var today = new Date();
            var day_of_week = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
            var day_ = day_of_week[today.getDay()];
            var hours_ = today.getHours();
            var min_ = today.getMinutes();
            var sec_ = today.getSeconds();
            var zeros;
            var zerom = zeros = '';
            if(min_ < 10) zerom = '0';
            if(sec_ < 10) zeros = '0';
            $("#currentTime").html(day_+'<br>'+hours_+':'+zerom+min_+":"+zeros+sec_);
        }
        setInterval(time, 1);
    }
};
var control = {
/*    icons : {
        city_list:{desc:"cities list"},
        local:{id:"#more",desc:"weather now"},
        forecast_icon:{id:"#forecast",desc:"forecast"},
        searchBut:{id:"#search_field",desc:"search city weather"}
    },*/
    iconsControl:function () {
        $(".icon-bar").on("click","a",function () {
            /*$(".active_icon").removeClass("active_icon");
            $(this).addClass("active_icon");
            $(".changeable").hide();
            $(control.icons[$(this).attr("id")].id).show();
            $("#icons_info").text(control.icons[$(this).attr("id")].desc);*/
            if(!$(this).hasClass("active")){
                $(".icon-bar").find(".active").removeClass("active");
                $(this).addClass("active");
                $("#icons_info").text($(this).data("desc"));
                $(".changeable").hide();
                $("#"+$(this).data("link")).show();
            }


        });
        //Form
        /*$(".form-control").focus(function () {
            $(".col-xs-8:visible").hide();
            $(".icons i").css({color:"#000"});
            $("#searchBut").find("i").css({color:"#1A87D7"});
            $(this).select();
            $('#search_field').show();
            $("#icons_info").text("search by city");
        });*/
        // cities list
        $("#city_list_select").on("click",function (e) {
            /*$("#city_list").toggle();*/
            console.log(e)
            $("#city_list").animate({width:'toggle'},500);
            /*$("#city_list").show("slide", { direction: "left" }, 1000);*/
            view.displayCityList();
            $(".citylist").on("click",function (e) {
                console.log(e);
                $("#city_list").hide("slow");
                var id = $(this).attr("id");
                if(stat.id!=id){
                    stat.id = id;
                    if(Cities[stat.id].weather[stat.sys()]){
                        view.displayWeather(Cities[stat.id].weather);
                        view.showForecast(Cities[stat.id].forecast);
                    }else{
                        view.changeSystem()
                    }
                }
            })
        });
        //hide city_list
        /*$(document).mouseup(function (e)
        {
            var container = $("#city_list");
            if (!container.is(e.target) // if the target of the click isn't the container...
                && container.has(e.target).length === 0) // ... nor a descendant of the container
            {
                container.hide("slow");
            }
        });*/
        //tempButton
        $('#tempButton').on('click', function(){
            (stat.metric)?stat.metric=false:stat.metric=true;
            control.changeSystem();
            console.log(stat.metric)
        });
    },
    changeSystem:function () {
            if(!Cities[stat.id].weather[stat.sys()]) {
                $.getJSON("http://api.openweathermap.org/data/2.5/weather?id=" + stat.id + "&units="+stat.sys()+"&appid=8bc89e986f18ecfafae0cbe02569e0c6", function (json) {
                    CityWeather(json);
                })
            }else {
                $("#currentTemp").text(Cities[stat.id].weather[stat.sys()].temp);
                $('#tempButton').text(stat.tempAbbr());
            }
            if(!Cities[stat.id].forecast[stat.sys()]) {
                $.getJSON("http://api.openweathermap.org/data/2.5/forecast/daily?id="+stat.id+"&units="+stat.sys()+"&appid=8bc89e986f18ecfafae0cbe02569e0c6", function (json) {
                    Cities[stat.id].forecast[stat.sys()] = json;
                    view.showForecast(Cities[stat.id].forecast[stat.sys()])
                })
            }else{
                $("#forecast .col-xs-3").find("div:nth-child(5)").each(function (index) {
                    $(this).text(Cities[stat.id].forecast[stat.sys()].list[index].temp.day.toFixed(0)+stat.tempAbbr())
                })
            }
    },
    searcher: function () {
        $("#searchclear").click(function(){
            $("#searchinput").val('');
            $("#search_content").html("");
        });
        $(".form-control").on("keyup input",function() {
            var cityName = $(this).val();
            requests.getSearchCityWeather(cityName)
        })
    },
    showSearchCityWeather:function () {
        $(".city").on("click",function () {
            var cityName=$(this).text().split(",")[0];
            requests.getCurrentWeather(requests.urls.weather,cityName);
            $("#search_field").hide();
            $("#main_ph,#more").show();
        });
    },
    on:function () {
        this.iconsControl();
        this.searcher();
    }
};
function init() {
    requests.getLocation();
    view.displayDate();
    control.on();
}
$(document).ready(function() {
 init();
});