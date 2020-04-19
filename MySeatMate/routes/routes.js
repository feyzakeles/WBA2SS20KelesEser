const userRoutes = require('./users');
const searchRoutes = require('./mitfahrer');
const appRouter = (app, fs) => {

    app.get('/', (req, res) => {
        res.send('Willkommen...');
    });
    userRoutes(app, fs);
    searchRoutes(app, fs);

};

module.exports = appRouter;