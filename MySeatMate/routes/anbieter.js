var express = require('express');
var app = express.Router();
var controller = require('../controller/anbieter');
var controllerangebot = require('../controller/angebote');
var controllerautomodell = require('../controller/automodelle');

/* ----------- ANBIETERPROFIL BEREICH ----------- */

//GET Einen bestimmten Anbieter aufrufen
app.get('/anbieter/:id', controller.getAnbieter);

//POST Neuen Anbieter erstellen
app.post('/anbieter', controller.postAnbieter);

//PUT Anbieter Einstellungen ändern
app.put('/anbieter/:id', controller.putAnbieter);

//DELETE Anbieter löschen
app.delete('/anbieter/:id', controller.deleteAnbieter);

/* ----------- ANGEBOT BEREICH ----------- */

//POST Neue Angebot erstellen
app.post('/anbieter/:id/angebote', controllerangebot.postAngebote);

//PUT Angebot ändern
app.put('/anbieter/:id/angebote/:aid', controllerangebot.putAngebote);

//DELETE Angebot löschen
app.put('/anbieter/:id/angebote/:aid', controllerangebot.deleteAngebote);

// app.get('/automodell', controllerautomodell.getAutomodell);

/* ----------- AUTOMODELL AUSWÄHLEN ----------- */


app.post('/anbieter/:id/automodell', controllerautomodell.postAutomodell);


module.exports = app;