const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json

// CORS start
const cors = require("cors");
const whitelist = ["http://localhost:3000"];
const corsOptions = {
	origin: function (origin, callback) {
		if (!origin || whitelist.indexOf(origin) !== -1) {
		callback(null, true)
		} else {
		callback(new Error("Not allowed by CORS"))
		}
	},
	credentials: true,
}
app.use(cors(corsOptions));
// CORS end

// Connection to DB
const mysql = require('mysql');
const dbConn = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'url_shortener'
});

dbConn.connect(function(err){
	if(err){
		console.log('Database connection error');
	}else{
		console.log('Database connection successful');
	}
});

// API Routes

// Test Health
app.get('/', function (req, res) {
	return res.json({
		"URL shortener made by": "Nian Kai"
	})
})

// Add shortened URL
app.post('/url', function(req, res) {
	let long_url = req.body.long_url;
	let short_url = req.body.short_url;
	let url_record = { 
		long_url: long_url, 
		short_url: short_url
	};

	dbConn.query('INSERT INTO url_shortener.url SET ?', url_record, function (err, res) {
		if(err) throw err;
	});
})

// Retrieve long URL
app.get('/:url', function (req, res) {
	let baseURL = "http://localhost:3001/"
	let shortURL = baseURL + req.params.url;

	dbConn.query('SELECT * FROM url_shortener.url WHERE short_url=?;', shortURL, function (err, data) {
		if(err) throw err;
		if(data.length == 0){
			res.send("<h1>URL not present</h1>")
		} else{
			res.redirect(data[0]['long_url'])
		}
	});
})

// Check presence of short URL generated
app.post('/check', function (req, res) {
	let short_url = req.body.short_url;
	dbConn.query('SELECT * FROM url_shortener.url WHERE short_url=?;', short_url, function (err, data) {
		if(err) throw err;
		if(data == []){
			res.send("URL not present")
		} else{
			res.send("URL present")
		}
	});
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)