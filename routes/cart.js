var express = require('express');
var router = express.Router();

var cart_controller = require('../controllers/cart_controller');

// GET route after registering

router.get('/', cart_controller.index);

module.exports = router;
