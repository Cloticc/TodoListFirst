// req = request, res = response
//learned about express and how to use it
//learned about the body-parser
//learned about the ejs template engine

const express = require('express');

const port = 3000;
const bodyParser = require('body-parser');
const { render } = require('ejs');
const app = express();
const date = require(__dirname + '/date');

// console.log(date())

const items = [];
const workItems = [];
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded(extended = true));
app.use(express.static('public'));


app.get('/', (req, res) => {
    let day = date.getDate()
    res.render('list', { listTitle: day, newListItems: items });
})

app.post('/', (req, res) => {
    let item = req.body.newItem;

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect('/work');
    } else {
        items.push(item);
        res.redirect('/');
    }

})
app.get('/work', (req, res) => {
    res.render("list", { listTitle: "Work List", newListItems: workItems });
})

app.get("/about", (req, res) => {
    res.render("about");
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));