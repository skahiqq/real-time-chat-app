const UserRoutes = require("./UserRoutes");
const authMiddleware = require("../middleware/auth");
const AuthRoutes = require("./Auth");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const { ALLOWED_HOSTS } = require('../config/app');

module.exports = (app) => {
    // Routes
    app.use('/users', UserRoutes);

    app.use((req, res, next) => {
        res.status(404).send("Sorry can't find that!")
    });

    app.use(express.json());

    app.use(express.urlencoded({ extended: true }));

    app.use(helmet());

    app.disable('x-powered-by');

    app.use(cors({
        origin: function (origin, callback) {
            if (!origin || ALLOWED_HOSTS.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        optionsSuccessStatus: 204
    }));
}
