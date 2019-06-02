const express = require('express');
const hbs = require('hbs');
var app = express();

// bodyparser setup
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded ({
    extended: true
}));
app.use(bodyParser.json())

// handlebars setup
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
    res.render('landingPage.hbs');
});

app.get('/homePage', (req, res) => {
    res.render('homePage.hbs');
});

app.get('/customisePage', (req, res) => {
    res.render('customiseFoodPage.hbs');
});

app.post('/addDish', (req, res) => {
	//save to database
	console.log(req.body.name);
	res.send('ok');
});

app.get('/accountPage', (req, res) => {
    res.render('customiseFoodPage.hbs');
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is up on the port ${port}`);
});

