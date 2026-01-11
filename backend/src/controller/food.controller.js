const foodItemModel = require('../models/foodItem.model');
const { uploadFile } = require('../Services/storage.services');
const { v4:uuid } = require('uuid');


const createFoodItem = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No video uploaded" });
    }

    // 🔥 KEEP THE FILE EXTENSION (.mp4)
    const fileUploadResult = await uploadFile(
      req.file.buffer,
      req.file.originalname // ✅ THIS FIXES EVERYTHING
    );

    const newFoodItem = new foodItemModel({
      name: req.body.name,
      description: req.body.description,
      video: fileUploadResult.url, // video URL from ImageKit
      foodPartner: req.foodPartner._id,
    });

    await newFoodItem.save();

    res.status(201).json({
      message: "Food item created successfully",
      foodItem: newFoodItem,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


const getFoodItems = async (req, res) => {
    const foodItems = await foodItemModel
  .find({})
  .populate("foodPartner", "name");


    res.status(200).json({
        message: 'Food items fetched successfully',
        foodItems: foodItems,
    });
}

const getFPItems = async (req, res) => {
    try {
      // console.log("Food Partner ID:", req.foodPartner._id); // Debugging line
    const foods = await foodItemModel.find({
      foodPartner: req.foodPartner._id,
    }).sort({ createdAt: -1 });

    res.status(200).json(foods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}



module.exports = { createFoodItem, getFoodItems, getFPItems };