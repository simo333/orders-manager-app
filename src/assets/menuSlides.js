// //Slideup and slidedown
// $(document).ready(function(){
//   $(".sh-head a").click(function(event){
//     event.preventDefault();
//     /* Variable */
//     var content = $(".sh-content");
//     if(content.hasClass("open")){
//       content.removeClass("open");
//       content.slideUp(300);
//     }
//     else{
//       content.slideDown(300);
//       content.addClass("open");
//     }
//   });
// });

$(function(){
  $(".btn-toggle-menu").click(function() {
    $("#wrapper").toggleClass("toggled");
  });
})

