const { Router } = require('express');

const categoryRouter = Router();

categoryRouter.get('/', (req, res) => {
    res.send('all categories');
})

categoryRouter.post('/create', (req, res) => {
    res.send('category added');
})

categoryRouter.put('/update/:id', (req, res) => {
    res.send('category updated');
})

categoryRouter.delete('/delete/:id', (req, res) => {
    res.send('category deleted');
})


module.exports = categoryRouter