
const dataPath = './data/anbieter.json';
var fs = require('fs');
var distance = require('google-distance');
var buchungfunction = require('./buchung.js');

module.exports = {
    postAngebote,
    putAngebote,
    deleteAngebote,
    sucheAngebote
}

//helper
const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

    fs.writeFile(filePath, fileData, encoding, (err) => {
        if (err) {
            throw err;
        }

        callback();
    });
};

//POST Neue Angebot erstellen
function postAngebote(req, res){
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).json(err);
        }
        var userid = parseInt(req.params.id);
        var a = JSON.parse(data);
        var letzteID = 0; 

       
        //API Bereich (Km+Preis)
        distance.apiKey = '...'; 
        distance.get(
            {
              origin: req.body.startort,
              destination: req.body.zielort
            },
            function(err, body) {
                if (err){ 
                    throw console.log(err);
                } 
                var dist = parseInt(body.distance);
                var result = parseInt(dist*0.70);

                for (var i in a){
                    if(a[i].id == userid){
                    var x = a[i].automodell;
                    for(var t in x){
                        if(dist>100){
                            var preis2 = parseInt(x[t].preis2+result);
                        }else{
                            var preis1 = parseInt(x[t].preis1+result);
                        }
                    }
                    var u = a[i].angebote;
                    for (var j in u){
                    if (u[j].id > letzteID){
                        letzteID = parseInt(u[j].id);
                        }
                        
                    }
                }
                }
                var neueId = letzteID + 1; 
                
                var newAngebot = {
                    id: neueId,
                    startort: req.body.startort,
                    zielort: req.body.zielort,
                    datum: req.body.datum,
                    sitzanzahl: req.body.sitzanzahl,
                    verfügbar: req.body.verfügbar,
                    besetzt: req.body.besetzt,
                    km: dist,
                    km_mit_kosten: result,
                    preis: preis1 || preis2,
                    gebucht_von: [buchungfunction.postBuchung]
                };  

                for (var i in a) {
                    if (a[i].id == userid){
                        a[i].angebote.push(newAngebot);
                        
                    } 
                }
           
       
        writeFile(JSON.stringify(a, null, 2), () => {
            res.status(201).send(newAngebot);
        });
    });
    });
};

//PUT Angebot ändern
function putAngebote(req, res){
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('error');
        }
        var userid = parseInt(req.params.id);
        var angebotid = parseInt(req.params.aid);
        var a = JSON.parse(data);
        
        for (var i in a) {
			if (a[i].id == userid){
                var u = a[i].angebote;
                for (var j in u) {
                    if (u[j].id == angebotid){
                        u[j].startort = req.body.startort;
                        u[j].zielort = req.body.zielort;
                        u[j].datum = req.body.datum;
                        u[j].sitzanzahl = req.body.sitzanzahl;
                        u[j].verfügbar = req.body.verfügbar;
                        u[j].besetzt = req.body.besetzt;
                        var neueAngebotdaten = u[j];
                        
                    }
                }
            }
        }
        writeFile(JSON.stringify(a, null, 2), () => {
            res.status(200).send(neueAngebotdaten);
        });
    });
};

//DELETE Angebot löschen
function deleteAngebote(req, res){
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        writeFile(JSON.stringify(a, null, 2), () => {
            res.status(200).send('new user added');
        });
    });
};


//GET Mitfahrer sucht ein Angebot
function sucheAngebote(req, res){
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        
        var a = JSON.parse(data);
        var startort = req.query.startort;
        var zielort = req.query.zielort; 
        var datum = req.query.datum;
        
        var filterData =  a.filter(obj => (obj.angebote = obj.angebote.filter(o => o.startort === startort && o.zielort === zielort && o.datum === datum)).length);

      

        res.status(200).send(filterData);
          
 
          
    });

   
};
