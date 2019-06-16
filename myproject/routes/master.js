var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/form', function(req, res, next) {
  res.render('master/form');
});

router.get('/table', function(req, res, next) {
    res.render('master/table');
  });
  
module.exports = router;
