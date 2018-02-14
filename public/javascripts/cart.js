$(document).ready(function() {
  $("#addcart").click(function(e){

    data = {"id":$(this).attr("value")}
    $.ajax({
      url: "/catalog/additem",
      type: "post", // or "get"
      data: data,
      success: function(data) {

        console.log(data)


    }})
  });
});
