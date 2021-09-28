const Mitfahrer = require("../model/mitfahrer");

//GET Einen bestimmten Mitfahrer aufrufen
exports.getMitfahrerById = async (req, res, next) => {
    try {
      let mitfahrer_id = parseInt(req.params.id);
      let [mitfahrer, _] = await Mitfahrer.findById(mitfahrer_id);
      res.status(200).send(mitfahrer);
    } catch (error) {
      next(error);
    }
};

//POST Neuen Mitfahrer erstellen
exports.postMitfahrer = async (req, res, next) => {
    try {
        let { vorname, nachname, gepaeck, mitfahreranzahl, Angebote_Angebotnummer} = req.body;
        let mitfahrer = new Mitfahrer(vorname, nachname, gepaeck, mitfahreranzahl, Angebote_Angebotnummer);
        mitfahrer = await mitfahrer.save();
        res.status(201).send('Neue Mitfahrer wurde erstellt!!');
      } catch (error) {
        next(error);
      }
}; 

//PUT Mitfahrer Einstellungen ändern
exports.putMitfahrer = async (req, res, next) => {
    try {
      let mitfahrer_id = parseInt(req.params.id);
      let { vorname, nachname, gepaeck, mitfahreranzahl, Angebote_Angebotnummer} = req.body;
      let [mitfahrer, _] = await Mitfahrer.update(vorname, nachname, gepaeck, mitfahreranzahl, Angebote_Angebotnummer, mitfahrer_id);  
      res.status(200).send('Der Anbieter mit der ID ' + mitfahrer_id + ' wurde geändert');
    } catch (error) {
      next(error);
    }
};

//DELETE Mitfahrer löschen
exports.deleteMitfahrer= async (req, res, next) => {
    try {
      let mitfahrer_id = parseInt(req.params.id);
      let [mitfahrer, _] = await Mitfahrer.delete(mitfahrer_id);
      res.status(200).send('Der Anbieter mit der ID ' + mitfahrer_id + ' wurde gelöscht');
    } catch (error) {
      next(error);
    }
};

