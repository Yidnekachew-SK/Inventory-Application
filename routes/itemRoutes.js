const { Router } = require('express');
const itemController = require('../controllers/itemController');

const itemRouter = Router();
itemRouter.get('/:category', itemController.getItems)

itemRouter.get('/create/:categoryId', itemController.createItemGet)

itemRouter.post('/create/:categoryId', itemController.createItemPost)

itemRouter.get('/:itemId/update', (req, res) => {
    res.send('get category updated');
})

itemRouter.put('/:itemId/update', (req, res) => {
    res.send('put category updated');
})

itemRouter.delete('/:itemId/delete', (req, res) => {
    res.send('category deleted');
})


module.exports = itemRouter