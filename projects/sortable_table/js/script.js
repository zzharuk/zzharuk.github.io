/**
 * Created by zhalex on 12.08.2016.
 */
var tableData={};
var categories=[];
var is_checked_default = ["_id","company","balance"]
var controller={
    addItemToHead:function () {
        var checkbox = $('.checkbox').find("input")
        //by choose checkbox
        checkbox.change(function() {
            var value = $(this);
            if($(this).is(":checked")) {
                $(this).attr("checked");
                $("thead").find("tr").append(
                    $("<th>",{id:$(this).val(),text:$(this).val()})
                )
                $.each(tableData, function (indx, item) {
                    appendDataToTable(value.val(),tableData[indx][value.val()],indx)
                })
            }else{
                $("#"+$(this).val()).remove()
                $("."+$(this).val()).remove();
            }

        });

    },
    sortingData:function(selector, method) {
        var this_elem = selector;
        var class_name = selector.attr("id");
        var sort_data = [];
        $("."+class_name).each(function (indx,item) {
            sort_data[indx]=[];
            sort_data[indx].push($(this).text())
            sort_data[indx].push($(this).parent("tr").attr("id"))
        })
        sort_data = (method=="sort")?sort_data.sort():sort_data.reverse();
        for(var i=0;i<sort_data.length;i++){
            $("#"+sort_data[i][1]).appendTo("tbody");
        }
    },
    thSort:function () {
        $("#tbl").on({
            mouseenter: function () {
                $(this).addClass("th_hover");
                $(this).on("click",function (e) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                    if($(this).hasClass("sort_az")){
                        $(this).removeClass("sort_az").addClass("sort_za");
                        controller.sortingData($(this),"reverse");
                    }else{
                        $(".sort_az, .sort_za").removeClass("sort_az sort_za");
                        $(this).addClass("sort_az");
                        controller.sortingData($(this),"sort");
                    }
                })
            },
            mouseleave: function (e) {
                $(this).removeClass("th_hover");
            }
        },"th")
    }
}

function appendDefaultDataByLoading() {
    var td_data,class_name,counter;
    if(is_checked_default.length>0){
        for (var i=0;i<is_checked_default.length;i++){
            for(var p in tableData){
                class_name = is_checked_default[i];
                td_data = tableData[p][is_checked_default[i]];
                counter = p;
                appendDataToTable(class_name,td_data, counter)
            }
        }
    }
}



function loadData(){
    $(".btn").on("click",function () {
        var btn = $(this);
        $.ajax("./data.json", {
            success: function (data) {
                tableData = data;
                view.appendList(tableData);
                appendDefaultDataByLoading()
                controller.addItemToHead();
                btn.hide(500)
                //

            }
        })
    })

}
var view = {
    appendList:function (tbldata) {
        var arr=[]
        $.each(tbldata, function (i, item) {
            $.each(item, function (indx, prop) {
                if(typeof prop === "object"){
                    /*if($.inArray(indx, arr) === -1) {
                     arr.push({[indx]: prop});
                     selectableSpoilerList({[indx]: prop});
                     }*/
                }else{
                    if($.inArray(indx, arr) === -1) {
                        arr.push(indx);
                        selectableList(indx);
                    }

                }

            })
        })
        console.log(arr);
    },
    table:{
        drawTable: function (tbldata) {

        }
    }
}

/////////////////
function selectableList(opt){
    var checked;
    for(var i=0;i<is_checked_default.length;i++){
        if(is_checked_default[i]==opt)
            checked={checked:"checked" }
    }
    $("#fields_names").append(
        $("<div>").addClass("checkbox").append(
            $("<label>").append(
                $("<input>",{type:"checkbox", value:opt, checked}),
                $("<span>").text(opt)
            )
        )
    )
    $("#collapse1").addClass("in")
}
function selectableSpoilerList(category) {
    console.log(category)

}

function appendDataToTable (class_name,td_data, counter){
    if(!$("#"+class_name).length){
        $("thead").find("tr").append(
            $("<th>").attr("id",class_name).text(class_name)
        )
    }
    if($("#row_id_"+counter).length){
        $("#row_id_"+counter).append(
            $("<td>").text(td_data).addClass(class_name)
        )
    }else {
        $("tbody").append(
            $("<tr>").attr("id","row_id_"+counter).append($("<td>").text(td_data).addClass(class_name))
        )
    }
}
function removeDataFromTable(class_name) {
    $("."+class_name).hide();
}
$(function () {
    loadData();
    controller.thSort();
})