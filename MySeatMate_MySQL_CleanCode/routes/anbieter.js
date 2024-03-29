var express = require('express');
var app = express.Router();
var controller = require('../controller/anbieter');
var controllerangebot = require('../controller/angebote');

/* ----------- ANBIETERPROFIL BEREICH ----------- */

//GET Einen bestimmten Anbieter aufrufen
app.get('/anbieter/:id', controller.getAnbieterById);

//POST Neuen Anbieter erstellen
app.post('/anbieter', controller.postAnbieter);


//PUT Anbieter Einstellungen ändern
app.put('/anbieter/:id', controller.putAnbieter);


//DELETE Anbieter löschen
app.delete('/anbieter/:id', controller.deleteAnbieter); 


/* ----------- ANGEBOT BEREICH ----------- */

//POST Neue Angebot erstellen
app.post('/anbieter/:id/angebote', controllerangebot.postAngebote);




module.exports = app;


