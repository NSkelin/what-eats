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

//db setup
var firebase = require('firebase/app');
require('firebase/auth');
var firebaseConfig = {
	apiKey: "AIzaSyBvCy3aVXijlVRYzBAjk-SELvDxjtYB0qQ",
	authDomain: "what-eats.firebaseapp.com",
	databaseURL: "https://what-eats.firebaseio.com",
	projectId: "what-eats",
	storageBucket: "what-eats.appspot.com",
	messagingSenderId: "460494922666",
	appId: "1:460494922666:web:4521dd967a85392e"
};
firebase.initializeApp(firebaseConfig);

const admin = require('firebase-admin');

const serviceAccount = require('./private-admin-key.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://what-eats.firebaseio.com"
});
var db = admin.firestore();

app.get('/', (req, res) => {
    res.render('landingPage.hbs');
});

app.post('/signup', (req, res) => {
	console.log(req.body);
	let email = req.body.login;
	console.log(email);
	let password = req.body.password;
	firebase.auth().createUserWithEmailAndPassword(email, password)
	.then(() => {
		res.redirect('/homePage');
	})
	.catch((error) => {
		var errorCode = error.code;
  		var errorMessage = error.message;
  		console.log(errorCode);
		console.log(errorMessage);
	})
});

app.post('/login', (req, res) => {
	let email = req.body.login;
	let password = req.body.password;
	firebase.auth().signInWithEmailAndPassword(email, password)
	.then(() => {
		res.redirect('/homePage');
	})
	.catch((error) => {
		var errorCode = error.code;
		var errorMessage = error.message;
		console.log(errorCode);
		console.log(errorMessage);
	});
});

app.get('/homePage', (req, res) => {
    res.render('homePage.hbs');
});

app.get('/customisePage', (req, res) => {
    res.render('customiseFoodPage.hbs');
});

app.get('/logout', (req, res) => {
	res.redirect('/');
})

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

