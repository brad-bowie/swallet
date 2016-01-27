var request = require('request');
var apikeys = require('../lib/apis/apikeys');

function SearchModels(router) {
    //var apikeys = router.get('./lib/apis').apikeys;
    //var SearchModel = req.query.SearchModel;
    console.log('SearchController.js loaded');

    this.getForm = function(req,res){
      console.log('got Search request');
      console.log(req.query.searchTerm);
      res.render ('index');
    }

    this.searchAll = function(req,res) {
      var searchTerm = req.query.searchTerm;
      var url = "http://api.bestbuy.com/v1/products(modelNumber="+searchTerm+"*)?show=modelNumber,UPC,name,manufacturer,largeImage,salePrice&apiKey="+apikeys.bbapi+"&format=json";
      var json = null;
      var request = require('request');

      //write logic to make sure we have a search term or error out

      //call BB Api
      request(url, function (error, response, body) {
          //Check for error
          if(error){
              return console.log('Error:', error);
          }

          //Check for right status code
          if(response.statusCode !== 200){
              return console.log('Invalid Status Code Returned:', response.statusCode);
          }

          //All is good. Print the body
          console.log(typeof body); // Show the HTML for the Modulus homepage.
          json = JSON.parse(body);
          console.log(json);
          res.render('searchresults',{'results':json});
      });
      //console.log(json);

    }
}

module.exports = SearchModels;
