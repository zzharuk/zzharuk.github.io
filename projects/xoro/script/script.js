    var comb = [
        [1,2,3],[4,5,6],[7,8,9],
        [1,4,7],[2,5,8],[3,6,9],
        [1,5,9],[3,5,7]
    ], temp_comb = JSON.parse(JSON.stringify(comb)),winner_line, timerInterval,ai_step_timeout;
    var field = {
        cells:{1:{is_checked:false},
            2:{is_checked:false},
            3:{is_checked:false},
            4:{is_checked:false},
            5:{is_checked:false},
            6:{is_checked:false},
            7:{is_checked:false},
            8:{is_checked:false},
            9:{is_checked:false}},
        moves_count:0,
        game: function(){
            clearInterval(timerInterval);
            clearTimeout(ai_step_timeout);
            setting.timerSet();
            if(!endGame()){
                if(field.userMove){
                   field.userStep();
                }
                else if(!this.userMove&&field.moves_count<9){
                    ai_step_timeout=setTimeout(function(){field.aiStep()},600);
                }
            }else {
                endGame();}
        },
        userStep: function(){
            console.log(field.timer);
                if(field.timer) {
                    timerInterval = setInterval(function(){ $("#timer").text(field.timer);
                    if (field.timer-- == 0) {
                        statistic.comp_count++;
                        endGame("Time out! Computer win!");
                    }
                },1000);
            }
            $(".col-xs-4").on("click",function() {
                var id=$(this).attr("ID");
                if(!field.cells[id].is_checked){
                    if(field.timer){
                        field.timer=setting.timerSet();
                        $("#timer").text(field.timer);
                    }
                    field.moves_count++;
                    field.cells[id].is_checked = true;
                    fillCells(field.user_mark);
                    $(this).text(field.user_mark);
                    $(".col-xs-4").off("click");
                    clearInterval(timerInterval);
                    field.userMove = false;
                    field.game();
                }
            });
        },
        aiStep:function(){
            var empty_coner_cells=[],current_move_pos,priority={};
            if(!field.cells["5"].is_checked){
                $("#5").text(field.ai_mark);
                field.cells["5"].is_checked = true;
            }
            else {
               for (var prop in field.cells){
                    if(prop%2!=0 && !field.cells[prop].is_checked){
                        empty_coner_cells.push(prop);
                    }
                }
                if(empty_coner_cells.length>1){
                    priority.conner = empty_coner_cells[Math.floor(Math.random() * (empty_coner_cells.length))];
                }
                comb.forEach(function (item) {
                    var user_count = 0, ai_count = 0;
                    item.forEach(function (i) {
                        if (i == field.ai_mark) {
                            ai_count++;
                            if (ai_count == 2) {
                                item.some(function (num) {
                                    if (typeof num == "number") {
                                        priority.win = num;
                                    }
                                });
                            }
                        }
                        else if (i == field.user_mark) {
                            user_count++;
                            if (user_count == 2) {
                                item.some(function (n) {
                                    if (typeof n == "number")
                                        return priority.block = n;
                                });
                            }
                        }
                    });
                });
                if(priority.hasOwnProperty("win")){
                    current_move_pos = priority.win;
                }
                else if (priority.hasOwnProperty("block")) {
                    current_move_pos = priority.block;
                }
                else if(priority.hasOwnProperty("conner")&&!priority.hasOwnProperty("win")&&!priority.hasOwnProperty("block")){
                    current_move_pos = priority.conner;
                }
                else if(current_move_pos==undefined){
                    var temp=[];
                    for(var cell in field.cells){
                        if (!field.cells[cell].is_checked){
                            temp.push(cell)
                        }
                    }
                    current_move_pos = temp[Math.floor(Math.random()*temp.length)];
                }
                field.cells[current_move_pos].is_checked=true;
                $("#"+current_move_pos).text(field.ai_mark);
            }
            field.moves_count++;
            fillCells(this.ai_mark);
            this.userMove = true;
            field.game();
        },
        reset:function(){
            winner_line = false;
            $(".col-xs-4").text("").removeClass("winner");
            this.moves_count=0;
            delete this.timer;
            for(var cell in this.cells){
                this.cells[cell].is_checked=false;
            }
            comb = JSON.parse(JSON.stringify(temp_comb));
        }
    };
