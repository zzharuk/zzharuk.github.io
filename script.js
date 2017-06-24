
var view = {
    addProject:function (projectname, folder, imagelink, url, alt) {
        $("#projects").append(
            $("<div>").addClass("col-lg-4 col-md-4 col-sm-6 col-xs-12 project_holder").append(
                $("<div>").addClass("hovereffect").append(
                    $("<img>",{
                        class:"img-responsive",
                        src:imagelink,
                        alt:alt||""
                       }),
                    $("<div>").addClass("overlay").append(
                        $("<h2>").text(projectname),
                        $("<a>",{
                            class:"info",
                            href:url,
                            text:"Link me"
                        }),
                        $("<a>",{
                            class:"info",
                            href:"https://github.com/zzharuk/zzharuk.github.io/tree/master/"+folder,
                            text:"Code"
                        })
                    )
                )
            )
        );
    },
    addProjectsToHTML:function  (obj) {
        for (var prop in obj){
            this.addProject(
                obj[prop].name,
                obj[prop].folder_name,
                obj[prop].image_link,
                obj[prop].url,
                obj[prop].alt
            )
        }
    }
};
//mobile
function mobileDeviceStyle(){
    var $broser_device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
    if ($broser_device) {
        //navbar fixed on mobile
        $(".navbar").addClass("navbar-fixed-top");
        //social icons size
        $(".social").find(".fa").removeClass("fa-4x").addClass("fa-2x");
    }
}

$(document).ready(function(){
        $.get("./projects_list.json").done(function (list) {
            console.log(list);
            view.addProjectsToHTML(list);
        })
    mobileDeviceStyle();
});
