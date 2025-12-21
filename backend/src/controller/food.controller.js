const foodItemModel = require('../models/foodItem.model');
const { uploadFile } = require('../Services/storage.services');
const { v4:uuid } = require('uuid');


const createFoodItem = async (req, res) => {
    const fileUploadResult = await uploadFile(req.file.buffer, uuid());

    const newFoodItem = new foodItemModel({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,
        foodPartner: req.foodPartner._id,

    });

    await newFoodItem.save();

    res.status(201).json({
        message: 'Food item created successfully',
        foodItem: newFoodItem,
    });
}

const getFoodItems = async (req, res) => {
    const foodItems = await foodItemModel.find({});

    res.status(200).json({
        message: 'Food items fetched successfully',
        foodItems: foodItems,
    });
}


module.exports = { createFoodItem, getFoodItems };