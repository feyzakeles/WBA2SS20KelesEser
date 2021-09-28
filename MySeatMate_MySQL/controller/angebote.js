var distance = require('google-distance');
var db = require('../db');


module.exports = {
    postAngebote,
    sucheAngebote
}

//POST Neue Angebot erstellen
function postAngebote(req, res){
    distance.apiKey = 'AIzaSyCkp4sq3O75LFS8sk38RpP2Z9i_WVfdsUM'; 
    var userid = parseInt(req.params.id);
    var automodell = "SELECT * FROM car_sharing.Anbieter INNER JOIN car_sharing.Automodelle ON Anbieter.Automodelle_Automodell_id = Automodell_id INNER JOIN car_sharing.preiskategorie ON Automodelle.preiskategorie_pid = pid Where Anbieter_id = ?;"; 
    distance.get(
        {
          origin: req.body.startort,
          destination: req.body.zielort
        }, 
        function(err, body){
        db.query(automodell, userid, (err, results) => {
            if (err){ 
                throw console.log(err);
            } 
            var dist = parseInt(body.distance);
            var ergebnis = parseInt(dist*0.70); 
            if(dist>100){
                var preis2 = parseInt(results[0].preis2) + ergebnis;
            }else{
                var preis1 = parseInt(results[0].preis1) + ergebnis;
            }
            var newAngebot = [
                req.body.startort,
                req.body.zielort,
                req.body.datum,
                req.body.sitzanzahl,
                req.body.verfügbar,
                req.body.besetzt,
                dist,
                ergebnis,
                preis1 || preis2,
                userid
            ]
            db.query('INSERT INTO Angebote (startort, zielort, datum, sitzanzahl, verfügbar, besetzt, km, km_mit_kosten, preis, Anbieter_Anbieter_id) VALUES (?,?,?,?,?,?,?,?,?,?)', newAngebot, (err, results) => {
                if(err) throw err;
            })
            res.status(201).send(newAngebot);

        })
    });
}; 

//GET Mitfahrer sucht ein Angebot
function sucheAngebote(req, res){
    var startort = req.query.startort;
    var zielort = req.query.zielort;
    let sql = 'SELECT * FROM Angebote WHERE startort LIKE "'+startort+'" AND zielort LIKE "'+zielort+'" ';
    db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
   });

   
};

