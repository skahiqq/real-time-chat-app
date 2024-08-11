const UserRoutes = require("./UserRoutes");

module.exports = (app, io) => {
    require('../sockets')(app, io);

    app.use('/users', UserRoutes);

    app.use((req, res, next) => {
        res.status(404).send("Sorry can't find that!")
    });
}
