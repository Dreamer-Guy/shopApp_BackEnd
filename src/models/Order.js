import mongoose from 'mongoose';
const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                default: 0,
            },
        },
    ],
    total:{
        type:Number,
        required:true,
        default:0
    },
    status:{
        type:String,
        required:true,
        default:"pending"
    },
    paymentStatus:{
        required:true,
        type:Boolean,
        default:false
    },
    createdAt: {type: Date,default: Date.now},
});

const Order = mongoose.model('Order', orderSchema);
export default Order;