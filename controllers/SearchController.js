var request = require('request');

function SearchModels(router) {
    //var apikeys = router.get('./lib/apis').apikeys;
    //var SearchModel = req.query.SearchModel;
    console.log('SearchController.js loaded');

    this.getForm = function(req,res){
      console.log('got Search request');
      console.log(req.query.searchModel);
      res.render ('searchresults');
    }

    this.searchAll = function(req,res) {
      var searchTerm = req.query.searchModel;
      var url = "http://api.bestbuy.com/v1/products(modelNumber="+searchTerm+"&active=true)?show=URL,modelNumber,name,sku,height,width,depth,salePrice,features.feature,details.name,details.value&apiKey=meaeshrr3dkdau7rwk97heex&format=json";
      var json = null;
      var request = require('request');

      //Lets try to make a HTTPS GET request to modulus.io's website.
      //All we did here to make HTTPS call is changed the `http` to `https` in URL.
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
          //console.log(body); // Show the HTML for the Modulus homepage.
          json = body;
      });
      console.log(json);
      res.render('searchresults',json);
    }
}

module.exports = SearchModels;
