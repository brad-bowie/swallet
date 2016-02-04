var express = require('express');
var router = express.Router();
var apikeys = require('../lib/apis/apikeys');
var SearchController = require('../controllers/SearchController');
var ProductController = require('../controllers/ProductController');
var BestBuyAPIController = require('../controllers/BestBuyAPIController');
var DataController = require('../controllers/DataController');
// init controllers
router.controllers = {
  searchModels: new SearchController(router),
  productPages: new ProductController(router),
  bestBuyAPIController: new BestBuyAPIController(router),
  dataController: new DataController(router)
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//SHOW STUFF SECTION
router.get('/search',router.controllers.searchModels.searchAll);
router.get('/model',router.controllers.productPages.renderProduct);

//BBY SECTION
router.get('/categories',router.controllers.bestBuyAPIController.showList);
router.get('/buildtree',router.controllers.bestBuyAPIController.buildApplianceCategorytree);

module.exports = router;
