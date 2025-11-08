
module.exports = {
    get_cats: `
        SELECT *
        FROM category AS cat
                 LEFT JOIN category_lang AS cl ON cat.category_id = cl.category_id
        WHERE cl.lang = 'ua'
    `,

    get_single_cat:`
        SELECT *
        FROM category AS cat
                 LEFT JOIN category_lang AS cl ON cat.category_id = cl.category_id
        WHERE cat.url = ?
          AND cl.lang = 'ua'
    `,

}