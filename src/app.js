const express = require('express');

const path = require('path');
const hbs = require('hbs');

const app = express();
require('./db/conn');
const User = require('./models/userSchema');
const port = process.env.port || 8000;

//setting the path
const staticPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

//middleware
app.use('/css', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js')));
app.use('/jq', express.static(path.join(__dirname, '../node_modules/jquery/dist')));
app.use(express.urlencoded({
    extended: false
}))
app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);

//routing
app.get('/', (req, res) => {
    res.render("index");
})

app.post("/contact", async (req, res) => {
    try {
        const userDetails = await new User(req.body);
        userDetails.save();
        res.status(201).render("index");
    } catch (err) {
        res.status(500).send(err);
    }
})

//server created
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
})