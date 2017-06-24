/**
 * Created by zhalex on 17.09.2016.
 */

function userInfo(obj){
    this.category = "user";
    this.id=(obj._id)?obj._id:obj.name;
    this.name=obj.name;
    this.display_name=obj.display_name||$.parseJSON(obj.responseText).message;
    this.logo=obj.logo||"http://placehold.it/300?text=No user avatar";
    this.url="https://www.twitch.tv/"+obj.name;
    this.status="not_found";
    this.container = "#users"
}
function gameInfo(game){
    this.category = "game";
    this.id = game._id;
    this.name = game.name;
    this.logo = game.box.large;
    this.container = "#games"
}
function streamInfo(stream){
    this.category="stream";
    this.id = stream._id;
    this.name = stream.channel.name;
    this.logo = stream.preview.large;
    this.container = "#streams";
    this.cannel_status = stream.channel.status;
    this.viewers = stream.viewers;
    this.cannel_display_name = stream.channel.display_name;
    this.url = stream.channel.url;
    this.lang = stream.channel.broadcaster_language;
}

var View = {
    blockStyle:function (obj) {
        return "block "+((obj.status)?obj.status+" ":"")+obj.category
    },
    drawDefaultBlock:function (object){
        if($("#"+object.id).length){
            return false;
        }
            $(object.container).find(".inner_content").append(
                $("<div>",{
                    class:"col-xs-6 col-sm-3 col-md-3 col-lg-3"
                }).attr("data-lang",object.lang).append(
                    $("<div>",{
                        id:object.id,
                        class:this.blockStyle(object),
                    }).append(
                        $("<button>",{
                            type:"button",
                            class:"close",
                            text:"×"
                        }),
                        $("<img>",{
                            src:object.logo,
                            class:"img-thumbnail"
                        }),
                        $("<p>",{
                            name:object.category
                        })
                    )
                )
            )
    },
    drawUserBlock:function (obj) {
        this.drawDefaultBlock(obj);
        $("#"+obj.id).append(
            $("<p>").append(
                $("<a>",{
                    href:obj.url,
                    target:"_blank",
                    text:obj.display_name
                })
            ),
            $("<p>").text(
                (obj.status!="not_found")?obj.status:"404"),
                (obj.stream)?$("<p>").text(obj.stream):$()
        ).attr("data-name",obj.name);
    },
    drawGameBlock:function (game) {
        this.drawDefaultBlock(game)
        $("#"+game.id).find('[name='+game.category+']').text(game.name);
    },
    drawStreamBlock:function (obj) {
        var stream = new streamInfo(obj);
        this.drawDefaultBlock(stream);
        console.log($("#"+stream.id).find('[name='+stream.category+']').text().length);
        if($("#"+stream.id).find('[name='+stream.category+']').text().length > 0){
            return false;
        }
        $("#"+stream.id).find('[name='+stream.category+']').text(stream.cannel_status)
        $("#"+stream.id).append(
            $("<div>",{
                html:stream.viewers+" viewers on <a href="+stream.url+"/profile target='_blanc'>"+stream.cannel_display_name+"</a>",
                class:"stream_viewers text-left"
            })
        ).attr("data-name",stream.name);
    }
}

$.ajaxSetup({
    type: 'GET',
    dataType:"json",
    headers: {
        'Client-ID': '75ooylbv73082797fnzbgrtfx32a7un'
    }
});
var ajaxCalls={
    url:{
        users:"https://api.twitch.tv/kraken/users/",
        streams:"https://api.twitch.tv/kraken/streams/",
        games:"https://api.twitch.tv/kraken/search/games",
        games_top:"https://api.twitch.tv/kraken/games/top"
    },
    getStream:function (data,offset) {
        var self = this;
        var category = $(".nav-tabs").find(".active").data("category");
        if(category=="users"){
            $.ajaxSetup({
                url: this.url.streams+data.name
            })
           return $.ajax({
                success:function (result) {
                    if(result.stream != null){
                        data.status="online";
                        data.stream=result.stream.game
                    }else{
                        data.status="offline";
                        data.stream=false;
                    }
                    View.drawUserBlock(data)
                }
            })
        }else{
            $.ajaxSetup({
                data: {
                    game: data,
                    offset:(offset)?offset:0
                },
                url: this.url.streams
            })
           return $.ajax({
                success: function (result) {
                    if (result.streams != null) {
                        for (var i = 0; i < result.streams.length; i++) {
                            View.drawStreamBlock(result.streams[i])
                        }
                    }
                }
            })
        }
    },
    getUserInfo:function (username,count) {
        var self = this;
       return $.ajax({
            url: this.url.users + username,
            success: function (resp) {
                var user = new userInfo(resp);
                self.getStream(user);
            },
            error: function (resp) {
                var user = new userInfo(resp);
                user.id = username;
                View.drawUserBlock(user);
            }
        })
    },
    getGameInfo:function (value) {
        var self = this;
       return $.ajax({
            data: {
                q: value,
                type: "suggest"
            },
            url: this.url.games,
            success: function (response) {
                if (response.games.length > 0) {
                    for (var g = 0; g < response.games.length; g++) {
                        var game = new gameInfo(response.games[g])
                        View.drawGameBlock(game);
                    }
                } else {
                    $("#content_box").append(
                        $("<div>", {
                            class: "block offline col-md-2",
                        }).text("No much found")
                    )
                }
            }
        })
    },
    getTopGame:function (offset) {
       return $.ajax({
            data:{
                limit:25,
                offset:(offset)?offset:0
            },
            url:this.url.games_top,
            success:function (games) {
                $("#games").find(".h3").text(games.top.length+" top games");
                for (var i=0;i<games.top.length;i++){
                    var game = new gameInfo(games.top[i].game)
                    View.drawGameBlock(game);
                }
            }
        })
    }
}

