
var async = require('async')
var files = ['./data/anbieter.json', './data/automodelle.json'];


var fs = require('fs');

module.exports = {
    // getAutomodell,
    postAutomodell,
    putAutomodell
}

/* function getAutomodell(req, res) {
    async.map(files, fs.readFile, function(err, files) {
        if(err) {
            throw err;
        }
        var a = JSON.parse(files[0])
        var b = JSON.parse(files[1])

        a.forEach(element => {
            console.log(element);
        });

    });
}; */

//POST Automodell auswählen
function postAutomodell(req, res){
    async.map(files, fs.readFile, function(err, files) {
        if(err) {
            throw res.status(500).send(err);
        } 
        var a = JSON.parse(files[0]);
        var b = JSON.parse(files[1]);
        
        var userid = parseInt(req.params.id);
        
        for(var i in a){ 
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
        if(a[i].id == userid){
            var w =  a[i].automodell;
                for (var j in w) {
                if(w[j] == null){
                    w[j] = newCar;
                }
            }
         } 
    }
        fs.writeFile('./data/anbieter.json', JSON.stringify(a, null, 2), () => {
            if (err) {
                throw err;
            }
            res.status(201).send(newCar);
        }); 
    });
     
}; 


//PUT Automodell ändern
function putAutomodell(req, res){
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        writeFile(JSON.stringify(a, null, 2), () => {
            if (err) {
                throw err;
            }
    
            res.status(200).send(neueAngebotdaten);
        
            
        });
    });
};

