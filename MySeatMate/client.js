var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var axios = require('axios');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* ----------- ANBIETERPROFIL BEREICH ----------- */

//GET Einen bestimmten Anbieter aufrufen
app.get('/anbieter/:id', (req, res) => {

    axios.get(`http://localhost:3001/anbieter/${req.params.id}`)
        .then(function (response) {
            res.status(200).send(response.data);
        })
        .catch(function (error) {
            res.status(500).send("Server läuft nicht!!!");
            
        })

});

//POST Neuen Anbieter erstellen
app.post('/anbieter', (req, res) => {

    axios.post(`http://localhost:3001/anbieter`, { 
        vorname: req.body.vorname,
        nachname: req.body.nachname,
        automodell: req.body.automodell
        })
        .then(function (response) {
            res.status(200).send(response.data);
        })
        .catch(function (error) {
            res.status(500).send({error: "Anbieter existiert bereits!!"});
        })

});

//PUT Anbieter Einstellungen ändern
app.put('/anbieter/:id', (req, res) => {

    axios.put(`http://localhost:3001/anbieter/${req.params.id}`, { 

        vorname: req.body.vorname,
        nachname: req.body.nachname
        })
        .then(function (response) {
            res.status(200).send(response.data);
        })
        .catch(function (error) {
            res.status(500).send({error: "Anbieter wurde nicht aktualisiert!!"});
        })

});

//DELETE Anbieter löschen
app.delete('/anbieter/:id', (req, res) => {

    axios.delete(`http://localhost:3001/anbieter/${req.params.id}`, { 

        vorname: req.body.vorname,
        nachname: req.body.nachname
        })
        .then(function (response) {
            res.status(200).send(response.data);
        })
        .catch(function (error) {
            res.status(500).send({error: "Anbieter wurde nicht gelöscht!!"});
        })

});


/* ----------- ANGEBOT BEREICH ----------- */

//POST Neue Angebot erstellen
app.post('/anbieter/:id/angebote', (req, res) => {

    axios.post(`http://localhost:3001/anbieter/${req.params.id}/angebote`, { 
        vorname: req.body.vorname,
        nachname: req.body.nachname
        })
        .then(function (response) {
            res.status(200).send(response.data);
        })
        .catch(function (error) {
            res.status(500).send({error: "Neues Angebot konnte nicht erstellt werden!!"});
        })

});

//PUT Angebot ändern
app.put('/anbieter/:id/angebote/:aid', (req, res) => {

    axios.put(`http://localhost:3001/anbieter/${req.params.id}/angebote/${req.params.aid}`, { 

        vorname: req.body.vorname,
        nachname: req.body.nachname
        })
        .then(function (response) {
            res.status(200).send(response.data);
        })
        .catch(function (error) {
            res.status(500).send({error: "Angebot konnte nicht geändert werden!!"});
        })

});

//DELETE Angebot löschen
app.delete('/anbieter/:id/angebote/:aid', (req, res) => {

    axios.delete(`http://localhost:3001/anbieter/${req.params.id}/angebote/${req.params.aid}`, { 

        vorname: req.body.vorname,
        nachname: req.body.nachname
        })
        .then(function (response) {
            res.status(200).send(response.data);
        })
        .catch(function (error) {
            res.status(500).send({error: "Angebot konnte nicht gelöscht werden!!"});
        })

});

/* ----------- AUTOMODELL AUSWÄHLEN ----------- */

//POST Automodell auswählen
app.post('/anbieter/:id/automodell', (req, res) => {

    axios.post(`http://localhost:3001/anbieter/${req.params.id}/automodell`, { 
        vorname: req.body.vorname,
        nachname: req.body.nachname
        })
        .then(function (response) {
            res.status(200).send(response.data);
        })
        .catch(function (error) {
            res.status(500).send({error: "Automodell konnte nicht ausgewählt werden!!"});
        })

});


/* ----------- MITFAHRERPROFIL BEREICH ----------- */

//GET Einen bestimmten Mitfahrer aufrufen
app.get('/mitfahrer/:id', (req, res) => {

    axios.get(`http://localhost:3001/mitfahrer/${req.params.id}`)
    .then(function (response) {
        res.status(200).send(response.data);
    })
    .catch(function (error) {
        res.status(500).send("Server läuft nicht!!!");
        
    })

});



//POST Neuen Mitfahrer erstellen
app.post('/mitfahrer', (req, res) => {

    
    axios.post(`http://localhost:3001/mitfahrer`, { 
        vorname: req.body.vorname,
        nachname: req.body.nachname
        })
        .then(function (response) {
            res.status(200).send(response.data);
        })
        .catch(function (error) {
            res.status(500).send({error: "Mitfahrer existiert bereits!!"});
        })

});



//PUT Mitfahrer Einstellungen ändern
app.put('/mitfahrer/:id', (req, res) => {

    axios.put(`http://localhost:3001/mitfahrer/${req.params.id}`, { 

        vorname: req.body.vorname,
        nachname: req.body.nachname
        })
        .then(function (response) {
            res.status(200).send(response.data);
        })
        .catch(function (error) {
            res.status(500).send({error: "Mitfahrer wurde nicht aktualisiert!!"});
        })

});

//DELETE Mitfahrer löschen
app.delete('/mitfahrer/:id', (req, res) => {

    axios.delete(`http://localhost:3001/mitfahrer/${req.params.id}`, { 

        vorname: req.body.vorname,
        nachname: req.body.nachname
        })
        .then(function (response) {
            res.status(200).send(response.data);
        })
        .catch(function (error) {
            res.status(500).send({error: "Mitfahrer wurde nicht gelöscht!!"});
        })

});

/* ----------- ANGEBOT SUCHEN ----------- */

//GET Angebot suchen
app.get('/angebote', (req, res) => {

    axios.get(`http://localhost:3001/angebote`,) //buraya bakcen merve
    .then(function (response) {
        res.status(200).send(response.data);
    })
    .catch(function (error) {
        res.status(500).send("Keine Angebote!!!");
        
    })

});

/* ----------- BUCHUNG BEREICH ----------- */

//POST Ein Angebot buchen
app.post('/mitfahrer/:mid/angebote/:aid/buchung', (req, res) => {

    axios.post(`http://localhost:3001/mitfahrer/${req.params.mid}/angebote/${req.params.aid}/buchung`, { 
        vorname: req.body.vorname,
        nachname: req.body.nachname
        })
        .then(function (response) {
            res.status(200).send(response.data);
        })
        .catch(function (error) {
            res.status(500).send({error: "Angebot ist ausgebucht!!"});
        })

});


const client = app.listen(8080, () => {
    console.log('listening on port %s...', client.address().port);
});