function modalWindow(winner){
    var $modal = $('#myModal');
    $modal.modal({
        backdrop: 'static',
        keyboard: true
    }).modal('show').on("shown.bs.modal",function(){
        statistic.showStatistic();
        $("#timer").text("");
    });
    clearInterval(timerInterval);
    setting.setFirstMove();
    $('.btn').on("click", function(){
        field.user_mark = $(this).text();
        field.ai_mark = (field.user_mark=="X")?"O":"X";
        $modal.modal("hide");
        field.userMove = ($("#setting div:nth-child(2)").children("span").text()=="Player")?true:false;

        field.game();
    });

    if(winner!=undefined){
        $("#game_end_text").text(
            (winner.split(" ").length == 1)?winner+" win!":winner
        )
        statistic.total++;
        $("#statistic").show();
        statistic.showStatistic();
        setting.setFirstMove();

    }
    setting.timerSet();
}
function fillCells (attr) {
    for(var prop in field.cells){
        if(field.cells[prop].is_checked){
            for(var j=0;j<comb.length;j++){
                for (var i = 0;i<comb[j].length;i++){
                    if(comb[j][i]==prop){
                        comb[j][i]=attr
                    }
                }
                if(comb[j].every(function(elem){
                        return elem == attr;
                    })){
                    winner_line = temp_comb[j];
                }
            }
        }
    }
}
function endGame(win){
        var winner = false;
    $(".col-xs-4").off("click");
        if(win){
           field.reset();
           setTimeout(modalWindow(win),1000);
        }
        else{
            if(winner_line){
                for(var j = 0; j<winner_line.length;j++){
                    $(".col-xs-4").each(function(){
                        if(this.id == winner_line[j]){
                            $(this).addClass("winner");
                            winner = ($(this).text()==field.ai_mark)?"Computer": "Player";
                        }
                    })
                }
                if(winner=="Computer"){
                    statistic.comp_count++;
                }else if(winner=="Player"){
                    statistic.player_count++;
                }
                setTimeout(function() {
                    modalWindow(winner);
                    field.reset();
                }, 1000);
            }
            else if(field.moves_count == 9&&!winner){
                setTimeout(function() {
                    modalWindow("It's a draw!");
                    field.reset();
                }, 1000);
            }else{
                return false
            }
    }
 }
var statistic={
    player_count : 0,
    comp_count : 0,
    total:0,
    showStatistic: function(){
        $("#pl_win").find("span").text(this.player_count);
        $("#ui_win").find("span").text(this.comp_count);
        $("#total").find("span").text(this.total)
    }
};
var setting = {
    setFirstMove:function(){
        $("#move_setup").on("click",function(){
            $(this).children("span").text($(this).children("span").text() == "Computer" ? "Player" : "Computer");
        })
    },
    timerSet:function(){
        var arr=["off","5 sec","3 sec"], indx=0;
        var $timer = $("#timer_setup")
        $timer.click(function(){
            (indx+1 == 3)?indx=0:indx++;
            $(this).children("span").text(arr[indx]);
        });
        if(!isNaN(parseInt($timer.children("span").text()))){
           return field.timer = parseInt($timer.children("span").text());
        }else {
            return field.timer = false;
        }
    }
};
function addField() {
    for(var i=0;i<9;i++){
        $("<div>",{
            id:i+1,
            class:"col-xs-4"
        }).insertBefore($("#timer"));
    }
}
$(document).ready(function(){
    addField();
    modalWindow();
    $("<div>",{ class:"text-right",text:"created by zzharuk"}).css({margin:"10px",fontSize:"10px",fontFamily:"'Times New Roman', Times, serif"}).appendTo($(".row"));
});