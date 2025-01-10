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
        default:"pending",
        enum:["pending","processing","completed"]
    },
    paymentStatus:{
        required:true,
        type:Boolean,
        default:false
    },
    address:{
        street:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        postalCode:{
            type:String,
            required:true
        },
        phone:{
            type:String,
            required:true
        },
        notes:{
            type:String,
            default:""
        },
    },
    createdAt: {type: Date,default: Date.now},
});

const Order = mongoose.model('Order', orderSchema);
export default Order;