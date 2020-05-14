
var async = require('async')
var files = ['./data/mitfahrer.json', './data/anbieter.json'];


var fs = require('fs');

module.exports = {
    postBuchung
}


//POST Automodell auswählen
function postBuchung(req, res){
    async.map(files, fs.readFile, function(err, files) {
        if(err) {
            throw res.status(500).send(err);
        } 
        var a = JSON.parse(files[0]);
        var b = JSON.parse(files[1]);
        
        fs.writeFile('./data/anbieter.json', JSON.stringify(a, null, 2), () => {
            if (err) {
                throw err;
            }
            res.status(201).send(newCar);
        }); 
    });
     
}; 



