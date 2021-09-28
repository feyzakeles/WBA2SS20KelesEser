var express = require('express');
var app = express.Router();
var controller = require('../controller/mitfahrer');
var controllerangebot = require('../controller/angebote');



/* ----------- MITFAHRERPROFIL BEREICH ----------- */

//GET Einen bestimmten Mitfahrer aufrufen
app.get('/mitfahrer/:id', controller.getMitfahrerById);

//POST Neuen Mitfahrer erstellen
app.post('/mitfahrer', controller.postMitfahrer);

//PUT Mitfahrer Einstellungen ändern
app.put('/mitfahrer/:id', controller.putMitfahrer);

//DELETE Mitfahrer löschen
app.delete('/mitfahrer/:id', controller.deleteMitfahrer); 

/* ----------- ANGEBOT SUCHEN ----------- */

//GET Angebot suchen
app.get('/angebote', controllerangebot.sucheAngebote); 


module.exports = app;