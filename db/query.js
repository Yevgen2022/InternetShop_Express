
module.exports = {
    get_cats: `
        SELECT *
        FROM category AS cat
                 LEFT JOIN category_lang AS cl ON cat.id = cl.cid
        WHERE cl.lang = 'ua'
    `,
}