
const request = require('request');
var fs = require('fs');

module.exports = {
    getAutomodell,
    postAutomodell,
    putAutomodell
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

function getAutomodell(req, res) {
    request("https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json",{ json: true }, (err, body) => {
        if (err) {
            return  console.log(err)
        };
        if (!err) {
            res.status(200).send(body);
        };
    });    
};

//POST Automodell aussuchen
function postAutomodell(req, res){
    request("https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json",{ json: true }, (err, body) => {
        if (err) {
            return  console.log(err)
        };
        if (!err) {
            var newCar = {
                automodell: req.body.automodell
            };  

            for (var i in body){
                if(body[i].Count == 158){
                var u = body[i].Results;
                for (var j in u){
                if (u[j].MakeName == newCar.automodell){
                    u[j].push(newCar);
                    }
                    
                }
            }
            }writeFile(JSON.stringify(body, null, 2), () => {
                res.status(201).send("ok");
            });
            
        };
    });  
     
};

//PUT Angebot ändern
function putAutomodell(req, res){
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        writeFile(JSON.stringify(a, null, 2), () => {
            res.status(200).send(neueAngebotdaten);
        });
    });
};

