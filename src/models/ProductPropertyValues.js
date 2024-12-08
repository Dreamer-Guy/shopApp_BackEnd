import mongoose from "mongoose";

const productPropertyValuesSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    property_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductProperties',
        required: true,
    },
    value: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const ProductPropertyValues = mongoose.model('ProductPropertyValues', productPropertyValuesSchema);

export default ProductPropertyValues;