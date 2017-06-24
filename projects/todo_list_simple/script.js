/**
 * Created by zhalex on 08.11.2016.
 */
function Task(id, name, priority, desc, due_date, priority_name) {
    this.id = id;
    this.begin = getCurrentEventDate();
    this.name = name;
    this.priority = priority;
    this.priority_name = priority_name;
    this.old_priority = this.priority;
    this.due_date = due_date;
    this.description = desc;
}
function linkify(text) {
    var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return text.replace(urlRegex, function(url) {
        return '<a href="' + url + '" target="_blank">' + url + '</a>';
    });
}
function getCurrentEventDate() {
    var d = new Date();
    return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + "\n at " + d.getHours() + ":" + ((d.getMinutes() < 10) ? "0" + d.getMinutes() : d.getMinutes());
}
var tasksData = {};
function checkLocalStorageHistoryTasks() {
    if ($.isEmptyObject(JSON.parse(localStorage.getItem("todo_list_tasks")))) {
        $(".add-task").slideToggle(500, function () {
            $("#nt_input").focus();
            $("#nt_button").addClass("disabled");
        });
    } else {
        tasksData = JSON.parse(localStorage.getItem("todo_list_tasks"));
        for (var task in tasksData) {
            addNewItem(tasksData[task]);
        }
    }
}
function appendDescription(desc_name, val, classname) {
    return (val !== undefined && val.length) ? (
        $("<div>").addClass("row").append(
            $("<div>").html("<strong>" + desc_name + ": </strong>").addClass("col-xs-3").addClass((classname) ? classname : false),
            $("<div>").html(val).addClass("col-xs-9").addClass((classname) ? classname : false)
        )).addClass(
        (desc_name == "finished") ? "finished" : false, "bold-text"
    ) : false
}
function addNewItem(item) {
    $("#sortable").append(
        $("<li>", {
            id: item.id,
            "data-priority": item.priority,
            class: "list-group-item task-item " + ((item.priority == null) ? "done" : "list-group-item-" + item.priority + " inprogress")
        }).append(
            $("<div>").addClass("header").append(
                $("<div>").addClass("h4 task-text").text(item.name)
            ),

            $("<div>").addClass("description").append(
                $("<hr>"),
                $("<div>",{class:"desc_wrapper"}).append(
                    appendDescription("priority", item.priority_name),
                    appendDescription("begin", item.begin),
                    appendDescription("description", linkify(item.description), "desc_text"),
                    appendDescription("due date", item.due_date),
                    appendDescription("finished", item.finished)
                ),
                $("<hr>"),
                $("<div>").addClass("btn-group pull-right").append(
                    $("<button>").addClass("btn btn-success done-button").append(
                        $("<i>").addClass("fa fa-check")
                    ),
                    $("<button data-toggle='modal' data-target='#myModal'>").addClass("btn btn-danger delete-button").append(
                        $("<i>").addClass("fa fa-trash-o")
                    )
                ),
                $("<div>").addClass("clearfix")
            ).hide()

        )
    ).find("li").last().slideDown(500, function () {
        $(this).hasClass("done")?$(this).find("div").addClass("text-muted"):false;
    });
}

function removeItem(item) {
    item.slideUp(500, function () {
        var id = item.attr("id");
        delete tasksData[id];
        item.remove();
    });
}


$(function () {
    //datepicker settings
    $('.date').datepicker({
        format: "dd/mm/yyyy",
        todayHighlight: true,
        clearBtn: true
    });
    checkLocalStorageHistoryTasks();
    $("#addTask").on("click", function () {
        $(".add-task").slideToggle(500, function () {
            $("#nt_input").focus();
        });
    });
    //events
    $(".list-group").on("click", ".done-button", function () {
        var $item = $(this).parent("div").parent(".description").parent(".task-item"),
            $id = $item.attr("id"),
            current_date = getCurrentEventDate();
        $item.toggleClass("done");
        if ($item.hasClass("done")) {
            $item.removeClass("list-group-item-" + tasksData[$id].priority);
            tasksData[$id].old_priority = tasksData[$id].priority;
            tasksData[$id].priority = null;
            tasksData[$id].finished = current_date;
            appendDescription("finished", current_date, "finished").insertAfter($item.find(".description").find(".row").last());
            $item.find("div").addClass("text-muted");
        } else {
            tasksData[$id].priority = tasksData[$id].old_priority;
            delete tasksData[$id].finished;
            $item.addClass("list-group-item-" + tasksData[$id].priority);
            $item.find(".finished").remove();
            $item.find("div").removeClass("text-muted");
        }
    }).on("click", ".delete-button", function () {
        var $item = $(this).parent("div").parent(".description").parent(".task-item");
        $('#confirmModal').on("show.bs.modal", function () {
            var $modal = $(this);
            $(this).find(".modal-body").text("Task will removed! \n Are you sure?")
            $(".btn-ok").on("click", function () {
                removeItem($item);
                $modal.modal("hide");
            })
        }).modal({
            show: true,
            backdrop: 'static',
            keyboard: false
        });
    }).on("click",".header",  function (e) {
        var $item = $(this).parent();
        //hide "description"
        if (!$item.hasClass("active-task-item")) {
            $(".active-task-item").removeClass("active-task-item").find(".description").slideUp(500);
            $item.addClass("active-task-item").find(".description").slideDown(500);
        } else {
            $item.find(".description").slideToggle(500);
        }
    })
    function appendTaskToList() {
        var $input = $("#nt_input"),
            $task_name = $input.val(),
            $pr = $("#priority").find("option:selected"),
            $priority = $pr.val(),
            $priority_name = $pr.text(),
            $due_date = $("#due_date").val(),
            $desc = $("#details").val();
        if ($task_name.length) {
            var d = new Date(), $id = d.getTime();
            tasksData[$id] = new Task($id, $task_name, $priority, $desc, $due_date, $priority_name);
            addNewItem(tasksData[$id]);
            $(".add-task").slideUp(500);
            $input.val("");
        }
    }

    $("#nt_button").on("click", function (e) {
        e.preventDefault();
        appendTaskToList();
    });
    $("#nt_input").on("keypress", function (e) {
        if (e.keyCode == 13 && $(this).val().length) {
            e.preventDefault();
            appendTaskToList();
        }
    }).on("input", function () {
        if ($(this).val().length) {
            $("#nt_button").removeClass("disabled");
        } else {
            $("#nt_button").addClass("disabled");
        }
    })
    $(".sort").find("ul").on("click", "li", function () {
        $(this).parent("ul").find(".active-sort").removeClass("active-sort text-primary");
        $(this).addClass("active-sort text-primary");
        var $sort_class = "." + $(this).parent("ul").find(".active-sort").data("class");
        $(".task-item").slideUp(300);
        $($sort_class).slideDown(300);
    })
    window.onbeforeunload = function () {
        saveFormData();
        return null;
    }

    function saveFormData() {
        localStorage.setItem("todo_list_tasks", JSON.stringify(tasksData));
    }
})