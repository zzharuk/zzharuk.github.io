var displayed_projects = 0;
function loadProjects(){
    var count = 6+displayed_projects;
    $.get('projects.json',function(data){
      //disabled button
    }).done(function(data){
      //enabled button

      for(var i = displayed_projects; i<count; i++){
        appendProject(data.result[i],displayed_projects);
        displayed_projects++;
      }

    })

}
function appendProject(project,count){
  var current_row_id = Math.floor(count/3);
  if($("#projects-section").find('#row_'+current_row_id).length==0){
    $("#projects-section").append(
      $('<div>',{
        class:"row",
        id:"row_"+current_row_id
      })
    )
  }
  $("#projects-section").find("#row_"+current_row_id).append(
    $("<div>").addClass("col 12 m4 l4").append(
      $("<div>").addClass("card").append(
        $("<div>").addClass("card-image").append(
          $("<img>",{
            class:"responsive-img",
            src:project["screenshot-path"]
          })
        ),
        $("<div>").addClass("card-title").text(project["title"]),
        $("<div>").addClass("card-content").html("<p>"+project["comment"]),
        $("<div>").addClass("chip").text("tags"),
        $("<div>").addClass("card-action").append(
          $("<a>",{
            href:"#",
            text:"Open in web"
          })
        )
      )
    )
  )

}

$( document ).ready(function(){
  //append project


  loadProjects();

  $('#portfolio').find('.btn').on('click',function(){
      loadProjects();
  });

	// navbar
	$(".button-collapse").sideNav();

    //modal

    $('.modal').modal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      inDuration: 300, // Transition in duration
      outDuration: 200, // Transition out duration
      // startingTop: '4%', // Starting top style attribute
      // endingTop: '10%', // Ending top style attribute
    }
  );

	//bar
    $("#bluecircle").percircle({
        progressBarColor:'#30bae7'
    });
    $("#redcircle").percircle({
        progressBarColor:'#d74680'
    });
    $("#greencircle").percircle({
        progressBarColor:'#15c7a8'
    });
    $("#orangecircle").percircle({
        progressBarColor:'#eb7d4b'
    });
    $('#textarea1').trigger('autoresize');

    //scrollSpy
    $('.scrollspy').scrollSpy({
      scrollOffset:'60'
    });

    //Sortable buttons
    $('#sort-projects').on("click","a",function(){
      if($(this).hasClass('sort-active')){
        return;
      }else{
        //buttons
        $('#sort-projects').find('.sort-active').addClass('lighten-2').removeClass('sort-active darken-3');
        $(this).removeClass('lighten-2').addClass('sort-active darken-3');

        //sort

      }
    })

    //Contact form

    $('')
});
