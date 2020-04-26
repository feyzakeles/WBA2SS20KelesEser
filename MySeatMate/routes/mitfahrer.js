var express = require('express');
var app = express.Router();
var controller = require('../controller/mitfahrer');

app.get('/mitfahrer/:id', controller.getMitfahrer);

app.post('/mitfahrer', controller.postMitfahrer);

app.put('/mitfahrer/:id', controller.putMitfahrer);

app.delete('/mitfahrer/:id', controller.deleteMitfahrer);

module.exports = app;