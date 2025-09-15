const User = require('../models/User');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { email } = req.body;
    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email has already been used.' });
        } else {
            const user = await User.create(req.body);
            return res.status(201).json(user)
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const loginUser = async (req, res) => {
        const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ error: 'Incorrect email or password.' });
        }

        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
            return res.status(400).json({ error: 'Incorrect email or password.' });
        }

        const payload = {
            _id: user._id,
            username: user.username,
            email: user.email
        };

        const token = jwt.sign({ data: payload }, secret, { expiresIn: '2h' });
        return res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

module.exports = {registerUser, loginUser};