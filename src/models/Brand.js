import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, default: "No description" },
    createdAt: { type: Date, default: Date.now },
});

const Brand=mongoose.model('Brand',brandSchema);
export default Brand;