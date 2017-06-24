$.ajaxSetup({
    url: "https://en.wikipedia.org/w/api.php?",
    type: "GET",
    dataType: "jsonp",
    jsonp: 'callback'
});

function getRandom() {
    $.ajax({
        data:{
            format:"json",
            action:"query",
            generator:"random",
            grnnamespace:0,
            prop:"extracts|pageimages",
            pithumbsize:500,
            exchars:1000
        },
        success: function (data) {
            $.each(data.query.pages, function () {
                $("<h1>",{
                    id: "mainTitle",
                    text: this.title
                }).appendTo("#main");
                $("<div>",{
                    id: "messageText",
                    class: "well selected"
                }).appendTo("#main").html(this.extract);
                $("<a>",{
                    text: "read more on wiki",
                    href: "https://en.wikipedia.org/wiki/index.html?curid="+this.pageid,
                    alt: this.title
                }).appendTo("#messageText");
                $("<div>",{id: "img"}).appendTo("#main");
                if(this.thumbnail){
                    $("#messageText").removeClass("col-md-12").addClass("col-md-6");
                    $("#img").addClass("col-md-6").html("");
                    $("<img>",{
                        src: this.thumbnail.source,
                        style: "width:350px"
                    }).appendTo("#img").addClass("img-responsive");
                }
                else{
                    $("#messageText").toggleClass("col-md-6", false).addClass("col-md-12");
                    $("#img").toggleClass("col-md-6", false).html("");
                }
            });
        }
    });
}
function WikiSearch () {
    $("#main").html("").removeClass();
    $("#messageText").removeClass();
    $.ajax({
        data:{
            action:"opensearch",
            limit:10,
            search:$("#search-box").val()
        },
        success: function(data){
            for(var i = 0; i<data[1].length-1; i++){
                $("<a>",{
                    id: "wikiSearchDiv"+i,
                    href:data[3][i],
                    target:"_blank",
                    style: "text-decoration: none; color: #000"
                }).appendTo("#main");
                $("<div>").appendTo("#wikiSearchDiv"+i).html("<h3>"+data[1][i]+"</h3>"+"<p>"+data[2][i]+"</p>").addClass("well selected");
            }
        }
    });
}

$(document).ready(function(){
    $('#random-btn').on("click", function() {
        $("#main").html("");
        getRandom();
    });
    $("#search-btn").on("click keyup",WikiSearch);
});
