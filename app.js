const express = require('express');
const app = express();
const port = 3000;
const UserRoutes = require('./app/routes/UserRoutes');
const AuthRoutes = require('./app/routes/Auth');

const { connectDB } = require('./app/config/dbConfig');
require('dotenv').config();
const http = require('http');
const server = http.createServer(app);

const helmet = require('helmet')

//const socketIo = require('socket.io');
//const io = socketIo(server);
/*io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
});*/
connectDB();
// middlewares
const authMiddleware = require('./app/middleware/auth');

//connectDB();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.disable('x-powered-by')

// Routes
app.use('/users', UserRoutes);
app.use('/auth', authMiddleware, AuthRoutes);



app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!")
})

// Start the server
server.listen(3000, () => {
    console.log(`Server running on port ${3000}`);
});
