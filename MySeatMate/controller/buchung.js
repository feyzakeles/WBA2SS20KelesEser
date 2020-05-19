
var async = require('async')
var files = ['./data/mitfahrer.json', './data/anbieter.json'];


var fs = require('fs');

module.exports = {
    postBuchung
}


//POST Ein Angebot buchen
function postBuchung(req, res){
    async.map(files, fs.readFile, function(err, files) {
        if(err) {
            throw res.status(500).send(err);
        } 
        var a = JSON.parse(files[0]);
        var b = JSON.parse(files[1]);

        var mid = parseInt(req.params.mid);
        var aid = parseInt(req.params.aid);
        var letzteID = 0; 

        for(var j in a){  
            if(a[j].id === mid){
            var id = a[j].id;
            }
        }
        for(var i in b){ 
           
        var x = b[i].angebote;
        for(var k in x){
            if (x[k].id === aid){
                var u = x[k].gebucht_von;
                for(var r in u){
                    if (u[r].bid > letzteID){
                        letzteID = parseInt(u[r].bid);
                    }
                    var neueId = letzteID + 1; 
                    var newBuchung = {
                        bid: neueId,
                        mid: id
                    }; 
                    u.push(newBuchung);
                }
            } 
        }

    }
        
        fs.writeFile('./data/anbieter.json', JSON.stringify(b, null, 2), () => {
            if (err) {
                throw err;
            }
            res.status(201).send(newBuchung);
        }); 
    });
     
}; 



