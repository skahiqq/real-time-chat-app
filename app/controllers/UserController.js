const User = require('../models/User');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRATION } = require('../config/app');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createUser = async (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    try {
        const newUser = await user.save();
        // save jwt token
        const jwt_data = jwt.sign({user_id : newUser._id}, JWT_SECRET, { expiresIn : JWT_EXPIRATION});

        return res.json({ token : jwt_data });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.me = async (req, res) => {
    try {
        // Find user by ID from the token
        let user = await User.findById(req.user.user_id);

        if (!user) {
            return res.status(404).json({ error: 'User not found', user: req.user });
        }

        res.json({ username: user.password });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
