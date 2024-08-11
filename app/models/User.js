const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: [true, 'Username is already taken'],
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        //select: false, // remove from json,
        minLength: [6, 'Password length must be at least 6 characters'] // min 6 characters
    },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }]
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

User.init() // Ensure indexes are created
    .then(() => {
        console.log('Indexes created');
    })
    .catch(err => {
        console.error('Error creating indexes:', err);
    });

module.exports = User;
