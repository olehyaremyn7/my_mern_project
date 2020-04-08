const {Router} = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const router = Router();

// /api/auth/register
router.post('/register',
    [check('email', 'Некоректна електронна пошта').isEmail(),
     check('password', 'Мінімальна довжина паролю 6 символів').isLength({ min: 6 })
    ], async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некоректні дані при реєстрації'
            })
        }

        const { email, password } = req.body;
        const candidate = await User.findOne({ email });

        if (candidate) {
            return res.status(400).json({ message: 'Такий користувач уже існує' })
        }

        // use bcrypt
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ email, password: hashedPassword });

        await user.save();

        res.status(201).json({ message: 'Користувач створений' });

    } catch (e) {
        res.status(500).json({ message: 'Щоь пішло не так, спробуйте знову' })
    }

});

// /api/auth/login
router.post('/login',
    [
        check('email', 'Введіть коректну електронну пошту').normalizeEmail().isEmail(),
        check('password', 'Введіть пароль').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некоректні дані при вході у систему'
                })
            }

            const {email, password} = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ message: 'Користувач не знайдений' })
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: 'Невірний пароль, спробуйте знову' })
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            );

            res.json({ token, userId: user.id });

        } catch (e) {
            res.status(500).json({ message: 'Щось пішло не так, спробуйте знову' })
        }
    });

module.exports = router;