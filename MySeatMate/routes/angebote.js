var express = require('express');
var app = express.Router();
var controller = require('../controller/angebote');

// app.get('/mitfahrer/:id', controller.getAngebote);

app.post('/anbieter/:id/angebote', controller.postAngebote);

app.put('/anbieter/:id/angebote/:id', controller.putAngebote);

app.delete('/anbieter/:id/angebote/:id', controller.deleteAngebote);

module.exports = app;