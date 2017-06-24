/**
 * Created by zhalex on 09.08.2016.
 */
var view = {
    makeThumbnails:function (id,img_url, title, photoid) {
        $("#slider-thumbs").find("ul").append(
            $("<li>",{class:"col-sm-4",}).append(
                $("<a>",{class:"thumbnail", id:"carousel-selector-"+id}).append(
                    $("<img>",{src:img_url})
                )
            )
        );
        $(".carousel-inner").append(
            $("<div>",{
                class:(id==0)?"item active":"item",
                "data-slide-number":id
            }).append(
                $("<img>",{src:img_url}),
                $("<a>").attr({href:"http://www.panoramio.com/photo/"+photoid,target:"_blank"}).text(title)
            )
        )
    }
};

function carouselController() {
    $('[id^=carousel-selector-]').click(function () {
        var id_selector = $(this).attr("id");
        try {
            var id = /-(\d+)$/.exec(id_selector)[1];
            console.log(id_selector, id);
            $('#myCarousel').carousel(parseInt(id));
        } catch (e) {
            console.log('Regex failed!', e);
        }
    });

}
function searchImg() {
    var input = $("#srch").parent().prev();
    $(input).on("keydown",function (e) {
        if(e.which == 13) {
            panomarioRequest($(this).val())
        }
    })
    $("#srch").on("click",function (e) {
        e.preventDefault();
        panomarioRequest(input.val())
    })
}
function panomarioRequest(tagname){
    $.ajax({
        url:"https://crossorigin.me/http://www.panoramio.com/wapi/data/get_photos?",
        dataType:"jsonp",
        jsonp:"callback",
        data:{
            tag:tagname,
        },
        beforeSend:function () {
            $("#loader").css("visibility","visible");
            $("#myCarousel").removeClass("carousal slide")
        },
        success:function (data) {
            console.log(data);
            $("#slider-thumbs").find("ul").html("");
            $(".carousel-inner").html("");
            $("#loader").css("visibility","hidden")
            $('#search_field').css({marginTop:"20px",marginBottom:"20px"})
            if(data.photos.length>0){
                $("#myCarousel").addClass("carousal slide")
                $("#msg").css("visibility","hidden");
                $("#main_area").show();
                for(var i =0; i < data.photos.length; i++){
                    view.makeThumbnails(
                                i,
                                data.photos[i].photoPixelsUrls[0].url,
                                data.photos[i].photoTitle,
                                data.photos[i].photoId
                    )
                }
                $("#myCarousel").carousel({interval:2000})
            }
            else {

                $("#msg").css("visibility", "visible");
                $("#main_area").hide();
            }
            carouselController();

        }
    });
}
$(document).ready(function () {
    searchImg();

})