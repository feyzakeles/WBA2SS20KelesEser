const userRoutes = (app, fs) => {

    // variables
    const dataPath = './data/users.json';
    var url = 'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json';

    // helper methods
    const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }

            callback(returnJson ? JSON.parse(data) : data);
        });
    };
    const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }

            callback();
        });
    };

    //alle User
    app.get('/users', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });

    // Create User
    app.post('/user/:id', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            const userid = parseInt(req.params.id);
            const u = JSON.parse(data);
            const neueUser = {
                id: userid,
                vorname: req.body.vorname,
                nachname: req.body.nachname,
                auto: req.body.auto,
                angebote: [{start: req.body.angebote[0].start, ziel: req.body.angebote[0].ziel}]
              };
              for(var index = 0; index < u.length; index++){
                if(u[index].id == userid){
                   res.status(500).send({error: "ID existiert bereits!!"});
                   return;
                }
              }
              u.push(neueUser);
            //   fs.writeFileSync(dataPath, JSON.stringify(u));
              writeFile(JSON.stringify(u, null, 2), () => {
                res.status(201).send(neueUser);
            });
        });
    });

    // Update User
    app.put('/user/:id', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            
            const userid = parseInt(req.params.id);
            var u = JSON.parse(data);
            var addAngebot = {
                start: req.body.start, 
                ziel: req.body.ziel
            }
            for(var i in u){
                if(u[i].id == userid){ 
                u[i].id = userid,
                u[i].vorname = req.body.vorname,
                u[i].nachname = req.body.nachname,
                u[i].auto = req.body.auto,
                u[i].angebote = req.body.angebote
                u[i].angebote.push(addAngebot);
                }                 
            }
            
            writeFile(JSON.stringify(u, null, 2), () => {
                res.status(200).send("Success");
            });
        });
    });
};

module.exports = userRoutes;

