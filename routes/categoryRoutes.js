const { Router } = require('express');
const categoryController = require('../controllers/categoryController');

const categoryRouter = Router();

categoryRouter.get('/', categoryController.getCategories);

categoryRouter.get('/create', categoryController.createCategoryGet);

categoryRouter.post('/create', categoryController.createCategoryPost);

categoryRouter.get('/:id/update', categoryController.UpdateCategoryGet);

categoryRouter.put('/:id/update', categoryController.UpdateCategoryPut);

categoryRouter.delete('/:id/delete', categoryController.deleteCategory);


module.exports = categoryRouter