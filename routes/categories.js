const express = require('express');
const router = express.Router();

const mysql = require('mysql2/promise');
const CONFIG = require('../db/config');
const categoryQuery = require('../db/query');

// const data = require('../data/data.json');

/* GET category page. */
router.get('/', async function (req, res, next) {

    //work with DB
    const connection = await mysql.createConnection(CONFIG);
    const query = categoryQuery.get_cats;
    const [data] = await connection.execute(query);
    connection.end;
    // console.log(data);

    res.render('categories', {
        title: 'All Categories',
        data: data
    });
});


/* GET category page. */
router.get('/:category_name', async function (req, res, next) {
    console.log(req.params);
    const catName = req.params.category_name;

    const query = categoryQuery.get_single_cat;
    const connection = await mysql.createConnection(CONFIG);
    const [data] = await connection.execute(query, [catName]);
    connection.end;

    console.log(data);

    res.render('single_category', {data: data[0]});
});

module.exports = router;
