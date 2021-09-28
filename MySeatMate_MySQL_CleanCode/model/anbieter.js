var db = require('../config/db');

class Anbieter {
    constructor(vorname, nachname, Automodelle_Automodell_id){
        this.vorname = vorname;
        this.nachname = nachname;
        this.Automodelle_Automodell_id = Automodelle_Automodell_id;
    }

    save(){
        let sql = `
        INSERT INTO Anbieter(
          vorname,
          nachname,
          Automodelle_Automodell_id
        )
        VALUES(
          '${this.vorname}',
          '${this.nachname}',
          '${this.Automodelle_Automodell_id}'
        )
        `;
        return db.execute(sql);
    } 

    static update(vorname, nachname, id) {
        let sql = `UPDATE Anbieter SET vorname = '${vorname}', nachname = '${nachname}' WHERE Anbieter_id=  ${id};`;
        return db.execute(sql);
    }

    static delete(id) {
        let sql = `DELETE FROM Anbieter WHERE Anbieter_id= ${id};`;
        return db.execute(sql);
    }

    static findById(id) {
        let sql = `SELECT * FROM Anbieter WHERE Anbieter_id = ${id};`;
        return db.execute(sql);
    }
}

module.exports = Anbieter;