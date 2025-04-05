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

export {addFood}