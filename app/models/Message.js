const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const messageSchema = new mongoose.Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    message: String,
    timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

Message.init()
    .then(() => {
        console.log('Indexes created');
    })
    .catch(err => {
        console.error('Error creating indexes:', err);
    });

module.exports = Message;
