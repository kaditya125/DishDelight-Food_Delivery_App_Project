// foodController.js
import foodModel from "../models/foodModel.js";
import fs from 'fs'

const addFood = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        const image = req.file ? req.file.filename : "";
        const food = new foodModel({ name, description, price, image, category });
        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Get all food items
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }
        // Delete the image file from the server
        fs.unlink(`uploads/${food.image}`, () => {});

        // Remove the food item from the database
        await foodModel.findByIdAndDelete(req.body.id);
        
        res.json({ success: true, message: "Food Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { addFood, listFood, removeFood };
