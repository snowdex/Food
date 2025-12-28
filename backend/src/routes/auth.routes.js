const express = require('express');
const { register, ulogin,logout, FPlogin, FPregister } = require('../controller/auth.controller');
const { authUserMiddleware } = require('../middlewares/auth.middlewares');

const router = express.Router();

//User auth routes
router.post('/user/signup', register);
router.post('/user/login', ulogin);
router.get('/user/logout', logout);
router.get('/user/me', authUserMiddleware, (req, res) => {
    res.status(200).json({ user: req.user });
})

//Food-Partner auth routes
router.post('/food-partner/signup', FPregister);
router.post('/food-partner/login', FPlogin);
router.get('/food-partner/logout', logout);



module.exports = router;