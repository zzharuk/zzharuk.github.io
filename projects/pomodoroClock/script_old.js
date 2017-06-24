/**
 * Created by zhalex on 10.10.2016.
 */
var pomodoro={
    session:{
        len:25,
        default:25,
        color:"#12f111",
        text:"Work"
    },
    break:{
        len:5,
        default:5,
        color:"#ff0000",
        text:"Break"
    },
    long_break:{
        default:15,
        len:15
    },
    work_num:{
        default:1,
        len:1
    },
    current_session_name:"session",
    is_pause:false,
    is_run:false,
    is_vibration:true,
    is_sound:true,
    session_timer:function () {
        return this[this.current_session_name].len;
    }
},
    intervals={},
    statistic={
        is_task:false,
        tasks:[],
        pomodoros_left:0,
        modalEvent:function(){
            var self = this;
            $('#task_modal').modal({show:true}).on('shown.bs.modal', function () {
                $("#task_name").focus();
                self.taskButtonEvent();
                $(this).off("shown.bs.modal");
            }).on('hidden.bs.modal', function () {
                self.tasks.push(
                    ($("#task_name").val().length)?$("#task_name").val():"task "+(self.tasks.length+1)
                );
                $(this).off('hidden.bs.modal');
                $("#task_name").val("");
                self.addTasksInfo();
                control.runPomodoro();
            });
        },
        taskButtonEvent:function(){
            $(".input-group-addon").on("click",function () {
                $('#task_modal').modal("hide");
            })
        },
        pomodorosCount:function(){

        },
        addTasksInfo:function () {
            modal.modalHeight();
            var self = this, t_id = self.tasks.length, t_name= self.tasks[self.tasks.length-1];
            $(".carousel-inner").find("tbody").append(
                $("<tr>").append(
                    $("<td>").text(t_name),
                    $("<td>").html(self.dateTask()),
                    $("<td>",{
                        id:"start_"+t_id,
                        html: self.timeTask()
                    }),
                    $("<td>",{
                        id:"stop_"+t_id
                    }),
                    $("<td>",{
                        id:"left_"+t_id
                    })
                )
            )
        },
        dateTask:function () {
            var d = new Date(),
                m_arr = ["Jan.","Feb.","Mar.","Apr.","May.","Jun.","Jul.","Aug.","Sep.","Oct.","Nov.","Dec."],
                m_name = m_arr[d.getMonth()];
            return d.getDate()+" "+m_name+" "+d.getFullYear();
        },
        timeTask:function(){
            var d = new Date();
            return d.getHours()+":"+((d.getMinutes()<10)?"0"+d.getMinutes():d.getMinutes());
        },
        stopTaskTime:function () {
            var t_name = this.tasks.length;
            $("#stop_"+t_name).text(this.timeTask());
        }
    };
