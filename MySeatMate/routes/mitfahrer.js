var express = require('express');
var app = express.Router();
var controller = require('../controller/mitfahrer');


/* ----------- MITFAHRERPROFIL BEREICH ----------- */

//GET Einen bestimmten Mitfahrer aufrufen
app.get('/mitfahrer/:id', controller.getMitfahrer);

//POST Neuen Mitfahrer erstellen
app.post('/mitfahrer', controller.postMitfahrer);

//PUT Mitfahrer Einstellungen ändern
app.put('/mitfahrer/:id', controller.putMitfahrer);

//DELETE Mitfahrer löschen
app.delete('/mitfahrer/:id', controller.deleteMitfahrer);

module.exports = app;