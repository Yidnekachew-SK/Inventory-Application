const express = require('express');
const path = require("node:path");
const categoryRouter = require('./routes/categoryRoutes');
const itemRouter = require('./routes/itemRoutes');

const app = express();
const port = 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use('/', categoryRouter);
app.use('/item', itemRouter);

app.listen(port, (error) => {
    if (error) {
        console.log('Error', error);
    }

    console.log('server running');
})