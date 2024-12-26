import mongoose from "mongoose";

const productPropertiesSchema = new mongoose.Schema({
    category_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    name: { type: String, required: true },
    description: { type: String, default: "No description" },
    createdAt: { type: Date, default: Date.now },
});

const ProductProperties = mongoose.model('ProductProperties', productPropertiesSchema);

export default ProductProperties;