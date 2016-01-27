var express = require('express');
var router = express.Router();
var apikeys = require('../lib/apis/apikeys');
var SearchController = require('../controllers/SearchController');
var ProductController = require('../controllers/ProductController');
// init controllers
router.controllers = {
  searchModels: new SearchController(router),
  productPages: new ProductController(router)
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/search',router.controllers.searchModels.searchAll);

router.get('/model',router.controllers.productPages.renderProduct);

module.exports = router;
