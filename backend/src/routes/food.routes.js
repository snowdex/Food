const express = require('express');
const { createFoodItem, getFoodItems, getFPItems } = require('../controller/food.controller');
const { verifyfoodPartnerToken } = require('../middlewares/auth.middlewares');
const router = express.Router();
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/', verifyfoodPartnerToken , upload.single("video"),createFoodItem);

router.get('/', getFoodItems)
router.get('/partner/items', verifyfoodPartnerToken, getFPItems);


module.exports = router;