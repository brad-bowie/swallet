module.exports = {

writeCategory: function(categoryname,categoryid,subcategories,company) {
  for(var i=0; i < subcategories.length; i++) {
  console.log('evaluating '+ company +' subcats:'+categoryname + "["+ categoryid +"]" + ' - '+ subcategories[i].id +' - '+subcategories[i].name)}
  //determine if the category exists
    // Get a database reference to our posts

  //determine if the category has data in it
    //check that name and id matches
    //add to the list of subcategories
    //log subcategories added or removed
},

watchCategory: function() {
  var ref = new Firebase("https://shining-heat-4424.firebaseio.com/categories");

  // Attach an asynchronous callback to read the data at our posts reference
  ref.on("value", function(snapshot) {
    console.log(snapshot.val());
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
}

};
