const Anbieter = require("../model/anbieter");

//GET Einen bestimmten Anbieter aufrufen
exports.getAnbieterById = async (req, res, next) => {
    try {
      let anbieter_id = parseInt(req.params.id);
      let [anbieter, _] = await Anbieter.findById(anbieter_id);
      res.status(200).send(anbieter);
    } catch (error) {
      next(error);
    }
};

//POST Neuen Anbieter erstellen
exports.postAnbieter = async (req, res, next) => {
    try {
        let { vorname, nachname, Automodell_id } = req.body;
        let anbieter = new Anbieter(vorname, nachname, Automodell_id );
        anbieter = await anbieter.save();
        res.status(201).send('Neue Anbieter wurde erstellt!!');
      } catch (error) {
        next(error);
      }
}; 

//PUT Anbieter Einstellungen ändern
exports.putAnbieter = async (req, res, next) => {
    try {
      let anbieter_id = parseInt(req.params.id);
      let { vorname, nachname } = req.body;
      let [anbieter, _] = await Anbieter.update(vorname, nachname, anbieter_id);  
      res.status(200).send('Der Anbieter mit der ID ' + anbieter_id + ' wurde geändert');
    } catch (error) {
      next(error);
    }
};

//DELETE Anbieter löschen
exports.deleteAnbieter = async (req, res, next) => {
    try {
      let anbieter_id = parseInt(req.params.id);
      let [anbieter, _] = await Anbieter.delete(anbieter_id);
      res.status(200).send('Der Anbieter mit der ID ' + anbieter_id + ' wurde gelöscht');
    } catch (error) {
      next(error);
    }
};



