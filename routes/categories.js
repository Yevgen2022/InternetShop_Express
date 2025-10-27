const express = require('express');
const router = express.Router();

// const data = require('../data/data.json');

/* GET category page. */
router.get('/', function(req, res, next) {

    //work with DB

  res.render('categories', {
      title: 'All Categories',
      // data: data
  });
});


/* GET category name. */
router.get('/:category_name', function(req, res, next) {
    console.log(req.params);
    const catName = req.params.category_name;
    res.render('single_category', {data: data[catName]});
});

module.exports = router;
