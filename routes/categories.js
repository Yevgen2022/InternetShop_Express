const express = require('express');
const router = express.Router();

const categoryQuery = require('../db/query');

// const data = require('../data/data.json');

/* GET category page. */
router.get('/', async function (req, res, next) {

    //work with DB
    const query = categoryQuery.get_cats;
    const [data] = await res.locals.db.execute(query);

    res.render('categories', {
        title: 'All Categories',
        data: data
    });
});


/* GET single category page. */
router.get('/:categoryName', async function (req, res, next) {
    console.log(req.params);
     const catName = req.params.categoryName;


    let query = categoryQuery.get_single_cat;
    const [data] = await res.locals.db.execute(query, [catName]);

    query = "SELECT * FROM products LEFT JOIN products_lang ON products_lang.product_id = products.product_id WHERE products.category_id = ? and products_lang.lang = 'ua'";

    const [products] = await res.locals.db.execute(query, [data[0].category_id]);

    console.log(data[0].category_id);

    res.render('singleCategory', {
        "data": data[0],
        "products": products
    });
});


/* GET single product page. */
router.get('/:categoryName/:productName', async function (req, res, next) {
    console.log(req.params);
    const catName = req.params.categoryName; //url of category
    const prodName = req.params.productName; //url of product

//get info about category
    let query = categoryQuery.get_single_cat;
    const [categories] = await res.locals.db.execute(query, [catName]);

//get info about all products of category
    query = "SELECT * FROM products LEFT JOIN products_lang ON products_lang.product_id = products.product_id WHERE products.product_url = ? and products_lang.lang = 'ua'";

    const [products] = await res.locals.db.execute(query, [prodName]);

//we are getting the products from the same category
    query = "SELECT * FROM products LEFT JOIN products_lang ON products_lang.product_id = products.product_id WHERE products.category_id = ? and products_lang.lang = 'ua' " +
        "ORDER BY rand() LIMIT 4";

    const [sameProducts] = await res.locals.db.execute(query, [categories[0].category_id]);

// get additional product's foto
    query = "SELECT image_url FROM images WHERE product_id = ? ORDER BY ord asc"
    const[images] = await res.locals.db.execute(query, [products[0]['product_id']]);
    console.log(images);

    console.log(products);

    res.render('singleProduct', {
        "categories": categories[0],
        "products": products[0],
        "images": images,
        sameProducts: sameProducts,
    });
});


module.exports = router;
