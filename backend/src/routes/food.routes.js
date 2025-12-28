const express = require('express');
const { createFoodItem, getFoodItems } = require('../controller/food.controller');
const { verifyfoodPartnerToken, authUserMiddleware } = require('../middlewares/auth.middlewares');
const router = express.Router();
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/', verifyfoodPartnerToken , upload.single("video"),createFoodItem);

router.get('/', getFoodItems)


module.exports = router;