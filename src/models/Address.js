import mongoose from "mongoose";


const addressSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    phone: { type: String, required: true },
    notes: { type: String, default: "" },
    isDefault: { type: Boolean, default: false },
});

const Address = mongoose.model('Address', addressSchema);

export default Address;
