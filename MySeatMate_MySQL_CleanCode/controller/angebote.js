const Angebot = require("../model/angebote");

//POST Neue Angebot erstellen
exports.postAngebote = async (req, res, next) => {
    try {
        let anbieter_id = parseInt(req.params.id);
        let { startort, zielort, datum, sitzanzahl, verfügbar, besetzt} = req.body;
        let [newAngebot, _] = await Angebot.save(startort, zielort, datum, sitzanzahl, verfügbar, besetzt, anbieter_id);
        res.status(201).send(newAngebot);
      } catch (error) {
        next(error);
      }
}; 

//GET Mitfahrer sucht ein Angebot
exports.sucheAngebote = async (req, res, next) => {
    try {
        let { startort, zielort} = req.query;
      let [anbieter, _] = await Angebot.searchAngebot(startort, zielort);
      res.status(200).send(anbieter);
    } catch (error) {
      next(error);
    }
};


