/**
 * Created by zhalex
 */
$(document).ready(function() {
    (function () {
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
    })();
});