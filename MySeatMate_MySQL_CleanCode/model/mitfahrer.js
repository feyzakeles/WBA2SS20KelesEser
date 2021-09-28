var db = require('../config/db');

class Mitfahrer {
    constructor(vorname, nachname, gepaeck, mitfahreranzahl, Angebote_Angebotnummer){
        this.vorname = vorname;
        this.nachname = nachname;
        this.gepaeck = gepaeck;
        this.mitfahreranzahl = mitfahreranzahl;
        this.Angebote_Angebotnummer = Angebote_Angebotnummer;
    }

    save(){
        let sql = `
        INSERT INTO Mitfahrer(
          vorname,
          nachname,
          gepaeck,
          mitfahreranzahl,
          Angebote_Angebotnummer
        )
        VALUES(
          '${this.vorname}',
          '${this.nachname}',
          '${this.gepaeck}',
          '${this.mitfahreranzahl}',
          '${this.Angebote_Angebotnummer}'
        )
        `;
        return db.execute(sql);
    } 

    static update(vorname, nachname, gepaeck, mitfahreranzahl, Angebote_Angebotnummer, id) {
        let sql = `UPDATE Mitfahrer SET vorname = '${vorname}', nachname = '${nachname}', gepaeck = '${gepaeck}', mitfahreranzahl = '${mitfahreranzahl}', Angebote_Angebotnummer = '${Angebote_Angebotnummer}' WHERE Mitfahrer_id = ${id};`;
        return db.execute(sql);
    }

    static delete(id) {
        let sql = `DELETE FROM Mitfahrer WHERE Mitfahrer_id= ${id};`;
        return db.execute(sql);
    }

    static findById(id) {
        let sql = `SELECT * FROM Mitfahrer WHERE Mitfahrer_id = ${id};`;
        return db.execute(sql);
    }
}

module.exports = Mitfahrer;