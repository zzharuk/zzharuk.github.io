
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    var $location = $("#street").val()+" "+$("#city").val();
    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");
    var request ="http://maps.googleapis.com/maps/api/streetview?size=600x300&location="+$location;
    $.ajax({
        url:request,
        success:function () {
            console.log("success");
            $body.append(
                $("<img>",{
                    src:request,
                    class:"bgimg"
                })
            )
        }
    });
    // YOUR CODE GOES HERE!
    var ny_times_data = {
        q:$location,
        "api-key":"d48ed728b4b5483d80ab86c350f6e43e"
    };

    $.getJSON("https://api.nytimes.com/svc/search/v2/articlesearch.json",ny_times_data,function (articles) {
        console.log(articles);
        var response = articles.response.docs;
        for(var i=0;i <response.length;i++){
            $nytElem.append(
                $("<li>").append(
                    $("<a>",{
                        href:response[i].web_url,
                        text:response[i].headline.main
                    }),
                    $("<p>").text(response[i].snippet)
                ).addClass("article")
            )
        }
    }).error(function() {
        $nytHeaderElem.text("Couldn't load NY Times articles");
    });

    $.ajax({
        url:"https://en.wikipedia.org/w/api.php?",
        dataType:"jsonp",
        jsonp:"callback",
        data:{
            action:"opensearch",
            search:$location,
            format:"json"
        },
        success:function (json) {
            console.log(json);
            for (var i=0; i<json[1].length;i++){
                $("#wikipedia-links").append(
                    $("<li>").append(
                        $("<a>",{
                            href:json[3][i],
                            text:json[1][i]
                        })
                    )
                )
            }

        }
    });
    return false;
};

$('#form-container').submit(loadData);
