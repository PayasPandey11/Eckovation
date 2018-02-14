var express = require('express');
var router = express.Router();
var User = require('../models/user');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Eckocavation' });
});


//POST route for updating data
router.post('/', function (req, res, next) {
  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    err["text"]  = 'All fields required.';
    err["status"] = true;
    return res.render('index',err );

  }

  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {

    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
    }

    User.create(userData, function (error, user) {
      if (error) {
        console.log(error)
        return next(error);
      } else {

        req.session.userId = user._id;
        return res.redirect('/catalog/men/shirts');
      }
    });

  } else if (req.body.logemail && req.body.logpassword) {
    console.log(req.body.logemail,req.body.logpassword);
    User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {

      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        console.log(err);
        err["text"]  = 'Wrong email or password.';
        err["status"] = true;
        return res.render('index',err );
      } else {
        req.session.userId = user._id;

        return res.redirect('/catalog/men/shirts');
      }
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    err["text"]  = 'All fields required.';
    err["status"] = true;
    return res.render('index',err );
  }
})



// GET for logout logout
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

module.exports = router;
