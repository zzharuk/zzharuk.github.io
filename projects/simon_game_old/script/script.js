/**
 * Created by zzharuk on 21.06.2016.
 */
var intObj={};
var orderColorArray = [],
    sound={
        red:"https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
        blue:"https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
        green:"https://s3.amazonaws.com/freecodecamp/simonSound4.mp3",
        yellow:"https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
        hard_button:"http://www.soundjay.com/button/sounds/button-28.mp3",
        error:"http://www.soundjay.com/button/sounds/beep-05.mp3",
        playSound:function(color, vol){
            var obj = document.createElement("audio");
            obj.src=color;
            obj.volume = (vol)?vol:0.8;
            obj.autoPlay=false;
            obj.load();
            obj.play();
        }
    },
    colors = {
        unactive_color:{
            green:"#00A74A",
            red:"#9F0F17",
            yellow:"#CCA707",
            blue:"#094A8F"
        },
        active_color:{
            green:"#13FF7C",
            red:"#FF4C4C",
            yellow:"#FED93F",
            blue:"#1C8CFF"
        },
        order:{
            1:"green",
            2:"red",
            3:"yellow",
            4:"blue"
        }
    };
function showColor(color, active){
    if(active){
        $("."+color).css({backgroundColor:colors.active_color[color]});
        sound.playSound(sound[color]);
    }else{
        $("."+color).css({backgroundColor:colors.unactive_color[color]})
    }
}
function resetGame() {
    if(gameStatus.strict){
        timeOut.int1=setTimeout(function(){$("#indicator").css({backgroundColor:"#7a0712"})},200);
        delete gameStatus.strict
    }
    timeOut.int2=setTimeout(function(){$(".count").css({color:"#7a0712"}).text("--")},200);
    orderColorArray=[];
    startGame.stop();
    user.waitingtimer.stop();
    delete computer.interval;
}
function onOffGame(){
    $("#switcher").find("div").click(function(){
        sound.playSound(sound.hard_button);
        if(!gameStatus.on){
            $(".trigger").css({right:1});
            $(".count").css({color:"#DC0D29"});
            gameStatus.on = true;
        }else{
            $(".trigger").css({right:15});
            gameStatus.on = false;
            resetGame()
        }
    });
    startButtonClickEvent();
    setStrict();
}
function setStrict(){
    $(".strict").mousedown(function(){
        $(this).css({"box-shadow": "none"});
        if(gameStatus.on&&!gameStatus.strict){
            gameStatus.strict = true;
            $("#indicator").css({backgroundColor:"#DC0D29"});
        }else{
            gameStatus.strict = false;
            $("#indicator").css({backgroundColor:"#7a0712"});
        }
        sound.playSound(sound.hard_button);
    }).mouseup(function(){
        $(this).css({"box-shadow": "0 2px 3px #454545"})
    })
}
var gameStatus ={},
    startGame = {
        start : function () {
            //off User Waiting Step Timer
            user.waitingtimer.stop();
            var self = this;
            self.timer = 0;
            if(self.starting){
                clearTimeout(self.starting);
                delete self.starting
            }
            if(!self.interval){
                this.interval = setInterval(function () {
                    if(self.timer++ == 3){
                        $(".count").text("--");
                        self.starting = setTimeout(function () {
                            computer.step("newGame")
                        },500);
                        clearInterval(self.interval);
                        delete self.interval
                    }else if(self.timer%2!=0&&self.timer<4){
                        $(".count").text("**");
                    }else if(self.timer%2==0&&self.timer<4){
                        $(".count").text("--");
                    }
                },200);
            }
        },
        stop: function () {
            clearInterval(this.interval);
            delete this.interval;
        }
    };

function startButtonClickEvent(){
    $(".start").mousedown(function(){
        sound.playSound(sound.hard_button);
        $(this).css({"box-shadow": "none"});
        if(gameStatus.on){
            startGame.start();
            console.log(window.activeTimers.filter(function(val) {return val.delay > 500}));
        }
    }).mouseup(function(){
        $(this).css({"box-shadow": "0 2px 3px #454545"})
    });
}
var computer = {
    step:function (arg) {
        $(".col-xs-6").css({cursor:"default"}).off();
        if(arg=="newGame"){
            orderColorArray=[];
            orderColorArray.push(colors.order[Math.floor(Math.random() * 4)+1]);
        }else if(arg=="newStep"){
            orderColorArray.push(colors.order[Math.floor(Math.random() * 4)+1]);
        }
        var self = this;
        self.i = 0;
        self.interval=setInterval(function(){
            $(".count").text(orderColorArray.length);
            if(self.i<orderColorArray.length){
                showColor(orderColorArray[self.i],true);
                timeOut.int3=setTimeout(function(){
                    showColor(orderColorArray[self.i],false);
                    self.i++;
                },1000);
            }else{
                delete self.i;
                clearInterval(self.interval);
                clearTimeout(timeOut.int3);
                if(gameStatus){
                    user.step();
                }
            }
        },2000);
    }
};
//USER STEP
var user = {
    waitingtimer : {
        start : function () {
            var us = this;
            us.timer = 0;
            if(!this.interval){
                this.interval = setInterval(function () {
                    console.log(us.timer);
                    if(us.timer++ == 4) {
                        user.errMSG();
                        clearInterval(us.interval);
                        delete us.interval;
                    }
                },1000);
            }else {
                this.stop();
            }
        },
        stop: function () {
            clearInterval(this.interval);
            delete this.interval;
        }
    },
    clickcount:0,
    step: function(){
        var us = this;
        us.waitingtimer.start();
        $(".col-xs-6").css({cursor:"pointer"}).on().mousedown(function(){
            us.current_color=$(this).attr("class").split(" ")[$(this).attr("class").split(" ").length-1];
            sound.playSound(sound[us.current_color]);
            $(this).css({backgroundColor:colors.active_color[us.current_color]});
            us.clickcount++;
        }).mouseup(function () {
            $(this).css({backgroundColor:colors.unactive_color[us.current_color]});
            user.waitingtimer.start();
            us.checkColor();
        });
    },
    checkColor: function () {
        var us = this;
        if(us.current_color!=orderColorArray[us.clickcount-1]){
            us.errMSG();
            us.clickcount = 0;
            user.waitingtimer.stop()
        }else if(us.current_color==orderColorArray[us.clickcount-1]&&us.clickcount==orderColorArray.length){
            computer.step("newStep");
            us.clickcount = 0;
            user.waitingtimer.stop()
        }else{
            us.waitingtimer.start();
        }
    },
    errMSG: function () {
        sound.playSound(sound.error,0.3);
        $(".count").text("!!");
        timeOut.int4=setTimeout(function () {
            if(!gameStatus.strict){
                computer.step("repeat")
            }else{
                computer.step("newGame")
            }
        },1000);
    }
};

$(document).ready(function(){
    onOffGame();
    //
    window.originalSetTimeout=window.setTimeout;
    window.originalClearTimeout=window.clearTimeout;
    window.activeTimers=[];
    window.setTimeout=function(func,delay)
    {
        var id = window.originalSetTimeout(func,delay);
        window.activeTimers[id] = {"func": func, "delay": delay};
        return id;
    };
    window.clearTimeout=function(timerID)
    {
        delete window.activeTimers[timerID];
        window.originalClearTimeout(timerID);
    };

    //
});
