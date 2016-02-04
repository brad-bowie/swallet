var request = require('request');
var apikeys = require('../lib/apis/apikeys');

function ProductPages(router) {
    console.log('ProductController.js loaded');

    //var url = 'http://api.bestbuy.com/v1/products(modelNumber='+searchTerm+'&active=true)?show=manufacturer,URL,modelNumber,name,sku,height,width,depth,salePrice,features.feature,details.name,details.value&apiKey=meaeshrr3dkdau7rwk97heex&format=json';
    this.renderProduct = function(req,res) {
      var url = 'http://api.bestbuy.com/v1/products(modelNumber='+req.query.modelNumber+')?show=URL,manufacturer,active,modelNumber,name,sku,largeImage,height,width,depth,salePrice,features.feature,details.name,details.value&format=json&apiKey='+apikeys.bbapi
      console.log('got ProductRender request for '+req.query.modelNumber)

      var json = null;

      //TODO write logic to make sure we have a search term or error out

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
          //All is good. Parse the data
          json = JSON.parse(body);

          res.render('productpage',{'results':json});
      });
    }
}

module.exports = ProductPages;
