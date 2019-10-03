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

function getDishes(type) {
	return new Promise((resolve, reject)=> {
		let email = firebase.auth().currentUser.email;
		let setDoc = db.collection('users').doc(email).collection(type).get()
		.then(snapshot => {
			let dishes = []
			snapshot.forEach(doc => {
				console.log(doc.id, '=>', doc.data());
				dishes.push({'id': doc.id, 'name': doc.data().name});
			});
			resolve(dishes);
		})
		.catch(err => {
			console.log('Error getting documents', err);
		});
	})
}

app.get('/getMainDishes', (req, res) => {
	getDishes('mainDishes')
	.then((dishes) => {
		res.send(dishes);
	});
})
app.get('/getSideDishes', (req, res) => {
	getDishes('sideDishes')
	.then((dishes) => {
		res.send(dishes);
	});
})

app.post('/getDish', (req, res) => {
	console.log(req.body);
	let email = firebase.auth().currentUser.email;
	let type = req.body.type
	let name = req.body.name
	let setDoc = db.collection('users').doc(email).collection(type).doc(name).get()
	.then(doc => {
		if (!doc.exists) {
			console.log('No such document!');
		} else {
			console.log('Document data:', doc.data());
			res.send(doc.data());
		}
	})
	.catch(err => {
	console.log('Error getting document', err);
	});
})

app.get('/logout', (req, res) => {
	res.redirect('/');
})

app.post('/addDish', (req, res) => {
	//save to database
	console.log(req.body);
	let email = firebase.auth().currentUser.email;
	let desc = '';
	let id = req.body.id;
	let name = req.body.name;
	let type = req.body.type;

	if (req.body.description) {
		desc = req.body.description
	}
	let data = {
		name: name,
		description: desc
	}
	if (id != 'newDish') {
		db.collection('users').doc(email).collection(type).doc(id).set(data);
	} else {
		db.collection('users').doc(email).collection(type).add(data);
	}

	res.send('ok');
});

app.post('/deleteDish', (req, res) => {
	let id = req.body.id;
	let type = req.body.type;
	console.log(req.body);
	let email = firebase.auth().currentUser.email;
	db.collection('users').doc(email).collection(type).doc(id).delete()
	.then((deleteDoc) => {
		res.send('ok');
	})
	.catch((error) => {
		res.send('not ok');
	})
})

app.get('/accountPage', (req, res) => {
    res.render('customiseFoodPage.hbs');
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is up on the port ${port}`);
});

