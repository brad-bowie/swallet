var request = require('request');
var apikeys = require('../lib/apis/apikeys');
var dblogic = require('../blogic/dblogic');
var company = 'bby'; //TODO company should be unique key for company

function getsubcats (catidmodifier,howdeep,pagesize) {
    howdeep--;
    var catidmodifier = catidmodifier;
    if (pagesize == 'undefinded') {
      pagesize = 100;
    }

    var url = 'http://api.bestbuy.com/v1/categories('+catidmodifier+')?format=json&pageSize='+pagesize+'&apiKey='+apikeys.bbapi;
    request(url, function (error, response, body) {
        //Check for error
        if(error){
            return console.log('Error:', error);
        }

        //If it breaks, throw the code
        if(response.statusCode !== 200){
          return console.log('Invalid Status Code Returned:',response.statusCode);
        }

        //Good request
        var json = JSON.parse(body);

        //make sure we have data returned
        if(json.to == 0) {
          return console.log('no categories exist');
        } else {

          //for each category returned, get name and id, get subcategories
          for(var i = 0; i < json.to; i++) {
            var subcattotal = 0;
            var subcatlist = '';
            var sep = '';
            result = json.categories[i];
            //console.log(result.name,result.id,result.subCategories);
            for(var z = 0; z < result.subCategories.length; z++) {
              subcattotal++;
              subcatlist = subcatlist + sep + result.subCategories[z].id;
              sep = ',';
            }
            subcatmanager(subcatlist,subcattotal,howdeep);
            dblogic.writeCategory(result.name,result.id,result.subCategories,company);
          };
        }
      })
  };

function subcatmanager(subcatlist,subcattotal,howdeep){
  if (subcattotal == 0) {
    return;
  } else if (subcattotal == 1) {
    subcatlist = 'id='+subcatlist;
  } else {
    subcatlist = 'id in('+subcatlist+')';
  };

  if (howdeep !== 0) {
    ///delay the API call
    console.log(howdeep);
    setTimeout(function() {
    //  getsubcats(subcatlist,howdeep,subcattotal);
    },2000);
    console.log('getsubcats('+subcatlist+','+howdeep);
  } else {
    console.log('go no deeper');
  };
}

function BestBuyData(router) {
    console.log('BestBuyAPIController.js loaded');
    console.log('logging categories');

    this.buildApplianceCategorytree = function (req,res) {
      //hard code appliance category in the beginning
      var catidmodifier = 'id=abcat090*|id=abcat0910000'; //req.query.catid;
      var howdeep = 1;
      getsubcats(catidmodifier,howdeep,100);
    }

    this.showList = function(req,res) {
    var url = 'http://api.bestbuy.com/v1/categories(id=abcat09*)?format=json&apiKey='+apikeys.bbapi;
    var json = null;
    var request = require('request');
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

        res.render('categorylist',{'results':json});
    });}
}

module.exports = BestBuyData;
