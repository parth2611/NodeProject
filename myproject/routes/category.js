var express = require('express');
var router = express.Router();

//Call User Database Model
var CategoryModel = require('../schema/category_table');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/add', function(req, res, next) {
  res.render('category/category-add');
});

 

//Add Form Processing using Post Method 
router.post('/add', function(req, res, next) {
  console.log(req.body);

  var filename = req.files.file123.name;
  //Create an Array 
  const mybodydata = {
    category_name: req.body.category_name,
    category_image :filename
   
}
var data = CategoryModel(mybodydata);
 

var filedata = req.files.file123;
filedata.mv("public/upload/"+filename, function(err) {
    if (err)
      return res.status(500).send(err);

  });
data.save(function(err) {
    if (err) {
       console.log("Error in Insert Record");
    } else {
        res.render('category/category-add');
    }
})

});




router.get('/view', function(req, res, next) {

    CategoryModel.find(function(err, db_users_array) {
    if (err) {
        console.log("Error in Fetch Data " + err);
      } else {
        //Print Data in Console
        console.log(db_users_array);
        //Render User Array in HTML Table
        res.render('category/category-display', { user_array : db_users_array });
        
      }
  });
 
});




//Get Single User By ID
router.get('/show/:id', function(req, res) {
  console.log(req.params.id);
  CategoryModel.findById(req.params.id, function(err, db_categor_array) {
      if (err) {
          console.log("Error in Single Record Fetch" + err);
      } else {
          console.log(db_categor_array);

          res.render('category/single-category-record', { category_array: db_categor_array });
      }
  });
});



//Delete User By ID
router.get('/delete/:id', function(req, res) {
    CategoryModel.findOneAndDelete(req.params.id, function(err, project) {
      if (err) {

        console.log("Error in Record Delete " + err);
          res.redirect('/category/category-display');
      } else {

        console.log(" Record Deleted ");
          res.redirect('/category/view');
      }
  });
});



//Get Single User for Edit Record
router.get('/edit/:id', function(req, res) {

  console.log(req.params.id);
  
  CategoryModel.findById(req.params.id, function(err, db_category_array) {
      if (err) {
          console.log("Edit Fetch Error " + err);
      } else {
          console.log(db_category_array);

          res.render('category/category-edit', { category_array: db_category_array });
      }
  });
});








//Update Record Using Post Method
router.post('/edit/:id', function(req, res) {

  console.log("Edit ID is"+ req.params.id);

  const mybodydata = {
    category_name: req.body.category_name 
  }

  CategoryModel.findByIdAndUpdate(req.params.id, mybodydata, function(err) {
      if (err) {
          console.log("Error in Record Update");
          res.redirect('/category/display-category');
      } else {
        
          res.redirect('/category/view');
      }
  });
});


module.exports = router;