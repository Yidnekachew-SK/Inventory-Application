const { Router } = require('express');
const itemController = require('../controllers/itemController');

const itemRouter = Router();
itemRouter.get('/:category', itemController.getItems)

itemRouter.get('/create/:categoryId', itemController.createItemGet)

itemRouter.post('/create/:categoryId', itemController.createItemPost)

itemRouter.get('/:itemId/update', itemController.updateItemGet)

itemRouter.put('/:itemId/update', itemController.UpdateItemPost)

itemRouter.delete('/:itemId/delete', itemController.deleteItem)


module.exports = itemRouter