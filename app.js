const express = require('express');
const path = require("node:path");
const categoryRouter = require('./routes/categoryRoutes');
const itemRouter = require('./routes/itemRoutes');
const methodOverride = require('method-override');

const app = express();
const port = 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method'));

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