var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const anbieterRoutes = require('./routes/anbieter');
const mitfahrerRoutes = require('./routes/mitfahrer');
const angeboteRoutes = require('./routes/angebote');

app.use(function(req, res, next){
	console.log(' Time: %d ' + ' Request-Pfad: ' + req.path, Date.now());
	next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', anbieterRoutes);
app.use('/', mitfahrerRoutes);
app.use('/', angeboteRoutes);

const server = app.listen(3001, () => {
    console.log('listening on port %s...', server.address().port);
});

module.exports = app;