var view = {
    setLength:function (name) {
        var but_cont = $("#"+name).find(".len");
        but_cont.text(pomodoro[name].len);
    },
    fillColor: function(){
        return (pomodoro.current_session_name=="session")?pomodoro.session.color:pomodoro.break.color
    },
    currentSessionText:function () {
        $('#text_status').text(pomodoro[pomodoro.current_session_name].text)
    },
    errorMsg:function () {
        if(intervals.blink){
            clearInterval(intervals.blink);
        }
        var reset = $("#infobar");
        reset.text("Stop timer for change");
        intervals.blink = setInterval(function () {
            if (reset.css('visibility') == 'hidden') {
                reset.css('visibility', 'visible');
            } else {
                reset.css('visibility', 'hidden');
            }
        }, 500);
        intervals.timeout = setTimeout(function(){
            clearInterval(intervals.blink);
            $("#infobar").text(statistic.tasks[statistic.tasks.length-1]);
        },3000)
    }
}
var sliders={
    default:function(name){
        var temp;
         switch(name){
             case "session":temp = 25;break;
             case "break":temp = 5;break;
             case "long_break":temp = 15;break;
             case "work_num":temp = 1;break;
        }
        return temp;
    },
    slidersSettings:function (name) {
        var set;
        switch(name){
            case "session": set={min:1,max:90};break;
            case "break": set={min:1,max:90};break;
            case "long_break": set={min:5,max:45};break;
            case "work_num": set={min:1,max:5};break;
        }
        set.value=pomodoro[name].len;
        set.step=1;
        set.name=name;
        return set;
    },
    appendSliders:function () {
        var self=this;
        $('input[type=range]').each(function() {
            var slider_name= $(this).data("name");
            self[slider_name] = $(this).slider(self.slidersSettings(slider_name));
            $(this).parent("div").siblings(".range_value").text(pomodoro[slider_name].len);
        })
        this.slidersEvents();
    },
    slidersEvents:function () {
        var self = this;
        $("input[type=range]").on("slide, change",function () {
            var name = $(this).data("name");
            pomodoro[name].len = sliders[name].slider('getValue');
            sliders[name].parent("div").siblings(".range_value").text(sliders[name].slider('getValue'));
            if(self.temp.indexOf(name)=="-1"){
                self.temp.push(name);
            }
        })
    },
    temp:[]
}
var modal={
    modalWindowsSlider:function () {
        $("#menu").find(".modal-title").on("click",".btn",function (e) {
            var val = $(this).data("slide");
            $("#menuCarousel").carousel(val);
            $("#headerCarousel").carousel(val);
        })
    },
    openStatisticBtn:function () {
        $("#statistic_btn").on("click",function () {
            $(".item").removeClass("active");
            $("#statistic").addClass("active");
            $("#statistic_header").addClass("active");
        })
    },
    openSettingsBtn:function () {
        $("#settings_btn").on("click",function () {
                $(".item").removeClass("active");
                $("#settings_header").addClass("active");
                $("#settings").addClass("active");

        })
    },
    closedModalEvent:function () {
        $('#menu').on('hidden.bs.modal', function (e) {
            for(var i=0;i<sliders.temp.length;i++){
                control.setLength(sliders.temp[i]);
            }
            sliders.temp=[];
            var set = {
                session:{
                    len: pomodoro.session.len
                },
                break:{
                    len:pomodoro.break.len
                },
                long_break:{
                    len:pomodoro.long_break.len
                },
                work_num:{
                    len:pomodoro.long_break.len
                },
                is_vibration:pomodoro.is_vibration,
                is_sound:pomodoro.is_vibration
            }
            localStorage.setItem("settings",JSON.stringify(set));
        })
    },
    appendControl:function () {
        this.modalWindowsSlider();
        this.openStatisticBtn();
        this.openSettingsBtn();
        this.closedModalEvent();
    },
    modalHeight:function () {
        /*console.log("wrap: "+$(".wrap").height());
        console.log("modal: "+$("#menu").find(".modal-header").height()+$("#menu").find(".modal-footer").height()+$("#menu").find(".modal-body").height());*/
        console.log($("#statistic").height());
    }
};
var settings={
    isEnable:false,
    checkSound:function () {
        $("#sound_set").on("change",function() {
            if($(this).is(":checked")){
                pomodoro.is_sound=true;
                if(pomodoro.is_run && !pomodoro.is_pause){
                    sounds.ticking();
                }
            }else{
                pomodoro.is_sound=false;
                sounds.stopSound()
            }
            /*localStorage.setItem("is_sound",pomodoro.is_sound);*/
        });
    },
    checkVibra:function () {
        $("#vibr_set").on("change",function() {
            pomodoro.is_vibration=($(this).is(":checked"))?true:false;
            /*localStorage.setItem("is_vibration",pomodoro.is_vibration);*/
        });
    },
    setDefault:function(){
        $("#default_settings").on("click",".btn",function () {
            for(var key in sliders){
                if(Object.prototype.toString.call(sliders[key])==="[object Object]"){
                    pomodoro[key].len = sliders.default(key);
                    control.setLength(key)
                }
            }
            $("input[type='checkbox']").each(function () {
                $(this)[0].checked = true;
            })
            pomodoro.is_sound=true;
            pomodoro.is_vibration=true;
        })
    },
    lockSettingControl:function (str) {
        for(var prop in sliders){
            if(Object.prototype.toString.call(sliders[prop])==="[object Object]"){
                sliders[prop].slider((str=="on")?"enable":"disable");
            }
        }
        var but = $("#default_settings").find(".btn");
        (str=="on")?but.removeClass("disabled"):but.addClass("disabled");
    },
    appendSettings:function () {
        this.checkSound();
        this.checkVibra();
        this.setDefault();
    },
    enableSettings:function () {

    }
}
var control={
    setLength:function (len_name) {
        var val = pomodoro[len_name].len,
            current_slider=$('*[data-name='+len_name+']');
        current_slider.parent("div").siblings(".range_value").text(val);
        current_slider.slider('setValue', val);
        if($("#"+len_name)){
            $("#"+len_name).find(".len").text(val);
        }
        if(len_name=="session"){
            $('#time').text((pomodoro.session.len>9)?pomodoro.session.len+":00":"0"+pomodoro.session.len+":00");
        }
/*        localStorage.setItem("settings",{len_name:val});*/
    },

    buttonsLen:function () {
        var self=this;
        $("#length_buttons").on("click",".btn",function () {
            var name_len = $(this).parent("div").attr("id");
            if(!pomodoro.is_run){
                var oper = $(this).data("oper");
                (oper=="+")?((pomodoro[name_len].len <90)?pomodoro[name_len].len++:false):(pomodoro[name_len].len >1)?pomodoro[name_len].len--:false;
                self.setLength(name_len);
            }else{
                view.errorMsg();
            }
        })
    },
    iconControl:function () {
        var self = this
        $("#icons_cntrl").on("click",".btn",function (e) {
            var title = $(this).data("title");
            if(title=="play"){
                self.switchRunPause();
            }else {
                self.resetPomodoro();
            }
        })
    },
    runPomodoro:function (time, percent) {
        pomodoro.is_run=true;
        var self=this,
            timer = time||pomodoro.session_timer()*60,
            per = percent || 0,
            minutes,seconds;
        settings.lockSettingControl("off");
        $("#infobar").text(statistic.tasks[statistic.tasks.length-1]);
        view.currentSessionText();
        intervals.clock_interval = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            $('.circle__wrapper').css({background: "linear-gradient(to top, " + view.fillColor() + " " + per + "%,transparent " + per + "%,transparent 100%)"});
            $(".circle__inner").css({borderColor:view.fillColor()});
            if (timer-- == 0) {
                sounds.alarm();
                if(pomodoro.current_session_name=="session"){
                    pomodoro.current_session_name="break";
                    $('#text_status').text("Break");
                }else{
                    pomodoro.current_session_name="session";
                    $('#text_status').text("Work");
                }
                clearInterval(intervals.clock_interval);
                delete intervals.clock_interval;
                self.runPomodoro();
            }
            pomodoro.pause_time = timer;
            pomodoro.fill_percent = per+=100/(pomodoro.session_timer()*60);
            $('#time').text(minutes + ":" + seconds);
        }, 1000);
        sounds.ticking();
    },
    pausePomodoro:function () {
        pomodoro.is_pause = true;
        clearInterval(intervals.clock_interval);
        $("#icons_cntrl").find(".fa").removeClass("fa-play").addClass("fa-pause");
        $('#text_status').text("Pause");
        if(pomodoro.is_sound){
            sounds.stopSound();
        }
    },
    resumePomodoro:function () {
        $("#icons_cntrl").find(".fa").removeClass("fa-pause").addClass("fa-play");
        pomodoro.is_pause=false;
        this.runPomodoro(pomodoro.pause_time, pomodoro.fill_percent);
    },
    resetPomodoro:function () {
        if(intervals.clock_interval){
            clearInterval(intervals.clock_interval);
            delete intervals.clock_interval;
            sounds.stopSound();
            statistic.stopTaskTime();
            settings.lockSettingControl("on");
            $('#text_status').text("Stop");
            $('#time').text("00:00");
            $('.circle__wrapper').css({background:"none"});
            $('.circle__inner').css({borderColor:"#a50003"});
            delete pomodoro.pause_time;
            delete pomodoro.fill_percent;
        }
        pomodoro.is_run = false;
        pomodoro.is_pause = false;
        statistic.pomodoros_left++;
    },
    eventByCircleClick:function () {
        var self=this;
        $(".circle__content").on("click",function(e){
            self.switchRunPause();
        });
    },
    switchRunPause:function(){
        if(pomodoro.is_run){
            if(pomodoro.is_pause){
                this.resumePomodoro();
            }else{
                this.pausePomodoro();
            }
        }else{
            statistic.modalEvent()
         /*   control.runPomodoro();*/
        }
    }
}
var sounds = {
    tunes:{
        tick:"audio/ticking.ogg",
        alarm:"audio/alarm.ogg"
    },
    ticking:function () {
        if(pomodoro.current_session_name == "session" && pomodoro.is_sound){
            this.snd = $("<audio>",{
                src:this.tunes.tick,
                loop:true,
                type:"audio/ogg"
            });
            this.snd[0].play();
        }
    },
    alarm:function () {
        this.stopSound();
        this.vibrationSessionEnd();
        this.snd = $("<audio>",{
            src:this.tunes.alarm,
            loop:false,
            type:"audio/ogg"
        });
        this.snd[0].play();
    },
    stopSound:function () {
        if(this.snd){
            this.snd[0].pause();
            this.snd[0].currentTime = 0;
            delete this.snd;
        }
    },
    vibrationSessionEnd:function () {
        if (window.navigator && window.navigator.vibrate && pomodoro.is_vibration) {
            navigator.vibrate([1000, 500, 1000, 500, 2000]);
        }
    }
}
function onLoad() {
    /*localStorage.clear()*/
    if(typeof Storage !== "undefined"){
        for(var prop in JSON.parse(localStorage.getItem("settings"))){
            pomodoro[prop]=JSON.parse(localStorage.getItem("settings"))[prop]
        }
    }
    view.setLength("break");
    view.setLength("session");
    $('#time').text((pomodoro.session.len>9)?pomodoro.session.len+":00":"0"+pomodoro.session.len+":00");
    sliders.appendSliders();
    settings.appendSettings();
    //
    control.buttonsLen();
    control.eventByCircleClick();
    control.iconControl();
    //
    modal.appendControl();
    //

}
$(function(){
    // DOM Ready - do your stuff
    onLoad();
});