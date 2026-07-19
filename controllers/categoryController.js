const db = require("../db/queries");

const { body, validationResult, matchedData } = require("express-validator");

async function getCategories(req, res) {
    const categories = await db.getAllCategories();
    res.render('categoryViews/index', {categories})
}

async function createCategoryGet(req, res) {
    res.render('categoryViews/form', { formType: 'create' });
}

const validateCreateCategory = [
    body('categoryName').trim()
        .isAlpha().withMessage('Category name must only be letters.')
        .isLength({min: 5, max: 50}).withMessage('Category name must be between 5 and 50 characters.'),
]

createCategoryPost = [
    validateCreateCategory,
    async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).render("categoryViews/form", {
                formType: 'create',
                errors: error.array()
            });
        }
        const { categoryName } = matchedData(req);
        await db.AddCategory(categoryName);
        res.redirect('/');
    }
]

async function UpdateCategoryGet(req, res) {
    const category = await db.getCategoryById(req.params.id);
    res.render('categoryViews/form', { formType: 'update', category });
}

const pass = process.env.ADMIN_PASS;
const validateUpdateCategory = [
    body('newCategoryName').trim()
        .isAlpha().withMessage('Category name must only be letters.')
        .isLength({min: 5, max: 50}).withMessage('Category name must be between 5 and 50 characters.'), 
    body('adminPass').trim()
        .isAlphanumeric().withMessage('Admin Password must only be letters or numbers.')
        .equals(pass).withMessage('Incorrect Admin Password.')
]

UpdateCategoryPut = [
    validateUpdateCategory,
    async (req, res) => {
        const category = await db.getCategoryById(req.params.id);
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).render("categoryViews/form", {
                formType: 'update',
                category,
                errors: error.array()
            });
        }
        const { newCategoryName } = matchedData(req);
        await db.updateCategory(req.params.id, newCategoryName);
        res.redirect('/');
    }
]

async function deleteCategory(req, res) {
    await db.deleteCategory(req.params.id);
    res.redirect('/');
}


module.exports = {
    getCategories,
    createCategoryGet,
    createCategoryPost,
    UpdateCategoryGet,
    UpdateCategoryPut,
    deleteCategory
}