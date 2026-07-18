const { Router } = require('express');

const itemRouter = Router();

itemRouter.get('/:category', (req, res) => {
    const category = req.params.category;
    res.send('items in the category ' + category);
})

itemRouter.post('/create', (req, res) => {
    res.send('category added');
})

itemRouter.put('/update/:itemId', (req, res) => {
    res.send('category updated');
})

itemRouter.delete('/delete/:itemId', (req, res) => {
    res.send('category deleted');
})


module.exports = itemRouter