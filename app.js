const express = require('express');
const app = express();
const socketIo = require('socket.io');
require('dotenv').config();
const http = require('http');
const server = http.createServer(app);
const io = socketIo(server);

const { connectDB } = require('./app/config/dbConfig');
const webMiddleware = require('./app/middleware/webMiddleware');

connectDB();
webMiddleware(app);
require('./app/routes')(app, io);

server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
