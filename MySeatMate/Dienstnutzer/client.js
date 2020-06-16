var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var axios = require('axios');
var dataPath = require('./data/automodelle.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* ----------- ANBIETERPROFIL BEREICH ----------- */

//GET Einen bestimmten Anbieter aufrufen
app.get('/anbieter/:id', (req, res) => {

    axios.get(`https://myseatmate.herokuapp.com/anbieter/${req.params.id}`)
        .then(function (response) {
            res.status(200).send(response.data);
        })
        .catch(function (error) {
            res.status(500).send("Server läuft nicht!!!");
            
        })

});

//POST Neuen Anbieter erstellen
app.post('/anbieter', (req, res) => {
    var b = JSON.parse(JSON.stringify(dataPath))
    for(var j in b){  
        var w = b[j].pid;
        var x = b[j].automodelle;
        var y = b[j].preis1;
        var z = b[j].preis2; 

        var newAutomodell = {
            automodell: req.body.automodell,
        }; 
        for(var i in x){
            if(x[i] === newAutomodell.automodell){
                var newCar = {
                    pid: w,
                    automodell: newAutomodell.automodell,
                    preis1: y,
                    preis2: z
                };                    
            }
            b[j] = x;
            
        } 
       
    }  
    axios.post(`https://myseatmate.herokuapp.com/anbieter` , {
        vorname: req.body.vorname,
        nachname: req.body.nachname,
        automodell: newCar
    })
        .then(function (response) {
           for(var i in response.data){ 
                
            if(response.data[i].id !== null){
                var w =  response.data[i].automodell;
                    for (var j in w) {
                    if(w[j] == null){
                        w[j] = newCar;
                    }
                }
             } 
        } 
            res.status(200).send(response.data);
        })
        .catch(function (error) {
            res.status(500).send({error: "Anbieter existiert bereits!!"});
        })


});

//PUT Neuen Anbieter erstellen
app.put('/anbieter/:id', (req, res) => {

    axios.put(`https://myseatmate.herokuapp.com/anbieter/${req.params.id}`, { 
        vorname: req.body.vorname,
        nachname: req.body.nachname
        })
        .then(function (response) {
            res.status(200).send(response.data);
        })
        .catch(function (error) {
            res.status(500).send({error: "error"});
        })

});

//DELETE Anbieter löschen
app.delete('/anbieter/:id', (req, res) => {

    axios.delete(`https://myseatmate.herokuapp.com/anbieter/${req.params.id}`)
        .then(function (response) {
            res.status(200).send(response.data);
        })
        .catch(function (error) {
            res.status(500).send({error: "error"});
        })

});

/* ----------- ANGEBOT BEREICH ----------- */

//POST Neue Angebot erstellen
app.post('/anbieter/:id/angebote', (req, res) => {

    axios.post(`https://myseatmate.herokuapp.com/anbieter/${req.params.id}/angebote`, { 
        startort: req.body.startort,
        zielort: req.body.zielort,
        datum: req.body.datum,
        sitzanzahl: req.body.sitzanzahl,
        verfügbar: req.body.verfügbar,
        besetzt: req.body.besetzt
        })
        .then(function (response) {
            // console.log(response.data.datum);
            res.status(200).send(response.data);
        })
        .catch(function (error) {
            res.status(500).send({error: "error"});
        })

});


//GET Mitfahrer sucht ein Angebot
app.get('/angebote', (req, res) => {

    axios.get(`https://myseatmate.herokuapp.com/angebote`, { 
       params: { startort: req.query.startort,
        zielort: req.query.zielort, 
        datum: req.query.datum}
        })
        .then(function (response) {
            // console.log(response.data.datum);
            res.status(200).send(response.data);
        })
        .catch(function (error) {
            res.status(500).send({error: "error"});
        })

});

/* ----------- MITFAHRERPROFIL BEREICH ----------- */

//GET Einen bestimmten Mitfahrer aufrufen
app.get('/mitfahrer/:id', (req, res) => {

    axios.get(`https://myseatmate.herokuapp.com/mitfahrer/${req.params.id}`)
        .then(function (response) {
            res.status(200).send(response.data);
        })
        .catch(function (error) {
            res.status(500).send("Server läuft nicht!!!");
            
        })

});


//POST Neuen Mitfahrer erstellen
app.post('/mitfahrer', (req, res) => {

    axios.post(`https://myseatmate.herokuapp.com/mitfahrer`, { 
        vorname: req.body.vorname,
        nachname: req.body.nachname,
        mitfahreranzahl: req.body.mitfahreranzahl,
        gepaeck: req.body.gepaeck
        })
        .then(function (response) {
            res.status(200).send(response.data);
        })
        .catch(function (error) {
            res.status(500).send({error: "Mitfahrer existiert bereits!!"});
        })

});

//PUT Neuen Mitfahrer erstellen
app.put('/mitfahrer/:id', (req, res) => {

    axios.put(`https://myseatmate.herokuapp.com/mitfahrer/${req.params.id}`, { 
        vorname: req.body.vorname,
        nachname: req.body.nachname,
        mitfahreranzahl: req.body.mitfahreranzahl,
        gepaeck: req.body.gepaeck
        })
        .then(function (response) {
            res.status(200).send(response.data);
        })
        .catch(function (error) {
            res.status(500).send({error: "error"});
        })

});

//DELETE Mitfahrer löschen
app.delete('/mitfahrer/:id', (req, res) => {

    axios.delete(`https://myseatmate.herokuapp.com/mitfahrer/${req.params.id}`)
        .then(function (response) {
            res.status(200).send(response.data);
        })
        .catch(function (error) {
            res.status(500).send({error: "error"});
            
        })

});

const client = app.listen(8080, () => {
    console.log('listening on port %s...', client.address().port);
});