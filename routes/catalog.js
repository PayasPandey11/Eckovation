var express = require('express');
var router = express.Router();

var catalog_controller = require('../controllers/catalog_controller');

// GET route after registering

router.get('/', catalog_controller.index);
router.get('/product_details', catalog_controller.product_details);
router.get('/men/shirts', catalog_controller.men_shirt);
router.get('/women/shirts', catalog_controller.men_shirt);
router.get('/men/jeans', catalog_controller.men_shirt);
router.get('/women/jeans', catalog_controller.men_shirt);

router.post('/product', catalog_controller.product);
router.post('/additem', catalog_controller.additem);

module.exports = router;
