var User = require('../models/user');
var Items = require('../models/items');

exports.index = function(req, res) {
  console.log(req.session.userId);
  User.findById(req.session.userId,function (err, items) {
    var incart = items["incart"];
    var total_cost = 0;
    var products = [];
    console.log(items["incart"].length);
    for (i=0; i < incart.length;i++){
      var order = incart[i];
      var quantity = order["quantity"];
      console.log(i,order);
      Items.findById(order["product_id"],function (err, product) {
        if (err){
          console.log(err);
        }
        else{
          total_cost = total_cost + (product["cost"] * quantity);
          products.push(product);
          data = {"products":products,"total":total_cost};
          console.log("aaaaaaa",i,products,total_cost);

          }
      });
    }
    console.log(data);
    return res.render('cart', data);
  });
};
