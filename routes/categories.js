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


    let query = categoryQuery.get_single_cat;
    const connection = await mysql.createConnection(CONFIG);
    const [data] = await connection.execute(query, [catName]);

    query = "SELECT * FROM products LEFT JOIN products_lang ON products_lang.product_id = products.product_id WHERE products.category_id = ? and products_lang.lang = 'ua'";

    const [products] = await connection.execute(query, [data[0].category_id]);

    connection.end();

    console.log(data[0].category_id);

    res.render('single_category', {
        "data": data[0],
        "products": products
    });
});

module.exports = router;
