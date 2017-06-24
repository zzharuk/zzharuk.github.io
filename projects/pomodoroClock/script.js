/**
 * Pomodoro v2
 * Created by zzhalex on 14.10.2016.
 */
var settings = {
    default: {
        session: 25,
        break: 5,
        long_break: 15,
        work_num: 3,
        is_vibration: true,
        is_sound: true
    },
    current: {},
    setSettings: function (setts) {
        view.setLength(setts);
        view.appendSliders(setts);
        $("#sound_set")[0].checked = setts.is_sound;
        $("#vibr_set")[0].checked = setts.is_vibration;
    },
    slidersSettings: function (obj, name) {
        var set;
        switch (name) {
            case "session":
                set = {min: 1, max: 90};
                break;
            case "break":
                set = {min: 1, max: 90};
                break;
            case "long_break":
                set = {min: 5, max: 45};
                break;
            case "work_num":
                set = {min: 1, max: 10};
                break;
        }
        set.value = obj[name];
        set.step = 1;
        set.name = name;
        return set;
    }
}
var pomodoroEvents = {
    tempSlidersArr: [],
    lenButtons: function () {
        $("#length_buttons").on("click", ".btn", function () {
            var name_len = $(this).parent("div").attr("id");
            if (!pomodoro.is_run) {
                var oper = $(this).data("oper");
                (oper == "+") ? ((settings.current[name_len] < 90) ? settings.current[name_len]++ : false) : (settings.current[name_len] > 1) ? settings.current[name_len]-- : false;
                view.setLength(settings.current, name_len);
                view.setSliderLength(settings.current, name_len);
                localStorage.setItem("settings", JSON.stringify(settings.current));
            } else {
                view.errorMsg();
            }
        })
    },
    statisticBtn: function () {
        $("#statistic_btn").on("click", function () {
            $(".item").removeClass("active");
            $("#statistic").addClass("active");
            $("#statistic_header").addClass("active");
        })
    },
    settingsBtn: function () {
        $("#settings_btn").on("click", function () {
            $(".item").removeClass("active");
            $("#settings_header").addClass("active");
            $("#settings").addClass("active");
        })
    },
    slidersEvents: function () {
        var self = this;
        $("input[type=range]").on("slide, change", function () {
            var name = $(this).data("name"), current_slider = view.sliders[name];
            settings.current[name] = current_slider.slider('getValue');
            if (self.tempSlidersArr.indexOf(name) == "-1") {
                self.tempSlidersArr.push(name);
            }
        })
    },
    modalSliderBtn: function () {
        $("#menu").find(".modal-title").on("click", ".btn", function () {
            var val = $(this).data("slide");
            $("#menuCarousel").carousel(val);
            $("#headerCarousel").carousel(val);
        })
    },
    closedModalEvent: function () {
        var self = this;
        $('#menu').on('hidden.bs.modal', function () {
            for (var i = 0; i < self.tempSlidersArr.length; i++) {
                view.setLength(settings.current, self.tempSlidersArr[i])
            }
            self.tempSlidersArr = [];
            localStorage.setItem("settings", JSON.stringify(settings.current));
        })
    },
    funcBtns: function () {
        $("#icons_cntrl").on("click", ".btn", function () {
            var title = $(this).data("title");
            if(title == "play"){
                pomodoro.switchRunPause();
            }else{
                pomodoro.resetPomodoro();
            }
        })
    },
    eventByCircleClick: function () {
        $(".circle__content").on("click", function () {
            pomodoro.switchRunPause();
        });
    },
    soundBtnEvent: function () {
        $("#sound_set").on("change", function () {
            settings.current.is_sound = ($(this).is(":checked")) ? true : false;
            if(settings.current.is_sound && pomodoro.is_run && !pomodoro.is_pause && pomodoro.current_session_name == "session") {
                sounds.ticking();
            }else{
                sounds.stopSound();
            }

        });
    },
    checkVibra: function (el) {
        settings.current.is_vibration = (el.is(":checked")) ? true : false;
    },
    vibraBtnEvent: function () {
        var self = this;
        $("#vibr_set").on("change", function () {
            self.checkVibra($(this));
        });
    },
    setDefault: function () {
        $("#default_settings").on("click", ".btn", function () {
            if (!$(this).hasClass("disabled")) {
                settings.setSettings(settings.default);
                localStorage.setItem("settings", JSON.stringify(settings.default));
                for (var i in settings.default) {
                    if (view.sliders.hasOwnProperty(i)) {
                        view.sliders[i].slider('setValue', settings.default[i])
                        view.sliders[i].slider("refresh");
                    }
                    settings.current[i] = settings.default[i];
                }
            }
        })
    },
    clearTasksHistory: function () {
        $("#clear_history").on("click", function (e) {
            if(!pomodoro.is_run){
                $("tbody").find("tr").remove();
                statistic.tasks=[];
                $("#infobar").text("");
                localStorage.removeItem("history");
            }
        })
    },
    lockSettingControl: function (str) {
        for (var prop in view.sliders) {
            view.sliders[prop].slider((str == "on") ? "enable" : "disable");
        }
        var btn = $("#default_settings, #statistic").find(".btn");
        (str == "on") ? btn.removeClass("disabled").tooltip("destroy") : btn.addClass("disabled").tooltip({title:"Stop timer"});
    },
    sliderTooltip: function () {
        $('#work_tooltip').tooltip();
    },
    runTimerBtn:function () {
        var st = statistic
        $("#task_modal").on("click",".input-group-addon",function (e) {
            st.tasks.push(
                {name: ($("#task_name").val().length) ? $("#task_name").val() : "task " + (st.tasks.length + 1)}
            );
            $(this).off('hidden.bs.modal');
            $("#task_name").val("");
            st.saveTask();
            st.addTasksInfo(st.tasks[st.tasks.length - 1]);
            $('#task_modal').modal("hide");
            pomodoro.runPomodoro();
        })
    },
    applyEvents: function () {
        this.statisticBtn();
        this.settingsBtn();
        this.lenButtons();
        this.slidersEvents();
        this.closedModalEvent();
        this.funcBtns();
        this.modalSliderBtn();
        this.eventByCircleClick();
        this.vibraBtnEvent();
        this.soundBtnEvent();
        this.setDefault();
        this.sliderTooltip();
        this.clearTasksHistory();
        this.runTimerBtn();
    }
}
var view = {
    sliders: {},
    sessionTimerLength: function (obj) {
        var t = obj.session;
        $('#time').text(
            (t > 9) ? t + ":00" : "0" + t + ":00");
    },
    mainScreenLength: function (obj, name) {
        if (name) {
            $("#" + name).find(".len").text(obj[name]);
        } else {
            $("#break").find(".len").text(obj.break);
            $("#session").find(".len").text(obj.session);
        }
    },
    setSliderLength: function (obj, name) {
        var current_slider = $('*[data-name=' + name + ']');
        current_slider.slider('setValue', obj[name]);
    },
    appendSliders: function (obj) {
        var self = this;
        $('input[type=range]').each(function () {
            var slider_name = $(this).data("name");
            self.sliders[slider_name] = $(this).slider(settings.slidersSettings(obj, slider_name));
            $(this).parent("div").siblings(".range_value").text(settings.slidersSettings(obj, slider_name).max);
        })
    },
    sessionColor: function () {
        return (pomodoro.current_session_name == "session") ? "#12f111" : "#ff0000";
    },
    errorMsg: function () {
        if (pomodoro.intervals.blink) {
            clearInterval(pomodoro.intervals.blink);
        }
        var reset = $("#infobar");
        reset.text("Stop timer for change");
        pomodoro.intervals.blink = setInterval(function () {
            if (reset.css('visibility') == 'hidden') {
                reset.css('visibility', 'visible');
            } else {
                reset.css('visibility', 'hidden');
            }
        }, 500);
        pomodoro.intervals.timeout = setTimeout(function () {
            clearInterval(pomodoro.intervals.blink);
            $("#infobar").text(statistic.tasks[statistic.tasks.length - 1].name);
        }, 3000)
    },
    setLength: function (obj) {
        this.sessionTimerLength(obj);
        this.mainScreenLength(obj);
    },
    currentSessionText: function () {
        $('#text_status').text(
            (pomodoro.current_session_name == "session") ? "Work" : "Break"
        )
    },

    temp: []

}
var statistic = {
    is_task: false,
    tasks: [],
    modalEvent: function () {
        var self = this;
        $('#task_modal').modal({
            show: true,
            backdrop: 'static',
            keyboard: false
        }).on('shown.bs.modal', function () {
            $("#task_name").focus();
            $(this).off("shown.bs.modal");
        }).on('hidden.bs.modal', function () {

        });
    },
    saveTask: function () {
        var self = this, t_id = self.tasks.length, td = self.tasks[self.tasks.length - 1], t_name = self.tasks[self.tasks.length - 1].name
        td.id = t_id;
        td.session_date = self.dateTask();
        td.start = self.timeTask();
    },
    addTasksInfo: function (task) {
        $(".carousel-inner").find("tbody").append(
            $("<tr>").append(
                $("<td>").text(task.name),
                $("<td>").html(task.session_date),
                $("<td>", {
                    html: task.start
                }),
                $("<td>", {
                    id: "stop_" + task.id
                }).text((task.stop) ? task.stop : ""),
                $("<td>", {
                    id: "count_" + task.id,
                    class: "text-right"
                }).text((task.count) ? task.count : "")
            )
        );
    },
    dateTask: function () {
        var d = new Date(),
            m_arr = ["Jan.", "Feb.", "Mar.", "Apr.", "May.", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."],
            m_name = m_arr[d.getMonth()];
        return d.getDate() + " " + m_name;
    },
    timeTask: function () {
        var d = new Date();
        return d.getHours() + ":" + ((d.getMinutes() < 10) ? "0" + d.getMinutes() : d.getMinutes());
    },
    stopTaskTime: function () {
        var t_name = this.tasks.length;
        $("#stop_" + t_name).text(this.timeTask());
        statistic.tasks[statistic.tasks.length - 1].stop = this.timeTask();
    },
    pomodorosCount: function () {
        $("#count_" + statistic.tasks.length).append(
            (pomodoro.sessions_count >= 1) ? pomodoro.sessions_count : "--"
        )
        statistic.tasks[statistic.tasks.length - 1].count = (pomodoro.sessions_count >= 1) ? pomodoro.sessions_count : "--";
    }
};
var sounds = {
    tunes:{
        tick:"audio/ticking.mp3",
        alarm:"audio/alarm.mp3"
    },
    snd:{},
    ticking:function () {
        if(pomodoro.current_session_name == "session" && settings.current.is_sound){
            $(".clockSnd").prop({
                src:this.tunes.tick,
                loop:true,
                type:"audio/mpeg",
                volume:0.8
            }).trigger('play');
        }
    },
    alarm:function (t) {
            if (t == 6) {
                this.vibrationSessionEnd();
                $(".clockSnd").trigger('pause').prop({
                    src: this.tunes.alarm,
                    loop: false,
                    type: "audio/mpeg",
                    currentTime: 0
                }).trigger('play');
            } else if (t == 0) {
                $(".clockSnd").trigger('pause');
            }
    },
    stopSound:function () {
        $(".clockSnd").trigger('pause').prop({
            currentTime: 0,
            src: this.tunes[pomodoro.current_session_name=="session"?"tick":"alarm"]
        })
    },
    vibrationSessionEnd:function () {
        if (window.navigator && window.navigator.vibrate && settings.current.is_vibration) {
            navigator.vibrate([1000, 500, 1000, 500, 2000]);
        }
    }
}
var pomodoro = {
    is_run: false,
    current_session_name: "session",
    is_pause: false,
    intervals: {},
    sessions_count: 0,
    count: 0,
    time: function () {
        return settings.current[this.current_session_name];
    },
    sessionText: function () {
        var t;
        switch (this.current_session_name) {
            case "session":
                t = "Work";
                break;
            case "break":
                t = "Break";
                break;
            case "long_break":
                t = "Long break";
                break;
        }
        $('#text_status').text(t);
    },
    runPomodoro: function (time, percent) {
        var self = this,
            timer = time || self.time() * 60,
            per = percent || 0,
            minutes, seconds;
        self.is_run = true;
        pomodoroEvents.lockSettingControl("off");
        sounds.ticking();
        $("#infobar").text(statistic.tasks[statistic.tasks.length - 1].name);
        view.currentSessionText();
        self.intervals.clock_interval = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            $('.circle__wrapper').css({background: "linear-gradient(to top, " + view.sessionColor() + " " + per + "%,transparent " + per + "%,transparent 100%)"});
            $(".circle__inner").css({borderColor: view.sessionColor()});
            sounds.alarm(timer);
            if (timer-- == 0) {
                if (self.current_session_name == "session") {
                    self.sessions_count++;
                    self.count++;
                    if (self.count == settings.current.work_num && self.count > 0) {
                        self.current_session_name = "long_break";
                        self.count = 0;
                    } else {
                        self.current_session_name = "break";
                    }
                }
                else {
                    self.current_session_name = "session";
                }
                clearInterval(self.intervals.clock_interval);
                delete self.intervals.clock_interval;
                self.runPomodoro();
                $('#text_status').text(self.sessionText());

            }
            self.pause_time = timer;
            self.fill_percent = per += 100 / (self.time() * 60);
            $('#time').text(minutes + ":" + seconds);
        }, 1000);
    },
    switchRunPause: function () {
        if (this.is_run) {
            (this.is_pause)?this.resumePomodoro():this.pausePomodoro()
        } else {
            statistic.modalEvent()
        }
    },
    pausePomodoro: function () {
        this.is_pause = true;
        clearInterval(this.intervals.clock_interval);
        $("#icons_cntrl").find(".fa").removeClass("fa-play").addClass("fa-pause");
        $('#text_status').text("Pause");
        if (settings.current.is_sound) {
            sounds.stopSound();
        }
    },
    resumePomodoro: function () {
        $("#icons_cntrl").find(".fa").removeClass("fa-pause").addClass("fa-play");
        this.is_pause = false;
        this.runPomodoro(this.pause_time, this.fill_percent);
    },
    resetPomodoro: function () {
        if (this.intervals.clock_interval) {
            clearInterval(this.intervals.clock_interval);
            delete this.intervals.clock_interval;
            sounds.stopSound();
            pomodoroEvents.lockSettingControl("on");
            $('#text_status').text("Stop");
            $('#time').text("00:00");
            $('.circle__wrapper').css({background: "none"});
            $('.circle__inner').css({borderColor: "#a50003"});
            statistic.stopTaskTime();
            statistic.pomodorosCount();
            localStorage.setItem("history", JSON.stringify(statistic.tasks));
            this.sessions_count = 0;
            delete this.pause_time;
            delete this.fill_percent;
        }
        this.current_session_name = "session";
        view.sessionColor();
        this.is_run = false;
        this.is_pause = false;
    }
}
function onLoad() {
    if (typeof Storage !== "undefined") {
        if (localStorage.getItem("settings")) {
            settings.current = JSON.parse(localStorage.getItem("settings"));
        } else {
            settings.current = settings.default;
        }
        if (localStorage.getItem("history")) {
            statistic.tasks = JSON.parse(localStorage.getItem("history"));
            for (var j = 0; j < statistic.tasks.length; j++) {
                statistic.addTasksInfo(statistic.tasks[j]);
            }
        }
        settings.setSettings(settings.current);
    }
    pomodoroEvents.applyEvents();
}
$(function () {
    onLoad();
});