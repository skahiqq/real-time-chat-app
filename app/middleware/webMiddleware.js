const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const { ALLOWED_HOSTS } = require('../config/app');

const applyGlobalMiddleware = (app) => {
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

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(helmet());
    app.disable('x-powered-by');
};

module.exports = applyGlobalMiddleware;
