var db = require('../config/db');
var distance = require('google-distance');

class Angebot {

    static save(startort, zielort, datum, sitzanzahl, verfügbar, besetzt, id){
      distance.apiKey = 'AIzaSyCkp4sq3O75LFS8sk38RpP2Z9i_WVfdsUM';
      let automodell = `SELECT * FROM car_sharing.Anbieter INNER JOIN car_sharing.Automodelle ON Anbieter.Automodelle_Automodell_id = Automodell_id INNER JOIN car_sharing.preiskategorie ON Automodelle.preiskategorie_pid = pid Where Anbieter_id = ${id};`;
      distance.get(
        {
          origin: startort,
          destination: zielort
        }, 
        function(err, body){
        db.query(automodell, id, (err, results) => {
            if (err){ 
                throw console.log(err);
            } 
            var benzinpreis = 0.70;
            var dist = parseInt(body.distance);
            var ergebnis = parseInt(dist*benzinpreis); 
            if(dist>100){
                var preis2 = parseInt(results[0].preis2) + ergebnis;
            }else{
                var preis1 = parseInt(results[0].preis1) + ergebnis;
            }

            var preis = preis1 || preis2;
            
            let sql = `
            INSERT INTO Angebote (
              startort, 
              zielort, 
              datum, 
              sitzanzahl, 
              verfügbar, 
              besetzt, 
              km, 
              km_mit_kosten, 
              preis, 
              Anbieter_Anbieter_id
            )
            VALUES(
              '${startort}',
              '${zielort}',
              '${datum}',
              '${sitzanzahl}',
              '${verfügbar}',
              '${besetzt}',
              '${dist}',
              '${ergebnis}',
              '${preis}',
              '${id}'
            )
            `;
            return db.execute(sql);
        })
      });
    }

    static searchAngebot(startort, zielort) {
      let sql = `SELECT * FROM Angebote WHERE startort LIKE '${startort}' AND zielort LIKE '${zielort}'`;
      return db.execute(sql);
    }
}

module.exports = Angebot;