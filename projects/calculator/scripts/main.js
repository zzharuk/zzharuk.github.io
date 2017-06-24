var operation_result="0";
var ans ="0";
var operation_buttons={
    ac:new Button("AC",27,1,"funcbtn"),
    ce:new Button("CE",46,1,"opbtn"),
    ans:new Button("ANS",false,1,"opbtn"),
    percent:new Button("%",53,1,"funcbtn"),
    round:new Button("Round",false,2,"opbtn"),
    pos_neg:new Button("-/+",false,2,"funcbtn"),
    sqr:new Button("√",false,2,"funcbtn"),
    divide:new Button("/",111,2,"funcbtn"),
    num_7:new Button("7",103,3,"digbtn"),
    num_8:new Button("8",104,3,"digbtn"),
    num_9:new Button("9",105,3,"digbtn"),
    multiply:new Button("*",106,3,"funcbtn"),
    num_4:new Button("4",100,4,"digbtn"),
    num_5:new Button("5",101,4,"digbtn"),
    num_6:new Button("6",102,4,"digbtn"),
    subtract:new Button("-",109,4,"funcbtn"),
    num_1:new Button("1",97,5,"digbtn"),
    num_2:new Button("2",98,5,"digbtn"),
    num_3:new Button("3",99,5,"digbtn"),
    add:new Button("+",107,5,"funcbtn"),
    fixed:new Button("Fixed",false,6,"opbtn"),
    num_0:new Button("0",96,6,"digbtn"),
    dot:new Button(".",110,6,"funcbtn"),
    equal:new Button("=",13,6,"funcbtn")
};
function InputValue(arg){
    if (arg) {
        if (arg.length <= 12) {
            $("#input").val(arg).css({"font-size": "36px"});
        }
        else if (arg.length > 12 && arg.length < 19) {
            ans = operation_result = arg.toString();
            $("#input").val(operation_result).css({"font-size": "24px"});
        }
    } else {
        return $("#input").val();
    }
}
function Button (text,key_code,row_number,classname){
        this.text=text;
        this.class=(classname)?"btn col-xs-3 col-md-3 text-center btnclass btn-default "+classname:"btn col-xs-3 col-md-3 text-center btnclass btn-default ";
        this.key_code = key_code;
        this.row_number = row_number;
    }
function AC_Button() {
    InputValue("0");
    operation_result = "0";
}
function CE_Button(){
    if (InputValue().length > 1) {
        operation_result = InputValue().slice(0, -1);
        InputValue(operation_result);
    }
    else {
        operation_result = 0;
        InputValue("0");
    }
}
function ANS_Button(){
    if(InputValue()!=="0" && InputValue()[InputValue().length-1].match(/[\(\)\+\-\*\/]/)){
        operation_result+=ans;
        InputValue(InputValue()+ans);
    }else{
        operation_result = ans;
        InputValue(ans);
    }
}
function Percent_Button(){
    var arg = operation_result;
    if(typeof arg =="number"){
        arg=arg.toString();
        console.log(arg);
    }
    arg=arg.split(/[\(\)\+\-\*\/\.]/);
    arg = (typeof arg[0]!="undefined"&&typeof arg[1]!="undefined"&&arg[1]!="") ? (arg[0]*arg[1]/100) : (arg[0]*arg[0]/100);
    arg = arg.toString();
    InputValue(arg);
    ans = arg;
}
function Dot_Button(){
    var dot_add = false,
        input_value_splitting = InputValue().split(/[\(\)\+\-\*\/]/);
    if(InputValue()=="0"){
        dot_add = true;
    }
    else if(input_value_splitting[input_value_splitting.length-1].indexOf(".")==-1 && input_value_splitting[input_value_splitting.length-1]!==""){
        dot_add = true;
    }
    if(dot_add) {
        operation_result += ".";
        InputValue(operation_result);
    }
}
function Equal_Button() {
    var last_char = operation_result[operation_result.length - 1];
    if (last_char.match(/[0-9]/g)) {

        ans = eval(operation_result).toString();
        operation_result = ans;
        InputValue(operation_result);
    } else if (last_char.match(/[\(\)\+\-\*\/]/)) {
        var result = eval(operation_result.slice(0, -1));//number
        result += last_char + result;
        operation_result = eval(result).toString();
        console.log(result);
        InputValue(operation_result);
    }
}
function PosNeg_Button(){
    if(InputValue()[0]!=="-"&&InputValue()!="0"){
        operation_result="-"+InputValue();
        InputValue(operation_result);
    }else {
        operation_result=InputValue().slice(1)+"";
        InputValue(operation_result);
    }
}
function Round_Button(){
    console .log(typeof operation_result);
    operation_result = Math.round(Number(operation_result)).toString();
    ans=operation_result;
    console .log(typeof operation_result);
    InputValue(operation_result);
}
function Fixed_Button(){
    operation_result=parseFloat(operation_result).toFixed(2);
    ans=operation_result;
    InputValue(operation_result);
}
function Sqr_Button(){
    ans = (Math.sqrt(Number(operation_result))).toString();
    InputValue(ans);
}

    function CheckAndCalculate(){
        var val_but = $(this).attr("value")||event.keyCode || event.which;
        var last_char=operation_result[operation_result.length-1];
        function Checking(){
            if(InputValue()=="0"&&val_but.match(/[1-9]/g)){
                operation_result=val_but;
                InputValue(operation_result);
            }
            else if(InputValue()!="0"&&val_but.match(/[0-9]/g)||(val_but=="*"||val_but=="/"||val_but=="+"||val_but=="-")&&(last_char.match(/[0-9]/g))){
                operation_result+=val_but;
                InputValue(operation_result);
            }
            else{
                switch (val_but) {
                    case "=":Equal_Button();break;
                    case "AC":AC_Button();break;
                    case "ANS":ANS_Button();break;
                    case "CE":CE_Button();break;
                    case ".":Dot_Button();break;
                    case "%":Percent_Button();break;
                    case "Round":Round_Button();break;
                    case "Fixed":Fixed_Button();break;
                    case "-/+":PosNeg_Button();break;
                    case "√":Sqr_Button();break;
                }
            }

        }
        if(typeof val_but == "string"){
            Checking();
        }
        else if (typeof val_but == "number"){
            for(var prop in operation_buttons){
                if(operation_buttons.hasOwnProperty(prop)&&operation_buttons[prop].key_code==val_but){
                    val_but=operation_buttons[prop].text;
                }
            }
            Checking();
        }
    }

$(document).ready(function(){
    for(var key in operation_buttons){
        if (operation_buttons.hasOwnProperty(key)){
            $("<div>",{
                type: "button",
                class: operation_buttons[key].class,
                value: operation_buttons[key].text,
                text: operation_buttons[key].text
            }).appendTo("#buttons_row_"+operation_buttons[key].row_number);
        }
    }

    $(".btn").on("click", CheckAndCalculate);
    $(document).on("keyup",CheckAndCalculate);
});