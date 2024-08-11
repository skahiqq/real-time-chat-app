const express = require('express');
const app = express();
const socketIo = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const http = require('http');
const server = http.createServer(app);
const io = socketIo(server);


const { connectDB } = require('./app/config/dbConfig');
connectDB();

// allow multiple origins


require('./app/sockets')(io);
require('./app/routes')(app);

// Start the server
server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
