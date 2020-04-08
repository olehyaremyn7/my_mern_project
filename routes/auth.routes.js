const {Router} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = Router();

// /api/auth/register
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const candidate = await User.findOne({ email });

        if (candidate) {
            return  res.status(400).json({ message: 'Такий користувач уже існує' })
        }

        // use bcrypt
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ email, password: hashedPassword });

        await user.save();

        res.status(201).json({ message: 'Користувач створений' });

    } catch (e) {

    }

});

// /api/auth/login
router.post('/login', async (req, res) => {

});

module.exports = router;