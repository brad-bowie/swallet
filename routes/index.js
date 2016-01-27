var express = require('express');
var router = express.Router();
var SearchController = require('../controllers/SearchController');
// init controllers
router.controllers = {
  searchModels: new SearchController(router)
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/search',router.controllers.searchModels.searchAll);

//router.get('/search', app.controllers.searchModels.getForm);

module.exports = router;
