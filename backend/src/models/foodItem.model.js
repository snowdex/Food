const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    video: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    foodPartner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FoodPartner',
        required: true,
    }
});

const FoodItem = mongoose.model('FoodItem', foodItemSchema);
module.exports = FoodItem;