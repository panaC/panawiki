
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:name', function(req, res, next) {


  res.redirect('/pg/' + req.params.name);
});

module.exports = router;
