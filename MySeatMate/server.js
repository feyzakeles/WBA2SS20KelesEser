const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const fs = require('fs');

app.use(function(req, res, next){
	console.log(' Time: %d ' + ' Request-Pfad: ' + req.path, Date.now());
	next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



const server = app.listen(3001, () => {
    console.log('listening on port %s...', server.address().port);
});