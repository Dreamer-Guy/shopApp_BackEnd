import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, default: "No description" },
    createdAt: { type: Date, default: Date.now },
});

const Category = mongoose.model('Category', categorySchema);

export default Category;