var User = require('../models/user');
var Items = require('../models/items');

exports.index = function(req, res) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          console.log(user)
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          data = {

            "username":user.username,
            "email":user.email
          }
          console.log(data);
          return res.render('catalog', data);
        }
      }
    });
    //res.send('NOT IMPLEMENTED: Site Home Page');
};

exports.men_shirt = function(req, res) {
  var gender = req.url.split('/')[1]
  var category = req.url.split('/')[2]
  console.log(gender,category);
  var query = Items.find().where('gender').equals(gender).where('category').equals(category);
  query.exec(function (err, items) {
    if (err) {
      return next(err);
    }
    else{

      data = {"items":items};
      return res.render('men_shirts', data);
    }
  })
};

exports.product = function(req, res) {
  var id = req.body.id;
  var query = Items.findById(id, function (err, items) {});

  query.exec(function (err, items) {
    if (err) {
      console.log(err)
      return next(err);
    }
    else{
      res.send(items._id);
    }
  })
};

exports.product_details = function(req, res) {
  var id = req.query.id;
  var query = Items.findById(id, function (err, adventure) {});

  query.exec(function (err, items) {
    if (err) {
      console.log(err)
      return next(err);
    }
    else{
      data = {"item":items}
      return res.render("product",data);
    }
  })
};

exports.additem = function(req, res) {
  var id = req.body.id;
  var condition = {_id:req.session.userId};
  console.log(req.session.userId);
  var data = { "product_id": id, "quantity":1 };
  User.update(condition,{$push:{incart:data}} , function (err, items){
    if (err) {
      console.log(err)
      return next(err);
    }
    else{
      console.log(items);
      res.send(items._id);
    }


  });


};
