var db = require('../db');


module.exports = {
    getAnbieter,
    postAnbieter,
    putAnbieter,
    deleteAnbieter
}

//GET Einen bestimmten Anbieter aufrufen
function getAnbieter(req, res) {
    var userid = parseInt(req.params.id);
    let sql = 'SELECT * FROM Anbieter WHERE Anbieter_id= ' + userid;
    db.query(sql, (err, result) => {
        if(err) throw err;
        //console.log(result);
        res.send(result);
   });
}; 

//POST Neuen Anbieter erstellen
function postAnbieter(req, res) {
    let newAnbieter = [req.body.vorname, req.body.nachname, req.body.Automodell_id];
    db.query('INSERT INTO Anbieter (vorname, nachname, Automodelle_Automodell_id) VALUES (?,?,?)', newAnbieter, (err, result) => {
        if(err) throw err;
        res.status(201).send('Neue Anbieter wurde erstellt!!');
   });
}; 

//PUT Anbieter Einstellungen ändern
function putAnbieter(req, res) {
    var userid = parseInt(req.params.id);
    let newAnbieter = [req.body.vorname, req.body.nachname];
    db.query('UPDATE Anbieter SET vorname = ?, nachname = ? WHERE Anbieter_id= ' +userid, newAnbieter, (err, result) => {
        if(err) throw err;
        res.status(201).send('Der Anbieter mit der ID ' + userid + ' wurde geändert');
   });
}; 

//DELETE Anbieter löschen
function deleteAnbieter(req, res) {
    var userid = parseInt(req.params.id);
    db.query('DELETE FROM Anbieter WHERE Anbieter_id= ' +userid,  (err, result) => {
        if(err) throw err;
        res.status(201).send('Der Anbieter mit der ID ' + userid + ' wurde gelöscht');
   });
}; 


