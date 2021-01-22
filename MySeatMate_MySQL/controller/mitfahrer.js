var db = require('../db');

module.exports = {
    getMitfahrer,
    postMitfahrer,
    putMitfahrer,
    deleteMitfahrer
}


//GET Einen bestimmten Mitfahrer aufrufen
function getMitfahrer(req, res) {
    var userid = parseInt(req.params.id);
    let sql = 'SELECT * FROM Mitfahrer WHERE Mitfahrer_id= ' + userid;
    db.query(sql, (err, result) => {
        if(err) throw err;
        //console.log(result);
        res.send(result);
   });
}; 

//POST Neuen Mitfahrer erstellen
function postMitfahrer(req, res) {
    let newMitfahrer = [req.body.vorname, req.body.nachname, req.body.gepaeck, req.body.mitfahreranzahl, req.body.Angebote_Angebotnummer];
    db.query('INSERT INTO Mitfahrer (vorname, nachname, gepaeck, mitfahreranzahl, Angebote_Angebotnummer) VALUES (?,?,?,?,?)', newMitfahrer, (err, result) => {
        if(err) throw err;
        res.status(201).send('Neue Mitfahrer wurde erstellt!!');
   });
}; 

//PUT Mitfahrer Einstellungen ändern
function putMitfahrer(req, res) {
    var userid = parseInt(req.params.id);
    let newMitfahrer = [req.body.vorname, req.body.nachname, req.body.gepaeck, req.body.mitfahreranzahl, req.body.Angebote_Angebotnummer];
    db.query('UPDATE Mitfahrer SET vorname = ?, nachname = ?, gepaeck = ?, mitfahreranzahl = ?, Angebote_Angebotnummer = ? WHERE Mitfahrer_id= ' +userid, newMitfahrer, (err, result) => {
        if(err) throw err;
        res.status(201).send('Der Mitfahrer mit der ID ' + userid + ' wurde geändert');
   });
}; 

//DELETE Mitfahrer löschen
function deleteMitfahrer(req, res) {
    var userid = parseInt(req.params.id);
    db.query('DELETE FROM Mitfahrer WHERE Mitfahrer_id= ' +userid,  (err, result) => {
        if(err) throw err;
        res.status(201).send('Der Mitfahrer mit der ID ' + userid + ' wurde gelöscht');
   });
}; 

