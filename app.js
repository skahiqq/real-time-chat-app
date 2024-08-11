const express = require('express');
const app = express();
const socketIo = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const http = require('http');
const server = http.createServer(app);
const io = socketIo(server);
const Message = require('./app/models/Message');

const { connectDB } = require('./app/config/dbConfig');
const UserRoutes = require('./app/routes/UserRoutes');
const AuthRoutes = require('./app/routes/Auth');

// allow multiple origins
const allowedOrigins = ['http://localhost:3000'];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204
}));


io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg._id);
        const message = new Message({
            senderId: '66b62e82a5614bda02e473a0',
            receiverId: '66b62e82a5614bda02e473a0',
            message: 'Hello User2!',
            timestamp: new Date()
        });

        message.save();

        io.emit('chat message', msg);
    });
});
connectDB();
// middlewares
const authMiddleware = require('./app/middleware/auth');

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
server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
