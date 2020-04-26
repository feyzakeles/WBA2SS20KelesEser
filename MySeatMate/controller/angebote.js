
const dataPath = './data/anbieter.json';
var fs = require('fs');
module.exports = {
    getAngebote,
    postAngebote,
    putAngebote,
    deleteAngebote
}

const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

    fs.writeFile(filePath, fileData, encoding, (err) => {
        if (err) {
            throw err;
        }

        callback();
    });
};

//GET Einen bestimmten Anbieter aufrufen
function getAngebote(req, res) {
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

//POST Neuen Anbieter erstellen
function postAngebote(req, res){
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
        
        var newAnbieter = {
            id: neueId,
            vorname: req.body.vorname,
            nachname: req.body.nachname,
        };
        for(var index = 0; index < a.length; index++){
            if(a[index].vorname == newAnbieter.vorname && a[index].nachname == newAnbieter.nachname){
               res.status(500).send({error: "Anbieter existiert bereits!!"});
               return;
            }
          }
        a.push(newAnbieter);

        writeFile(JSON.stringify(a, null, 2), () => {
            res.status(201).send('new user added');
        });
    });
};

//PUT Anbieter Einstellungen ändern
function putAngebote(req, res){
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        writeFile(JSON.stringify(a, null, 2), () => {
            res.status(201).send('new user added');
        });
    });
};

//DELETE Anbieter löschen
function deleteAngebote(req, res){
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        writeFile(JSON.stringify(a, null, 2), () => {
            res.status(201).send('new user added');
        });
    });
};
