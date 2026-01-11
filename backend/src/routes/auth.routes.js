const express = require('express');
const { register, ulogin,logout, FPlogin, FPregister } = require('../controller/auth.controller');
const { authUserMiddleware } = require('../middlewares/auth.middlewares');
const { verifyfoodPartnerToken } = require('../middlewares/auth.middlewares');

const router = express.Router();

//User auth routes
router.post('/user/signup', register);
router.post('/user/login', ulogin);
router.post('/user/logout', logout);
router.get('/user/me', authUserMiddleware, (req, res) => {
    res.status(200).json({ user: req.user });
})

//Food-Partner auth routes
router.post('/food-partner/signup', FPregister);
router.post('/food-partner/login', FPlogin);
router.post('/food-partner/logout', logout);
router.get('/food-partner/me', verifyfoodPartnerToken, (req, res) => {
    res.status(200).json({ foodPartner: req.foodPartner });
});



module.exports = router;