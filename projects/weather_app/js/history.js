/**
 * Created by zhalex on 03.11.2016.
 */
$(document).ready(function () {
    (function(){
        var temp=[];
        if(typeof Storage !== "undefined"){
            $(document).on("click",function () {
                if($(".city").length>temp.length){
                    temp = [];
                    $(".city").each(function () {
                        temp.push($(this).text());
                    })
                    localStorage.setItem("locations",JSON.stringify(temp));
                    console.log(JSON.parse(localStorage.getItem("locations")));
                }
            })
        }else{
         //hide button
        }
    })();
})