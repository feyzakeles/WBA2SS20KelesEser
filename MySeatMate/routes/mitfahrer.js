const searchRoutes = (app, fs) => {

    // variables
    const dataPath = './data/suche.json';
    const userPath = './data/users.json';

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

    //localhost:3001/suche?von=Köln
    app.get('/suche/:von/:nach', (req, res) => {
        var von = req.params.von;
        var nach = req.params.nach;
        fs.readFile(userPath, 'utf8', (err, data) => {
            u = JSON.parse(data);
            var result = [];
            if (err) {
                throw err;
            } else {
                for (var i in u){
                    var a = u[i].angebote;
                    for (var j in a){
                    if (a[j].start === von && a[j].ziel === nach){
                        result.push(u[i]);
                        }
                        
                    }
                }
                res.json(result);
            }
        });
           
    });


};

module.exports = searchRoutes;