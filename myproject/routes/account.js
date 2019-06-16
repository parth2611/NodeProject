var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('account/login');
});

router.get('/change-password', function(req, res, next) {
  res.render('account/change-password');
});

router.get('/forgot-password', function(req, res, next) {
  res.render('account/forgot-password');
});

router.get('/dashboard', function(req, res, next) {
  res.render('account/dashboard');
});

module.exports = router;
