const db = require("../db/queries");

const { body, validationResult, matchedData } = require("express-validator");

async function getItems(req, res) {
    const categoryId = req.params.category;
    const items = await db.getItemsByCategory(categoryId);
    res.render('itemViews/items', {items, categoryId})
}

async function createItemGet(req, res) {
    const category = await db.getCategoryById(req.params.categoryId);
    res.render('itemViews/createItemForm', { formType: 'create', category: category[0] });
}

validateCreateItem = [
    body("itemName").trim()
        .isAlpha().withMessage("Item Name must only be letters.")
        .isLength({min: 3, max: 50}).withMessage("Item name must be between 3 and 50 characters."),
    body("price").trim()
        .isFloat({min: 2, max: 99.9}).withMessage("Price must be between 2 and 99.9 with maximum of 1 decimal place.")
        .matches(/^\d{1,2}(\.\d)?$/).withMessage('Value must be numeric with up to 3 digits total and 1 decimal place.'),
    body("quantity").trim()
        .isInt({min: 1, max: 100}).withMessage("Quantity must be between 1 and 100")
];

createItemPost = [
    validateCreateItem,
    async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).render("itemViews/createItemForm", {
                formType: 'create',
                errors: error.array()
            });
        }
        const { itemName, price, quantity } = matchedData(req);
        const categoryId = req.params.categoryId;
        await db.insertItem(itemName, price, quantity, req.params.categoryId);
        res.redirect(`/item/${categoryId}`);
    }
]


module.exports = {
    getItems,
    createItemGet,
    createItemPost
}