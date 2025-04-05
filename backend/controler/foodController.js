import Food from "../Database/schema.js";
import fs from "fs";

const addFood = async (req, res) => {
    const { title, desc, price, cat } = req.body;
    const image = req.file.path;

    try {
        const food = new Food({
            title,
            desc,
            price,
            cat,
            image
        });

        await food.save();
        res.status(201).json({ message: "Food added successfully", food });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to add food",error });
    }
}

//
const listFood = async (req, res) => {
    try {
        const foods = await Food.find({});
        res.status(200).json(foods);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch food items", error });
    }
}

const deleteFood = async (req, res) => {
    const { id } = req.params;
    try {
        const food = await Food.findById(id);
        if (!food) {
            return res.status(404).json({ message: "Food not found" });
        }
        fs.unlinkSync(food.image);
        await Food.findByIdAndDelete(id);
        res.status(200).json({ message: "Food deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete food", error });
    }
}

export {addFood,listFood,deleteFood}