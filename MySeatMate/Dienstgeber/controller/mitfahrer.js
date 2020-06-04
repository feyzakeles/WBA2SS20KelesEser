
const dataPath = './data/mitfahrer.json';
var fs = require('fs');
module.exports = {
    getMitfahrer,
    postMitfahrer,
    putMitfahrer,
    deleteMitfahrer
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

//GET Einen bestimmten Mitfahrer aufrufen
function getMitfahrer(req, res) {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        var userid = parseInt(req.params.id);
        var a = JSON.parse(data);
        for(var index = 0; index < a.length; index++){
            if(a[index].id === userid){
               res.status(200).send(a[index]);
               return;
            }
        }
        res.status(500).send({error: "Dieser User ist nicht vorhanden"});
        // res.send(JSON.parse(data));

    });
};

//POST Neuen Mitfahrer erstellen
function postMitfahrer(req, res){
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        var a = JSON.parse(data);
        var letzteID = 0;

        for (var i in a) {
			if (a[i].id > letzteID){
				letzteID = parseInt(a[i].id);
			}
        }

        var neueId = letzteID + 1;
        
        var newMitfahrer = {
            id: neueId,
            vorname: req.body.vorname,
            nachname: req.body.nachname,
            mitfahreranzahl: req.body.mitfahreranzahl,
            gepaeck: req.body.gepaeck
        };
        for(var index = 0; index < a.length; index++){
            if(a[index].vorname == newMitfahrer.vorname && a[index].nachname == newMitfahrer.nachname){
               res.status(500).send({error: "Mitfahrer existiert bereits!!"});
               return;
            }
          }
        a.push(newMitfahrer);

        writeFile(JSON.stringify(a, null, 2), () => {
            res.status(201).send('Neue Mitfahrer wurde erstellt!!');
        });
    });
};

//PUT Mitfahrer Einstellungen ändern
function putMitfahrer(req, res){
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        var userid = parseInt(req.params.id);
        var a = JSON.parse(data);
        
        for (var i in a) {
			if (a[i].id == userid){
                a[i].vorname = req.body.vorname;
                a[i].nachname = req.body.nachname;
                a[i].mitfahreranzahl = req.body.mitfahreranzahl;
                a[i].gepaeck = req.body.gepaeck;
                var neueMitfahrerdaten = a[i];
                res.status(200).send(neueMitfahrerdaten);
                
            }   
        }
        writeFile(JSON.stringify(a, null, 2), () => {
            res.status(500).send('Dieser Mitfahrer ist nicht vorhanden'); 
        });
    });
};

//DELETE Mitfahrer löschen
function deleteMitfahrer(req, res){
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        var userid = parseInt(req.params.id);
        var a = JSON.parse(data);
        a = a.filter(function(del) {
			return del.id != userid
		});
        writeFile(JSON.stringify(a, null, 2), () => {
            res.status(200).send('Der Mitfahrer mit der ID ' + userid + ' wurde gelöscht ');
        });
    });
};
