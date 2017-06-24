/**
 * Created by zzharuk on 21.06.2016.
 */

var orderColorArray = [], intObj={}, toObj={},
    sound={
        red:"https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
        blue:"https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
        green:"https://s3.amazonaws.com/freecodecamp/simonSound4.mp3",
        yellow:"https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
        hard_button:"http://www.soundjay.com/button/sounds/button-28.mp3",
        error:"http://www.soundjay.com/button/sounds/beep-05.mp3",
        playSound:function(snd, vol){
            var obj = document.createElement("audio");
            obj.src=snd;
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
        },
        show:function (color, active) {
            if(active){
                $("."+color).css({backgroundColor:colors.active_color[color]});
                sound.playSound(sound[color]);
            }else{
                $("."+color).css({backgroundColor:colors.unactive_color[color]})
            }
        }
    };

function onOffGame(){
    $("#switcher").find("div").click(function(){
        sound.playSound(sound.hard_button);
        if(!gameStatus.on){
            $(".trigger").css({right:2});
            $(".count").css({color:"#DC0D29"});
            gameStatus.on = true;
        }else{
            $(".trigger").css({right:25});
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
            user.waitingtimer.stop();
            var self = this;
            self.timer = 0;
            if(!intObj.gamestartInt){
                intObj.gamestartInt = setInterval(function () {
                    if(self.timer++ == 3){
                        $(".count").text("--");
                        toObj.startingTimeOut = setTimeout(function () {
                            computer.step("newGame")
                        },500);
                        clearInterval(intObj.gamestartInt);
                        delete intObj.gamestartInt
                    }else if(self.timer%2!=0&&self.timer<4){
                        $(".count").text("**");
                    }else if(self.timer%2==0&&self.timer<4){
                        $(".count").text("--");
                    }
                },200);
            }
        }
    };

function startButtonClickEvent(){
    $(".start").mousedown(function(){
        sound.playSound(sound.hard_button);
        $(this).css({"box-shadow": "none"});
        if(gameStatus.on){
            resetGame();
            setTimeout(startGame.start,500);
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
        intObj.compShowInt=setInterval(function(){
            $(".count").text(orderColorArray.length);
            if(self.i<orderColorArray.length){
                colors.show(orderColorArray[self.i],true);
                toObj.compShowTimeOut=setTimeout(function(){
                    colors.show(orderColorArray[self.i],false);
                    self.i++;
                },1000);
            }else{
                delete self.i;
                clearInterval(intObj.compShowInt);
                delete intObj.compShowInt;
                clearTimeout(toObj.compShowTimeOut);
                if(gameStatus){
                    user.step();
                }
            }
        },2000);
    }
};
//USER STEP
var user = {
    clickcount:0,
    waitingtimer : {
        start : function () {
            var us = this;
            us.timer = 0;
            if(!intObj.userStepInt){
                intObj.userStepInt = setInterval(function () {
                    console.log(us.timer);
                    if(us.timer++ == 4) {
                        user.errMSG();
                        clearInterval(intObj.userStepInt);
                        delete intObj.userStepInt;
                    }
                },1000);
            }else {
                this.stop();
            }
        },
        stop: function () {
            clearInterval(intObj.userStepInt);
            delete intObj.userStepInt;
        }
    },
    step: function(){
        var us = this;
        us.waitingtimer.start();
        $(".col-xs-6").css({cursor:"pointer"}).on().mousedown(function(){
            us.current_color=$(this).attr("class").split(" ")[$(this).attr("class").split(" ").length-1];
            colors.show(us.current_color,true);
            us.clickcount++;
        }).mouseup(function () {
            colors.show(us.current_color,false);
            user.waitingtimer.start();
            us.checkColor();
            checkWin(21);
        });
    },
    checkColor: function () {
        var us = this;
        if(us.current_color!=orderColorArray[us.clickcount-1]){
            us.errMSG();
            us.clickcount = 0;
            us.waitingtimer.stop()
        }else if(us.current_color==orderColorArray[us.clickcount-1]&&us.clickcount==orderColorArray.length){
            computer.step("newStep");
            us.clickcount = 0;
            user.waitingtimer.stop();
        }else{
            us.waitingtimer.start();
        }
    },
    errMSG: function () {
        sound.playSound(sound.error,0.3);
        $(".count").text("!!");
        toObj.errMsgTimeOut=setTimeout(function () {
            if(!gameStatus.strict){
                computer.step("repeat")
            }else{
                computer.step("newGame")
            }
        },1000);
    }
};
function resetGame() {
    if(gameStatus.strict){
        $("#indicator").css({backgroundColor:"#7a0712"});
        delete gameStatus.strict
    }
    $(".count").text("--").css({color:(!gameStatus.on)?"#7a0712":false});
    orderColorArray=[];
    for(var int in intObj){
        clearInterval(intObj[int]);
        delete intObj[int];
    }
    for(var tm in toObj){
        clearTimeout(toObj[tm]);
        delete toObj[tm]
    }
    for (var color in colors.unactive_color){
        colors.show(color, false);
    }
}
function checkWin(steps) {
    if(orderColorArray.length==steps){
        resetGame();
        var times = 0;
            intObj.winInt = setInterval(function () {
               if(times++%2==0){
                   $(".col-xs-6").each(function () {
                       $(this).css({backgroundColor:colors.active_color[$(this).attr("class").split(" ")[$(this).attr("class").split(" ").length-1]]})
                   });
                       $(".count").text("--")
               }else{
                   $(".col-xs-6").each(function () {
                       $(this).css({backgroundColor:colors.unactive_color[$(this).attr("class").split(" ")[$(this).attr("class").split(" ").length-1]]})
                   });
                       $(".count").text("++")
               }
               if(times==8){
                   clearInterval(intObj.winInt);
                   delete intObj.winInt;
               }
            },500);
    }
}
$(document).ready(function(){
    onOffGame();
});