const appRouter = (app, fs) => {

    app.get('/', (req, res) => {
        res.send('Willkommen...');
    });

};

module.exports = appRouter;