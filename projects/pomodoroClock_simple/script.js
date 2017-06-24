function setLength(){
    $(".unselectable").on("click",function(){
        var divValue=$(this).siblings("div");
        if(pomObj.status=="stop"){
            if(divValue.text()== 1 && $(this).text()=="-"){
                $(this).prop( "disabled", true );
            }else{
                $(this).prop( "disabled", false );
                divValue.text(eval(divValue.text()+$(this).text()+1));
            }
            pomObj.setSessionLengthInHTML();
        }else{
                $("<div>",{text:"Reset timer for change"}).insertBefore($("#icon_cntrl")).css({fontSize:"10px",position:"absolute",textAlign:"center", bottom:"55px",width:"100%"});
            setTimeout(function(){
                $("#icon_cntrl").siblings("div:last").remove();
            },2000);
        }
    });
}
var pomObj;
pomObj = {
    status: "stop",
    timer_status: "session",
    per: 0,
    iconsAdd: function () {
        $("#icon_cntrl").html(" ");
        var icons_arr = ["fa-play", "fa-stop", "fa-pause"];
        if (this.status == "stop") {
            $("<i>", {class: "fa " + icons_arr[1] + " fa-2x"}).appendTo("#icon_cntrl");
        }
        else if (this.status == "run") {
            $("<i>", {class: "fa " + icons_arr[2] + " fa-2x"}).appendTo("#icon_cntrl");
        }
        else if (this.status == "pause") {
            $("<i>", {class: "fa " + icons_arr[0] + " fa-2x"}).appendTo("#icon_cntrl");
        }
    },
    color: function () {
        return (this.timer_status == "session") ? "#12f111" : "#ff0000";
    },
    session_length: function () {
        return (this.timer_status == "session") ? $("#sessionLength").children("div").text() : $("#breakLength").children("div").text();
    },
    setSessionLengthInHTML: function () {
        $("#sessionLength").children("div").text(this.session_length());
        $("#time").text(this.session_length() < 10 ? "0" + this.session_length() + ":00" : this.session_length() + ":00");
    },
    setBreakLengthInHTML: function () {
        $("#breakLength").children("div").text();
    },
    stopClock: function () {
        pomObj.status = "stop";
        pomObj.timer_status = "session";
        $("#timer_status").text(pomObj.timer_status);
        $("#status").text("Stopping");
        $("#time").text(pomObj.session_length() < 10 ? "0" + pomObj.session_length() + ":00" : pomObj.session_length() + ":00");
        $("#load-bar").css({background: "none"});
        clearInterval(this.clock_interval);
        delete this.clock_interval;
        pomObj.per = 0;
    },
    pauseClock: function () {
        clearInterval(this.clock_interval);
        delete this.clock_interval;
        pomObj.status = "pause";
    },
    startPomoClock: function () {
        var minutes, seconds, $time = $("#time"), $load_bar = $("#load-bar"),
            timer = (pomObj.status != "pause") ? pomObj.session_length() * 60 : 60 * parseInt($time.text().split(":")[0]) + parseInt($time.text().split(":")[1]);
        this.clock_interval = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            $load_bar.css({background: "linear-gradient(to top, " + pomObj.color() + " " + pomObj.per + "%,transparent " + pomObj.per + "%,transparent 100%)"});
            $("#load-bar-frame").css({borderColor: pomObj.color()});
            if (timer == 0) {
                $time.text(minutes + ":" + seconds);
                $load_bar.css({background: "none"});
                pomObj.timer_status = (pomObj.timer_status == "session") ? "break" : "session";
                timer = pomObj.session_length() * 60;
                pomObj.per = 0;
            }
            timer--;
            pomObj.per += 100 / (pomObj.session_length() * 60);
            $time.text(minutes + ":" + seconds);
            $("#status").text((pomObj.timer_status) == "session" ? "Work" : "Break");
        }, 1000);
    },
    resumeClock: function () {
        if (!this.clock_interval) this.startPomoClock();
        pomObj.status = "run";
    }
};
$(document).ready(function () {
    setLength();
    pomObj.setSessionLengthInHTML();
    pomObj.setBreakLengthInHTML();
    pomObj.iconsAdd();
    $("<div>",{ class:"text-right",text:"created by zzharuk"}).css({margin:"10px",fontSize:"10px",fontFamily:"'Times New Roman', Times, serif"}).appendTo($("body"));
    $("#load-bar").on("click",function(){
         switch(pomObj.status){
            case "stop":pomObj.status = "run";pomObj.startPomoClock(); break;
            case "run":pomObj.pauseClock(); break;
            case "pause":pomObj.resumeClock(); break;
        }
        pomObj.iconsAdd();
    });
    $("#reset").click(function(){
        pomObj.stopClock();
        $("#icon_cntrl").html(" ");
        pomObj.iconsAdd();
    });
});