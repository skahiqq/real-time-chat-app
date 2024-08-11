const Message = require("../models/Message");

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });

        socket.on('chat message', (msg) => {
            console.log('message: ' + msg._id);
            const message = new Message({
                senderId: '66b81a4d6a06776e1438689a',
                receiverId: '66b81a596a06776e143868a8',
                message: 'Hello User2!',
                timestamp: new Date()
            });

            message.save();

            io.emit('chat message', msg);
        });
    });
}
