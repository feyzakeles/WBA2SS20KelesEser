
const dataPath = './data/anbieter.json';
var fs = require('fs');

module.exports = {
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

//POST Neue Angebot erstellen
function postAngebote(req, res){
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        var userid = parseInt(req.params.id);
        var a = JSON.parse(data);
        var letzteID = 0; 

        for (var i in a){
            if(a[i].id == userid){
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
        };  
        
        for (var i in a) {
			if (a[i].id == userid){
                a[i].angebote.push(newAngebot);
                res.status(201).send(newAngebot);
            }
        }

        writeFile(JSON.stringify(a, null, 2), () => {
            res.status(500).send({error: "error!!"}); 
        });
    });
};

//PUT Angebot ändern
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

//DELETE Angebot löschen
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