function buttonControl() {
    //User buttons sort
    $("#sort").on("click",".user_sort",function () {
        if($(this).attr("title")!="all"){
            $(".block").parent("div").hide();
            $("."+$(this).attr("title")).parent("div").show();
        }else{
            $(".block").parent("div").show();
        }
    })
    // NavBar
    $(".nav-tabs").on("click","li",function () {
        var data_category = $(this).data("category");
        //active tabs
        $(".nav-tabs").find(".active").removeClass("active");
        $(this).addClass("active");
        //show content
        $(".field").hide();
        $("#"+data_category).show();


        //show/hide buttons
        (data_category=="users")?$("#sort").find(".user_sort").show():$("#sort").find(".user_sort").hide();
        //input placeholder
        $("#search-box").attr("placeholder","Search by "+ data_category);
        //
        if(data_category=="games" && $("#games").find(".inner_content").is(":empty")){
            ajaxCalls.getTopGame();
        }
    })
    //Search
    function searchContent(){
        var category = $(".nav-tabs").find(".active").data("category");
        var value = $("#search-box").val();
        if(value.length>0){
            $("#"+category).find(".inner_content").html("");
            if(category=="users"){
                ajaxCalls.getUserInfo(value);
            }else if(category=="games"){
                ajaxCalls.getGameInfo(value);
            }
            $("#"+category).find(".h3").text(value);
        }
    }
    $('#search-box').on("keydown",function(e){
        if(e.which == 13){
            searchContent();
        }
    });


    //Remove block
    $(document).on('click', '.user', function(e) {
        if ($(e.target).hasClass('close')){
            $(this).closest(".block").parent().remove();
        }else{
            return;
        }
    });

    //Game card action
    $(document).on('click', '.game', function(e) {
        if ($(e.target).hasClass('close')){
            $(this).closest(".block").parent().remove();
        }else{
            ajaxCalls.getStream($(this).find("p").text());
            $("#streams").find(".h3").text($(this).find("p").text())
            $("#streams").find(".inner_content").children().remove();
            $(".field").hide();
            $("#streams").show();
            $(".nav-tabs").find(".active").removeClass("active");
            $(".nav-tabs").find("[data-category='streams']").show().addClass("active");
        }
    });
    //Stream card action
    $(document).on("click",".stream",function (e) {
        if ($(e.target).hasClass('close')){
            $(this).closest(".block").parent().remove();
        }else{
            $('html, body').animate({
                scrollTop: $("#player").show().find("iframe").attr("src","https://www.twitch.tv/"+$(this).data("name")+"/embed").offset().top
            }, 1000);
        }
    });
    //loading new games/streams items
    var games_count = 25;
    var streams_count = 25;
    var $ajax_processing = false;
    $(window).on("scroll",function(e) {
        e.preventDefault();
        if($ajax_processing){
            return false;
        }
        function getReq() {
            var category = $(".nav-tabs").find(".active").data("category");
            $ajax_processing = true;
            if(category == "games"){
                ajaxCalls.getTopGame(games_count);
            }else if(category == "streams"){
                ajaxCalls.getStream($("#streams").find(".h3").text(),streams_count);
            }
            return category;
        }
        if($(window).scrollTop() == $(document).height() - $(window).height()) {
            $.when(getReq()).always(function (data) {
                $ajax_processing = false;
                if(data == "games"){
                    games_count+=25;
                }else if(data == "streams"){
                    streams_count+=25;
                }
            })
        }
    });
}
function CreateDefaultUserList(){
    var usersDefaultList=["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas","comster404","brunofin","xaxPjrt25"],
    calls=usersDefaultList.length;
    $.each(usersDefaultList, function(i,index){
        $.when(ajaxCalls.getUserInfo(index,i)).always(function () {
            calls--;
            if(calls==0){
                $("#users").find(".h3").text("Users default list");
                $("#users").show();
            }
        })
    })
}
$(document).ready(function () {
    CreateDefaultUserList();
    buttonControl();
})
