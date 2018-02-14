$(document).ready(function() {
  $(".item-card").click(function(e){

    data = {"id":$(this).attr("value")}
    $.ajax({
      url: "/catalog/product",
      type: "post", // or "get"
      data: data,
      success: function(data) {

        window.location = "../product_details?id=" + data;


    }})
  });
});
