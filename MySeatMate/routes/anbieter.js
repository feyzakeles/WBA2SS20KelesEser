var express = require('express');
var app = express.Router();
var controller = require('../controller/anbieter');

app.get('/anbieter/:id', controller.getAnbieter);

app.post('/anbieter', controller.postAnbieter);

app.put('/anbieter/:id', controller.putAnbieter);

app.delete('/anbieter/:id', controller.deleteAnbieter);

module.exports = app;