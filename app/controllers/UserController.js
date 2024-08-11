const User = require('../models/User');
require('dotenv').config();
const { generateToken } = require('../config/jwt');

exports.getAllUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10, name } = req.query;

        const users = await User.find({
                username: { $regex: `${name}`, $options: 'i' }
            })
            .sort({timestamp: -1})
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const count = await User.countDocuments();

        const totalPages = Math.ceil(count / limit);

        res.json({ data: users, currentPage: page, nextPage: page + 1, lastPage: totalPages});
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

        const jwt_data = generateToken(newUser._id);

        return res.json({ token : jwt_data });
    } catch (err) {
        let message = err.message;


        if (err.code === 11000) {
            message = `Username is already taken.`;
        }

        res.status(400).json({ message: message });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        const user = await User.findOne({ username });

        const isMatch = await user.comparePassword(password);
        if (!isMatch || !user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = await generateToken(user._id);

        res.json({token});
    } catch (error) {
        console.error('Login error:', error); // Log the error for debugging
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.me = async (req, res) => {
    try {
        let user = await User.findById(req.user.user_id);

        if (!user) {
            return res.status(404).json({ error: 'User not found', user: req.user });
        }

        res.json({ user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
